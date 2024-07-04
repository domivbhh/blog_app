import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
     
      <Outlet/>

    </div>
  )
}

export default App
