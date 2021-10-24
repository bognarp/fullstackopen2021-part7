import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.type && notification.message) {
    const { type, message } = notification;
    return <div className={type}>{message}</div>;
  }
  return null;
};

export default Notification;
