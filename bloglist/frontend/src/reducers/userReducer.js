const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'RESET_USER':
      return null;
    default:
      return state;
  }
};

export const loadUserFromLocalStorage = () => {
  const loggedUserJSON = window.localStorage.getItem(
    'loggedBlogAppUser'
  );
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return {
      type: 'SET_USER',
      data: user,
    };
  }
  return {
    type: null,
  };
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const resetUser = () => {
  window.localStorage.removeItem('loggedBlogAppUser');
  return {
    type: 'RESET_USER',
  };
};

export default userReducer;
