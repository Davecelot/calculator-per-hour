import { useState, useEffect } from 'react';

const lightTheme = {
  '--bg': '#f1f5f2',
  '--panel': 'rgba(255,255,255,0.8)',
  '--muted': '#6b705c',
  '--text': '#1a1d1a',
  '--brand': '#4f772d',
  '--good': '#588157',
  '--bad': '#bc4749',
  '--warn': '#e9c46a',
  '--border': '#b7b7a4',
};

const darkTheme = {
  '--bg': '#1b1d1a',
  '--panel': 'rgba(40,44,38,0.8)',
  '--muted': '#a3a69b',
  '--text': '#e7e9e3',
  '--brand': '#4f772d',
  '--good': '#588157',
  '--bad': '#bc4749',
  '--warn': '#e9c46a',
  '--border': '#3f4430',
};

export function useTheme() {
  // Use the lighter palette by default
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    const theme = isDark ? darkTheme : lightTheme;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
}