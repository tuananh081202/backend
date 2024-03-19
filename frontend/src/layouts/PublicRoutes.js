import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
//đường dẫn dành cho tất cả người dùng đều có thể truy cập
const PublicRoutes = () => {

  let token= localStorage.getItem('access_token') || false;
  return (
    !token? <Outlet/> : <Navigate to='/'/>
  )
  
}

export default PublicRoutes