import React, { useEffect } from 'react';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Users from './components/Users';
import { initializeBlogs } from './reducers/blogReducer';
import { loadUserFromLocalStorage } from './reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

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

  if (!user) {
    return (
      <Switch>
        <Route path="/">
          <LoginForm>
            <Notification />
          </LoginForm>
        </Route>
      </Switch>
    );
  }

  return (
    <div>
      <Navbar />

      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <>
            <h2>Blogs</h2>
            <BlogForm>
              <Notification />
            </BlogForm>
            <div id="blog-list">
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} />
              ))}
            </div>
          </>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
