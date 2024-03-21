// src/index.js or src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app inside createRoot
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
