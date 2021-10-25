import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.type && notification.message) {
    const { type, message } = notification;

    const color = type === 'error' ? 'bg-red-500' : 'bg-green-500';

    return (
      <div
        className={
          'text-white px-6 py-4 border-0 rounded relative mb-4 ' +
          `${color}`
        }
      >
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-bell" />
        </span>
        <span className="inline-block align-middle mr-8">
          <b className="capitalize">{type}!</b> {message}
        </span>
      </div>
    );
  }
  return null;
};

export default Notification;

// <div className={type}>{message}</div>
