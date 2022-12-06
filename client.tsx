import App from 'next/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'flowbite';

import { Provider } from 'react-redux';
import wrapper from './store/config';

// import App from './layouts/App';
const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(<BrowserRouter><App /></BrowserRouter>);