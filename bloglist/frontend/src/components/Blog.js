import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import blogService from '../services/blogs';
import { removeBlogById, likeBlog } from '../reducers/blogReducer';

const Blog = (props) => {
  const dispatch = useDispatch();
  const blog = props.blog;
  const user = props.user;
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const visible = { display: expanded ? 'none' : '' };
  const hidden = { display: expanded ? '' : 'none' };

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const like = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(likeBlog(likedBlog)).catch((ex) => {
      console.log(ex.response.data);
    });
  };

  const removeBlog = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      blogService.setToken(user.token);

      dispatch(removeBlogById(blog.id)).catch((ex) => {
        console.log(ex.response.data);
      });
    }
  };

  return (
    <div style={blogStyle}>
      <div style={visible} className="simpleView">
        {blog.title} {blog.author}
        <button onClick={toggleExpansion}>view</button>
      </div>
      <div style={hidden} className="extendedView">
        <button onClick={toggleExpansion}>hide</button> <br />
        <strong>Title</strong>: {blog.title} <br />
        <strong>Author</strong>: {blog.author} <br />
        <strong>Url</strong>: {blog.url} <br />
        <strong>Likes</strong>: {blog.likes}{' '}
        <button id="like-button" onClick={like}>
          like
        </button>{' '}
        <br />
        {user.username === blog.user.username ? (
          <button id="remove-button" onClick={removeBlog}>
            remove
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
