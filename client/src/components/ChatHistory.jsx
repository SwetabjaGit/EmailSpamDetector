import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

const ChatHistory = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-3 max-w-xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
              Email Spam Detector
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enter your email content below to check if its spam.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 py-8">
          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

ChatHistory.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(['user', 'assistant']).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
  })).isRequired,
};

export default ChatHistory;