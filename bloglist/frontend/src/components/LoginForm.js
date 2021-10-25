import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import loginService from '../services/login';
import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = (props) => {
  const history = useHistory();
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
        history.push('/');
      })
      .catch((exception) => {
        dispatch(
          setNotification('error', exception.response.data.error, 5)
        );
      });
  };

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <div className="flex flex-col items-center h-screen py-10 bg-gray-300">
      {props.children}
      <div className="p-5 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center">
        <form onSubmit={handleLogin}>
          <div>
            <label className="block text-grey-darker text-sm font-bold my-2">
              Username
            </label>
            <input
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              value={username}
              onChange={handleUsername}
            />
          </div>
          <div>
            <label className="block text-grey-darker text-sm font-bold my-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-1 px-3 text-grey-darker"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <button
            id="login-button"
            className="bg-blue-600 hover:bg-blue-dark text-white font-bold my-2 py-2 px-4 rounded"
            type="submit"
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
