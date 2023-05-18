import React, {useEffect, useState} from 'react';
import {usePosts} from '../hooks/usePosts'
import {usePaggination} from '../hooks/usePaggination'
import MyButton from '../components/UI/button/MyButton.jsx'
import MyModal from '../components/UI/MyModal/MyModal.jsx'
import Loader from '../components/UI/Loader/Loader.jsx'
import Paggination from '../components/UI/paggination/Paggination.jsx'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
import PostList from '../components/PostList'

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort:'', query: ''})
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagesArray, setPagesArray] = useState([])
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [fetchPosts, isPostsLoading, postError] = usePaggination(setPosts, setPagesArray)
  
  useEffect(()=>{
    fetchPosts(limit,page)
  },[page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  } 

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick = {() => setModal(true)}>New post</MyButton>
      <MyModal modal={modal} setModal={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin:'15px 0'}}/>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      {postError &&
        <h1>There is an error: {postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display:'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
        : <PostList 
            remove={removePost} 
            posts={sortedAndSearchedPosts} 
            title='JS posts'
          />
      }
      <Paggination
        page = {page}
        changePage = {changePage}
        pagesArray = {pagesArray}
      />
    </div>
  );
}

export default Posts;