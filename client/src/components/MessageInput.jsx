import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Send } from 'lucide-react';

const MessageInput = ({ onSendMessage, disabled, assistantReply, setAssistantReply }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  useEffect(() => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  }, [assistantReply]);

  const checkIfEmailIsSpam = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/email/getdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: message,
      });

      const data = await res.json(); // assuming the response is JSON
      console.log(data);
      setAssistantReply(data);   
    } catch (err) {
      console.error('Error:', err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfEmailIsSpam();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your email content..."
        disabled={disabled}
        className="flex-1 min-h-[56px] max-h-[200px] p-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
        rows={1}
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className={`p-4 rounded-xl transition-all ${
          message.trim() && !disabled
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        <Send size={20} className="text-current" />
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  assistantReply: PropTypes.object.isRequired,
  setAssistantReply: PropTypes.func.isRequired,
};

export default MessageInput;