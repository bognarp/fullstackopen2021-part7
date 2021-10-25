import React, { useEffect } from 'react';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Users from './components/Users';
import User from './components/User';
import { initializeBlogs } from './reducers/blogReducer';
import { loadUserFromLocalStorage } from './reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
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
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/">
          <>
            <h2>Blogs</h2>
            <BlogForm>
              <Notification />
            </BlogForm>
            <Blogs />
          </>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
