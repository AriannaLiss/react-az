import React, {useEffect, useRef, useState} from 'react';
import {usePosts} from '../hooks/usePosts'
import {usePaggination} from '../hooks/usePaggination'
import MyButton from '../components/UI/button/MyButton.jsx'
import MyModal from '../components/UI/MyModal/MyModal.jsx'
import Loader from '../components/UI/Loader/Loader.jsx'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
import PostList from '../components/PostList'
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort:'', query: ''})
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagesArray, setPagesArray] = useState([])
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = usePaggination(posts, setPosts, totalPages, setTotalPages, setPagesArray)
  
  useObserver(lastElement, page<totalPages, isPostsLoading, ()=> {
    setPage(page+1);
  })

  useEffect(()=>{
    fetchPosts(limit, page)
  },[page, limit])

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
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Amout of elements on the page'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Show all'},
        ]}
      />
      {postError &&
        <h1>There is an error: {postError}</h1>
      }
      <PostList 
        remove={removePost} 
        posts={sortedAndSearchedPosts} 
        title='JS posts'
      />
      <div ref={lastElement} style={{height:20}}/>
      {isPostsLoading &&
        <div style={{display:'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
      }
    </div>
  );
}

export default Posts;