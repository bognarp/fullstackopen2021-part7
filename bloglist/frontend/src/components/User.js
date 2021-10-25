import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { useParams } from 'react-router';

const User = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers());
    }
  }, [dispatch]);

  if (users.length === 0) {
    return null;
  }

  if (!user) {
    return <p>Invalid user</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>username: {user.username}</p>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
