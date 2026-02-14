import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./../components/Navbar"
import Footer from "./Footer"
function Layout() {
  return (
    <>
    <Navbar></Navbar>
      <Outlet></Outlet> 
    <Footer></Footer>
    </>
  )
}

export default Layout