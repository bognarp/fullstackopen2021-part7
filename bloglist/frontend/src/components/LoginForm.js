import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import { setUser } from '../reducers/userReducer';
import {
  setNotification,
  resetNotification,
} from '../reducers/notificationReducer';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    loginService
      .login({ username, password })
      .then((user) => {
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(user)
        );
        dispatch(setUser(user));
      })
      .catch((exception) => {
        dispatch(
          setNotification('error', exception.response.data.error)
        );

        setTimeout(() => {
          dispatch(resetNotification());
        }, 5000);
      });
  };

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {props.children}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
