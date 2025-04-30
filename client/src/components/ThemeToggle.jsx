import React from 'react';
import PropTypes from 'prop-types';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-gray-100" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  );
};

ThemeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ThemeToggle;