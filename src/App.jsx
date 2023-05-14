import React, {useMemo, useState} from 'react'
import './App.css'
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList.jsx';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/MyModal/MyModal';

function App() {

  const [posts, setPosts] = useState([
    {id:1, title: 'affs', body: 'Description'},
    {id:2, title: 'bb asf', body: 'zz'},
    {id:3, title: 'Javascript 3', body: 'aa'},
    {id:4, title: 'dd', body: 'r'},
    {id:5, title: 'ff  555', body: '1'},
    {id:6, title: 'zz 6', body: 'q'},
  ])

  const [filter, setFilter] = useState({sort:'', query: ''})
  const [modal, setModal] = useState(false);

  const sortedPosts =  useMemo(() => {
    console.log('function getSorted posts')
    if(filter.sort){
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [sortedPosts, filter.query])

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
      <PostList 
        remove={removePost} 
        posts={sortedAndSearchedPosts} 
        title='JS posts'
      />
    </div>
  );
}

export default App;