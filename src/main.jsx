import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './layouts/Root'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AuthProvider from './contexts/AuthContext/AuthProvider'
import Profile from './pages/Profile/Profile'
import AddFoods from './pages/Add Foods/AddFoods'
import ManageFoods from './pages/Manage Foods/ManageFoods'
import FoodRequests from './pages/Food Request/FoodRequests'
import Private from './layouts/Private'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true,path: "/home", element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/profile', element: <Profile /> },
      { path: '/add', element: <Private><AddFoods /></Private> },
      { path: '/manage', element: <Private><ManageFoods /></Private> },
      { path: '/request', element: <Private><FoodRequests /></Private> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
