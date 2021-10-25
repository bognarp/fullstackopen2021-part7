import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../services/blogs';
import CommentForm from './CommentForm';
import {
  removeBlogById,
  updateBlog,
  initializeBlogs,
} from '../reducers/blogReducer';
import { useParams, useHistory } from 'react-router';

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs);
    }
  }, [dispatch]);

  const like = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(updateBlog(likedBlog)).catch((ex) => {
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
      history.push('/');
    }
  };

  if (blogs.length === 0) {
    return null;
  }

  if (!blog) {
    return <p>Invalid blog</p>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>Author: {blog.author}</h3>
      <a href={`${blog.url}`} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <br />
      <strong>Likes</strong>: {blog.likes}{' '}
      <button className="btn-blue-xs" id="like-button" onClick={like}>
        like
      </button>{' '}
      <p>Added by {blog.user.username}</p>
      <br />
      {user.username === blog.user.username ? (
        <button className="btn-purple" id="remove-button" onClick={removeBlog}>
          delete
        </button>
      ) : null}
      <h4>Comments</h4>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
