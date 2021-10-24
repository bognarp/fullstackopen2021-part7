import React, { useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import { initializeBlogs } from './reducers/blogReducer';
import {
  loadUserFromLocalStorage,
  resetUser,
} from './reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => {
    return state.blogs.sort((objA, objB) => {
      return objB.likes - objA.likes;
    });
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(resetUser());
  };

  if (user === null) {
    return (
      <LoginForm>
        <Notification />
      </LoginForm>
    );
  }

  return (
    <div>
      logged in as {user.name}
      <button onClick={handleLogout}>logout</button>
      <BlogForm>
        <Notification />
      </BlogForm>
      <h2>Blogs</h2>
      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
