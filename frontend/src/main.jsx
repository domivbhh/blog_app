import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PostDetails from './pages/PostDetails.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Profile from './pages/Profile.jsx'
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from './store/store.js'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/posts/post/:id',
        element:<PostDetails/>
      },
      {
        path:'/write',
        element:<CreatePost/>
      },
      {
        path:'/edit/:id',
        element:<EditPost/>
      },
      {
        path:'/profile/:id',
        element:<Profile/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <Toaster/>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </>
)
