import React, {useState} from 'react'
import './App.css'
import PostForm from './components/PostForm';
import PostList from './components/PostList.jsx';
import MySelect from './components/UI/select/MySelect';

function App() {

  const [posts, setPosts] = useState([
    {id:1, title: 'affs', body: 'Description'},
    {id:2, title: 'bb asf', body: 'zz'},
    {id:3, title: 'Javascript 3', body: 'aa'},
    {id:4, title: 'dd', body: 'r'},
    {id:5, title: 'ff  555', body: '1'},
    {id:6, title: 'zz 6', body: 'q'},
  ])

  const [selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  } 

  const sortPosts = (sort) => {
    setSelectedSort(sort)
    setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin:'15px 0'}}/>
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Sort by"
          options={[
            {value:'title', name:'by name'},
            {value:'body', name:'by description'}
          ]}
        />
      </div>
      {posts.length
        ? <PostList remove={removePost} posts={posts} title='JS posts'/>
        : <h1 style={{textAlign:"center"}}>No posts</h1>
      }
    </div>
  );
}

export default App;
