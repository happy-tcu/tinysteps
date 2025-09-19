import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Square } from 'lucide-react';

const ThemeToggle = () => {
  const [isColorful, setIsColorful] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-colorful');
    if (savedTheme === 'true') {
      setIsColorful(true);
      document.documentElement.classList.add('colorful');
    }
  }, []);

  const toggleTheme = () => {
    const newColorful = !isColorful;
    setIsColorful(newColorful);
    
    if (newColorful) {
      document.documentElement.classList.add('colorful');
      localStorage.setItem('theme-colorful', 'true');
    } else {
      document.documentElement.classList.remove('colorful');
      localStorage.setItem('theme-colorful', 'false');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="transition-colors"
      title={isColorful ? "Switch to Black & White" : "Switch to Colorful"}
    >
      {isColorful ? (
        <Square className="h-4 w-4" />
      ) : (
        <Palette className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;