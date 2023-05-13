import React, {useMemo, useState} from 'react'
import './App.css'
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList.jsx';

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
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  } 

  return (
    <div className="App">
      <PostForm create={createPost}/>
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
