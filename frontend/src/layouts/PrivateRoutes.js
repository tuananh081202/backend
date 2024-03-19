import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
//đường dẫn chỉ dành cho người dùng đã đăng nhập
const PrivateRoutes = () => {

    let token = localStorage.getItem('access_token') || false;
    return (
       token? <Outlet/> : <Navigate to='/login'/>
    )
 
}

export default PrivateRoutes