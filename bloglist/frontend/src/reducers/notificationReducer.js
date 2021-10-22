const initialState = {
  type: null,
  message: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return {
        type: action.data.type,
        message: action.data.message,
      };
    case 'RESET_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (type, message) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      type,
      message,
    },
  };
};

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  };
};

export default notificationReducer;
