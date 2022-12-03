import App from 'next/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// import App from './layouts/App';
const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(<BrowserRouter><App /></BrowserRouter>);