import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import {
  setNotification,
  resetNotification,
} from './reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const notification = useSelector((state) => state);

  const blogFormRef = useRef();

  const sortedBlogs = (blogs) => {
    return blogs.sort((objA, objB) => {
      return objB.likes - objA.likes;
    });
  };

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(sortedBlogs(blogs)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogAppUser'
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (userCreds) => {
    try {
      const user = await loginService.login(userCreds);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      );
      setUser(user);
    } catch (exception) {
      dispatch(
        setNotification('error', exception.response.data.error)
      );

      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const handleBlogCreation = async (newBlog) => {
    try {
      blogService.setToken(user.token);

      const blog = await blogService.create(newBlog);
      setBlogs(sortedBlogs(blogs.concat(blog)));
      dispatch(
        setNotification(
          'success',
          `Added new blog: ${blog.title} by ${blog.author}`
        )
      );

      setTimeout(() => {
        dispatch(resetNotification());
        blogFormRef.current.toggleVisibility();
      }, 3000);
    } catch (exception) {
      dispatch(
        setNotification('error', exception.response.data.error)
      );

      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  };

  const handleBlogRemoval = async (blog) => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      try {
        blogService.setToken(user.token);

        await blogService.remove(blog.id);
        setBlogs(
          sortedBlogs(
            blogs.filter((b) => {
              return b.id !== blog.id;
            })
          )
        );
      } catch (exception) {
        console.log(exception.response.data);
      }
    }
  };

  const handleLike = async (newBlog) => {
    try {
      const updatedBlog = await blogService.update(
        newBlog.id,
        newBlog
      );
      setBlogs(
        sortedBlogs(
          blogs.map((blog) => {
            return blog.id === updatedBlog.id ? updatedBlog : blog;
          })
        )
      );
    } catch (exception) {
      console.log(exception.response.data);
    }
  };

  const loginForm = () => {
    return (
      <LoginForm onSubmit={handleLogin}>
        <Notification data={notification} />
      </LoginForm>
    );
  };

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onSubmit={handleBlogCreation}>
          <Notification data={notification} />
        </BlogForm>
      </Togglable>
    );
  };

  if (user === null) {
    return loginForm();
  }

  return (
    <div>
      logged in as {user.name}
      <button onClick={handleLogout}>logout</button>
      {createBlogForm()}
      <h2>Blogs</h2>
      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onLike={handleLike}
            onRemove={handleBlogRemoval}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
