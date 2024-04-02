import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import './css/styles.css'


const Sidebar = () => {
    const navigate = useNavigate()
    const onHandleLogout = () => {
        localStorage.removeItem('access_token');//xóa access token ra khỏi local storage
        localStorage.removeItem('refresh_token');
        navigate('/login');//chuyển hướng đăng nhập sang trang an toàn 
    }
    return (

        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">

                        <div className="nav-link" >
                            <i ><img src='/assets/img/admin_avatar.jpg' alt='Admin' style={{ width: '25px' }} /></i>
                            <div className="sb-nav-link-icon"></div>
                            Admin
                        </div>
                        <span className="admin-badge" ><small>Quản trị viên</small></span>

                        <div className="sb-sidenav-menu-heading">Dữ liệu</div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseDashboard" aria-expanded="false" aria-controls="collapseDashboard">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-gauge"></i></div>
                            Tổng quan
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseDashboard" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">

                                <Link to='' className='nav-link'>Thống kê</Link>
                                <Link to='/dashboard/userlist' className='nav-link'>Danh sách nhân viên</Link>
                                <Link to='/dashboard/accountlist' className='nav-link'>Danh sách tài khoản</Link>
                                <Link to='/api/position/list' className='nav-link'>Danh sách chức vụ</Link>
                                <Link to='/api/employeetype' className='nav-link'>Danh sách loại NV</Link>

                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseUser" aria-expanded="false" aria-controls="collapseUser">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-users"></i></div>
                            Quản lý nhân viên
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseUser" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/api/position' className='nav-link'>Chức vụ</Link>
                                <Link to='/api/employeetype/add' className='nav-link'>Loại nhân viên</Link>
                                <Link to='/api/user/add' className='nav-link'>Thêm mới nhân viên</Link>
                                <Link to='/api/user' className='nav-link'>Danh sách nhân viên</Link>
                                <Link to='/api/user/id' className='nav-link'> Thông tin nhân viên</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseWorkTime" aria-expanded="false" aria-controls="collapseWorkTime">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-business-time"></i></div>
                            Thời gian làm việc
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseWorkTime" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className='nav-link'>Lịch làm việc</Link>
                                <Link to='' className='nav-link'>Thời gian làm việc</Link>
                                <Link to='' className='nav-link'>Thời gian nghỉ phép</Link>

                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Quản lý phòng ban

                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/api/department' className='nav-link'>Phòng ban</Link>

                                <Link to='/api/department/list' className='nav-link'>Danh sách phòng ban</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseSalary" aria-expanded="false" aria-controls="collapseSalary">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-money-bill"></i></div>
                            Quản lý lương
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseSalary" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/api/salary' className='nav-link'>Bảng lương</Link>
                                <Link to='/api/salary/add' className='nav-link'>Tính lương</Link>

                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseRating" aria-expanded="false" aria-controls="collapseRating">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-folder"></i></div>
                            Quản lý công tác
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseRating" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/api/trip/add' className='nav-link'>Tạo công tác</Link>
                                <Link to='/api/trip' className='nav-link'>Danh sách công tác</Link>

                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCart" aria-expanded="false" aria-controls="collapseCart">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-users"></i></div>
                            Nhóm nhân viên
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseCart" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className='nav-link'>Tạo nhóm</Link>
                                <Link to='' className='nav-link'>Danh sách nhóm</Link>

                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseStars" aria-expanded="false" aria-controls="collapseStars">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-star"></i></div>
                            Khen thưởng-Kỷ luật
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseStars" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className='nav-link'>Khen thưởng</Link>
                                <Link to='' className='nav-link'>Kỷ luật</Link>

                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#CollapseAuth" aria-expanded="false" aria-controls="CollapseAuth">
                            <div className='sb-nav-link-icon'><i className="fa-solid fa-user"></i></div>
                            Tài khoản
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="CollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">

                                <Link to='/api/account/update' className="nav-link" > Thông tin tài khoản </Link>
                                <Link to='/api/account/add' className="nav-link" >  Tạo tài khoản </Link>
                                <Link to='/api/account' className="nav-link" > Danh sách tài khoản </Link>
                                <Link to='/resetpassword' className='nav-link' onClick={onHandleLogout}> Đổi mật khẩu </Link>
                                <Link to='/login' className='nav-link' onClick={onHandleLogout}> Đăng xuất </Link>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    QLNS
                </div>
            </nav>
        </div>

    )
}

export default Sidebar