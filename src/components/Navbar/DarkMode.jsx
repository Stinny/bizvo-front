import { SunOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode was previously set
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    // Set dark mode class on body element
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className="flex items-center gap-1">
      {darkMode ? (
        <Moon size={12} className="text-white" />
      ) : (
        <Sun size={12} className="text-stone-800" />
      )}
      <Switch
        size="small"
        checked={darkMode}
        onChange={(checked) => setDarkMode(checked)}
        style={{
          backgroundColor: darkMode ? 'rgb(82 82 82)' : 'rgb(229 231 235)',
        }}
      />
    </div>
  );
};

export default DarkMode;
