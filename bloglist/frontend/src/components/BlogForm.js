import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';
import { createNewBlog } from '../reducers/blogReducer';
import Togglable from './Togglable';

const BlogForm = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const blogFormRef = useRef();

  const handleBlogCreation = (event) => {
    event.preventDefault();
    blogService.setToken(user.token);

    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    dispatch(createNewBlog(blog))
      .then(() => {
        dispatch(
          setNotification(
            'success',
            `Added new blog: ${blog.title} by ${blog.author}`,
            3
          )
        );
        setTimeout(() => {
          blogFormRef.current.toggleVisibility();
        }, 3000);
      })
      .catch((exception) => {
        dispatch(
          setNotification('error', exception.response.data.error, 5)
        );
      });

    setBlogAuthor('');
    setBlogTitle('');
    setBlogUrl('');
  };

  const handleTitleChange = ({ target }) => {
    setBlogTitle(target.value);
  };
  const handleAuthorChange = ({ target }) => {
    setBlogAuthor(target.value);
  };
  const handleUrlChange = ({ target }) => {
    setBlogUrl(target.value);
  };

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <h2>Create new blog</h2>
      {props.children}
      <form onSubmit={handleBlogCreation}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={blogTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={blogAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={blogUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
