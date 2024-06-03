import React from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    )
  },
  {
    path: '/books',
    element: (
      <Layout>
        <p>도서 목록</p>
      </Layout>
    )
  },
  {
    path: '/login',
    element: (
      <Layout>
        <p>Login page</p>
      </Layout>
    ),
  },
  {
    path: '/join',
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
])

function App() {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
