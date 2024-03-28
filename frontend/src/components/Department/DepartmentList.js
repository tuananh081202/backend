import React from 'react'
import { Link } from 'react-router-dom'
const DepartmentList = () => {
    return (
        <div id="layoutSidenav_content">

            <main>
                <div className="container-fluid px-4">
                    <h3 className="mt-4">Quản lý phòng ban</h3>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Tổng quan</li>
                        <li className='breadcrumb-item'>Quản lý phòng ban</li>
                    </ol>
                    <div className='card mb-4'>
                        <h5 className='mt-4'> Thao tác chức năng </h5>

                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <Link className='btn btn-lg btn-success' to='/api/department/'><i className='fa fa-plus'></i>Thêm phòng ban</Link>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-info text-white mb-4">
                                <div className="card-body">Phòng phát triển 1</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">View Details</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Phòng phát triển 2</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">View Details</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Phòng phát triển 3</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">View Details</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Phòng phát triển 4</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">View Details</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </main>

        </div>
    )
}

export default DepartmentList