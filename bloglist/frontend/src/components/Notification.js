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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
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
