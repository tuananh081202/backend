import React from 'react'
import { Link } from 'react-router-dom'
// import './css/styles.css'


const Sidebar = () => {
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
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-gauge"></i></div>
                            Tổng quan
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseDashboard" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">

                                <Link to='' className='nav-link'>Thống kê</Link>
                                <Link to='' className='nav-link'>Danh sách sản phẩm</Link>
                                <Link to='' className='nav-link'>Danh sách người dùng</Link>

                            </nav>
                        </div>



                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseUser" aria-expanded="false" aria-controls="collapseUser">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-users"></i></div>
                            Quản lý nhân viên
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseUser" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className='nav-link'>Chức vụ</Link>
                                <Link to='' className='nav-link'>Trình độ</Link>
                                <Link to='' className='nav-link'>Loại nhân viên</Link>
                                <Link to='' className='nav-link'>Thêm mới nhân viên</Link>
                                <Link to='' className='nav-link'>Danh sách nhân viên</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Quản lý phòng ban
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className='nav-link'>Thêm phòng ban</Link>
                                <Link to='' className='nav-link'>Danh sách phòng ban</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-money-bill"></i></div>
                            Quản lý lương
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className='nav-link'>Bảng  lương</Link>
                                <Link to='' className='nav-link'>Tính lương</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseRating" aria-expanded="false" aria-controls="collapseRating">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-folder"></i></div>
                            Quản lý công tác
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseRating" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className='nav-link'>Tạo công tác</Link>
                                <Link to='' className='nav-link'>Danh sách công tác</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCart" aria-expanded="false" aria-controls="collapseCart">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-users"></i></div>
                            Nhóm nhân viên
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseCart" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className='nav-link'>Tạo nhóm</Link>
                                <Link to='' className='nav-link'>Danh sách nhóm</Link>

                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#CollapseAuth" aria-expanded="false" aria-controls="CollapseAuth">
                            <div className='sb-nav-link-icon'><i class="fa-solid fa-user"></i> </div>
                            Tài khoản
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="CollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='' className="nav-link" > Thông tin cá nhân </Link>
                                <Link to='' className="nav-link" > Thông tin tài khoản </Link>
                                <Link to='/register' className="nav-link" > Đăng ký </Link>
                                <Link to='' className="nav-link" > Danh sách tài khoản </Link>
                                <Link to='' className='nav-link'> Đổi mật khẩu </Link>
                                <Link to='/login' className='nav-link'> Đăng xuất </Link>

                            </nav>
                        </div>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    CRUD
                </div>
            </nav>
        </div>

    )
}

export default Sidebar