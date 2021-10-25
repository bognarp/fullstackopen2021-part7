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
    <div>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-2 bg-indigo-500">
        <div className="container px-8 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
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
          </div>
          <div className="lg:flex flex-grow items-center">
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
              <li className="nav-item">
                {user ? (
                  <>
                    <em className="px-3 text-s text-white">
                      logged in as {user.username}
                    </em>
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
