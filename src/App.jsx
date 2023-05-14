import React, {useEffect, useState} from 'react'
import './styles/App.css'
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList.jsx';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';

function App() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort:'', query: ''})
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [modal, setModal] = useState(false);
  
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts)
  })
 
  useEffect(()=>{
    fetchPosts()
  },[])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
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
    </div>
  );
}

export default App;