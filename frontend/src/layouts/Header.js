import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    const onHandleLogout = () => {
        localStorage.removeItem('access_token');//xóa access token ra khỏi local storage
        localStorage.removeItem('refresh_token');
        navigate('/login');//chuyển hướng đăng nhập sang trang an toàn 
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <Link to='/' className="navbar-brand ps-5" > Quản lý nhân sự </Link>

                <button className="btn btn-link btn-sm order-6 order-lg-0 me-6 me-lg-3" id="sidebarToggle" ><i className="fa-solid fa-bars"></i></button>

                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i ><img src='/assets/img/admin_avatar.jpg' alt='Admin' style={{ width: '23px' }}/></i> Admin </a>

                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><Link to='/profile' className="dropdown-item" ><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile </Link></li>
                            <li><Link to='/login' className="dropdown-item" onClick={onHandleLogout}><i className="fa-solid fa-gears"></i> Settings </Link></li>
                            <li><Link to='/activitylog' className="dropdown-item" ><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> Activity Log </Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link to='/login' className="dropdown-item" onClick={onHandleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout </Link></li>
                        </ul>

                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default Header;