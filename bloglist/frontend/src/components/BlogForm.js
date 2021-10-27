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
    <Togglable buttonLabel="submit new blog" ref={blogFormRef}>
      {props.children}
      <form className="w-1/2 mt-3" onSubmit={handleBlogCreation}>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-900 block mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            required=""
            value={blogTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="author"
            className="text-sm font-medium text-gray-900 block mb-1"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            required=""
            value={blogAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="url"
            className="text-sm font-medium text-gray-900 block mb-1"
          >
            Url
          </label>
          <input
            type="text"
            id="url"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            required=""
            value={blogUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" className="btn-green">
          Submit
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
