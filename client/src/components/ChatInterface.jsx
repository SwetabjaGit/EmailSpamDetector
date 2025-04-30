import React, { useState, useEffect } from 'react';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import ThemeToggle from './ThemeToggle';
import TypingIndicator from './TypingIndicator';
import { MessageSquare } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [assistantReply, setAssistantReply] = useState({
    Email_Length: 0,
    Num_Links: 0,
    Contains_Links: false,
    Contains_Spam_Words: false,
    Is_Fraud: false
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // if (typeof window !== 'undefined') {
    //   return window.matchMedia('(prefers-color-scheme: dark)').matches;
    // }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const createAssistantReplyText = () => {
    return `Email_Length: ${assistantReply.Email_Length}
Num_Links: ${assistantReply.Num_Links}
Contains_Links: ${assistantReply.Contains_Links}
Contains_Spam_Words: ${assistantReply.Contains_Spam_Words}
${assistantReply.Is_Fraud ? "🔴 This email is likely FRAUD (Spam)!" : "🟢 This email is SAFE!"}`;
  }

  const handleSendMessage = (content) => {
    const newUserMessage = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const newAssistantMessage = {
        id: `assistant-${Date.now()}`,
        content: createAssistantReplyText(),
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
    }, Math.random() * 700 + 800);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MessageSquare size={22} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Email Spam Detector
              </h1>
            </div>
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="h-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col">
            <ChatHistory messages={messages} />
            {isTyping && <TypingIndicator />}
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <MessageInput 
            onSendMessage={handleSendMessage} 
            disabled={isTyping}
            assistantReply={assistantReply}
            setAssistantReply={setAssistantReply}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;