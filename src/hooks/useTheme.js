import { useState, useEffect } from 'react';

const lightTheme = {
  '--bg': '#f5f7fa',
  '--panel': '#ffffff',
  '--muted': '#6b7280',
  '--text': '#1f2937',
  '--brand': '#7c5cff',
  '--good': '#2fd17a',
  '--bad': '#ff7d7d',
  '--warn': '#ffcd57',
  '--border': '#e5e7eb',
};

const darkTheme = {
  '--bg': '#0f1222',
  '--panel': '#171a2e',
  '--muted': '#8b91b4',
  '--text': '#e7e9f7',
  '--brand': '#7c5cff',
  '--good': '#2fd17a',
  '--bad': '#ff7d7d',
  '--warn': '#ffcd57',
  '--border': '#23264a',
};

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

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