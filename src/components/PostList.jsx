import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';

const PostList = ({posts, title, remove}) => {
  return (
      <div>
          <h1 style={{textAlign: 'center'}}>
            {posts.length ? title : 'NoPosts'}
          </h1>
          <TransitionGroup>
            {posts.map((post) => 
              <CSSTransition
                key = {post.id}
                timeout={500}
                classNames="post"
              >
                <PostItem remove={remove} id={post.id} post = {post} />
              </CSSTransition>
            )}  
          </TransitionGroup>
      </div>
  );
};

export default PostList;