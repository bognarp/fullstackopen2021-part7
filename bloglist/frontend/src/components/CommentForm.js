import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../reducers/blogReducer';

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleNewComment = (event) => {
    event.preventDefault();

    dispatch(commentBlog(blog, comment)).catch((ex) => {
      console.log(ex.response.data);
    });
    setComment('');
  };

  const handleCommentInput = ({ target }) => {
    setComment(target.value);
  };

  return (
    <div>
      <form onSubmit={handleNewComment}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentInput}
        />
        <button className="btn-blue-xs" type="submit">comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
