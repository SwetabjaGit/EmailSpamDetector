import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`${isUser ? 'bg-transparent' : 'bg-white dark:bg-gray-800'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] lg:max-w-[65%] rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
          }`}>
            <div className="text-base whitespace-pre-wrap break-words">
              {message.content}
            </div>
            <div className={`text-xs mt-2 ${
              isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {formattedTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(['user', 'assistant']).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default Message;