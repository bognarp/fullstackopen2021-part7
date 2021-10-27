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

  return (
    <>
      <nav className="flex flex-wrap  sm:flex-row flex-col items-center content-center justify-between px-2 py-2 bg-indigo-500">
        <ul className="flex sm:flex-row flex-col list-none">
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75 no-underline hover:underline"
              to="/"
            >
              blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75 no-underline hover:underline"
              to="/users"
            >
              users
            </Link>
          </li>
        </ul>
        <ul className="flex sm:flex-row flex-col items-center content-center list-none">
          <li className="nav-item flex sm:flex-row flex-col">
            {user ? (
              <>
                <span className="flex items-center px-3 py-2 font-light text-xs text-white">
                  logged in as {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-purple"
                  type="button"
                >
                  logout
                </button>
              </>
            ) : (
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/login"
              >
                login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
