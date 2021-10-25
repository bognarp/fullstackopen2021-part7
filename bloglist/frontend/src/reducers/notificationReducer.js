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

let timeoutId;

export const setNotification = (type, message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        type,
        message,
      },
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  };
};

export default notificationReducer;
