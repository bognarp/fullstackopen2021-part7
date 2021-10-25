import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../reducers/userReducer';

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(resetUser());
    history.push('/login');
  };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <>
          <em>logged in as {user.username}</em>
          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
