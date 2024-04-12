import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import requestApi from '../helpers/Api'
import * as actions from '../redux/actions'
import { useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';
import Table from './Table/Table';
import { formatDateTime } from '../helpers/common';

const Dashboard = () => {
    const dispatch = useDispatch()
    const [DashboardData, setDashboardData] = useState({});
    const [salary, setSalary] = useState([])
    const [kyluat, setKyLuat] = useState([])
    const [reward, setReward] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [refresh, setRefresh] = useState(Date.now())

    const columns = [
        {
            name: 'STT',
            element: row => row.id
        },
        {
            name: 'Mã kỷ luật',
            element: row => row.MaKyLuat
        },
        {
            name: "Tên kỷ luật",
            element: row => row.TenKyLuat
        },
        {
            name: "Tên nhân viên",
            element: row => row.user.name

        },
        {
            name: 'Ngày quyết định',
            element: row => formatDateTime(row.NgayQuyetDinh)
        },
        // {
        //     name: 'Tên loại',
        //     element: row => row.TenLoai
        // },
        {
            name: 'Hình thức',
            element: row => row.HinhThuc
        },
        {
            name: 'Số tiền',
            element: row => <div style={{ color: 'blue' }}>{parseFloat(row.SoTien).toLocaleString('vi-VN')}</div>
        },
        {
            name: "Ngày kỷ luật",
            element: row => formatDateTime(row.NgayKyLuat)
        },

    ]
    const column = [
        {
            name: "STT",
            element: row => row.id
        },
        {
            name: "Mã khen thưởng",
            element: row => row.MaKhenThuong
        },
        {
            name: 'Tên khen thưởng',
            element: row => row.TenKhenThuong
        },
        {
            name: "Tên nhân viên",
            element: row => row.user.name
        },
        {
            name: "Ngày quyết định",
            element: row => formatDateTime(row.NgayQuyetDinh)
        },
        {
            name: "Hình thức",
            element: row => row.HinhThuc
        },
        {
            name: "Số tiền",
            element: row => <div style={{ color: 'blue' }}>{parseFloat(row.SoTien).toLocaleString('vi-VN')}</div>
        },
        {
            name: "Ngày khen thưởng",
            element: row => formatDateTime(row.NgayKhenThuong)
        },
    ]


    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`

        requestApi(`/api/kyluat/${query}`, 'GET', []).then(respone => {
            console.log('res=>', respone)
            setKyLuat(respone.data.data)
            setNumofPage(respone.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [itemsPerPage, refresh, currentPage, searchString])

    useEffect(() => {
        dispatch(actions.controlLoading(true));
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/reward${query}`, 'GET', []).then(response => {
            console.log("res=>", response)
            setReward(response.data.data);
            setNumofPage(response.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false));
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    useEffect(() => {
        const promiseUser = requestApi('/api/user', 'GET')
        const promisePosition = requestApi('/api/position', 'GET')
        const promiseEmployeeType = requestApi('/api/employeetype', 'GET')
        const promiseDepartment = requestApi('/api/department', 'GET')
        const promiseTrip = requestApi('/api/trip', 'GET')
        const promiseGroupUser = requestApi('/api/groupuser', 'GET')
        dispatch(actions.controlLoading(true))
        Promise.all([promiseUser, promisePosition, promiseEmployeeType, promiseDepartment, promiseTrip, promiseGroupUser]).then(res => {
            console.log('res=>', res)
            setDashboardData({
                ...DashboardData, totalUser: res[0].data.total, totalPosition: res[1].data.total, totalEmployeeType: res[2].data.total, totalDepartment: res[3].data.total, totalTrip: res[4].data.total, totalGroupUser: res[5].data.total
            })
            dispatch(actions.controlLoading(false))

        }).catch(error => {
            console.log("error=>", error)
            dispatch(actions.controlLoading(false))
        })


    }, [])
    return (
        <div id="layoutSidenav_content">

            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Tổng quan</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Tổng quan</li>
                        <li className='breadcrumb-item'>Thống kê</li>
                    </ol>
                    <div className="row">
                        <div className="col-xl-3 col-md-6 custom-font">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body"><i className="fa-solid fa-user"></i> Tổng số nhân viên

                                    {DashboardData.totalUser && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                        {DashboardData.totalUser}
                                    </span>)}</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/user' className="small text-white stretched-link" >Danh sách nhân viên</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 custom-font">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body"><i className="fa-solid fa-user"></i> Tổng số chức vụ

                                    {DashboardData.totalPosition && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                        {DashboardData.totalPosition}
                                    </span>)}</div>

                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/position' className="small text-white stretched-link" >Danh sách chức vụ</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 custom-font">
                            <div className="card bg-danger text-white mb-4 ">
                                <div className="card-body"><i className="fa-solid fa-user-group"></i> Tổng số loại nhân viên
                                    {DashboardData.totalEmployeeType && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                        {DashboardData.totalEmployeeType}
                                    </span>)}</div>

                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/employeetype' className="small text-white stretched-link" >Danh sách loại nhân viên</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 custom-font">
                            <div className="card bg-primary text-white mb-4 ">
                                <div className="card-body"><i class="fas fa-columns"></i> Tổng số phòng ban
                                    {DashboardData.totalDepartment && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                        {DashboardData.totalDepartment}
                                    </span>)}</div>

                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/department' className="small text-white stretched-link" >Danh sách phòng ban</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 custom-font">
                            <div className="card bg-primary text-white mb-4 ">
                                <div className="card-body"><i class="fa-solid fa-folder"></i> Tổng số công tác
                                    {DashboardData.totalTrip && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                        {DashboardData.totalTrip}
                                    </span>)}</div>

                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/trip' className="small text-white stretched-link" >Danh sách công tác</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 custom-font">
                            <div className="card bg-warning text-white mb-4 ">
                                <div className="card-body"><i className="fa-solid fa-user-group"></i> Tổng số nhóm nhân viên
                                    {DashboardData.totalGroupUser && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                        {DashboardData.totalGroupUser}
                                    </span>)}</div>

                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/groupuser' className="small text-white stretched-link" >Danh sách nhóm nhân viên</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 custom-font">
                            <div className="card bg-success text-white mb-4 ">
                                <div className="card-body">
                                    <i className="fas fa-file-excel"></i> Xuất Excel
                                    <CSVLink data={salary} filename={"salary.csv"} className="text-white">

                                    </CSVLink>

                                </div>

                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/salary' className="small text-white stretched-link" >Danh sách lương</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="mb-0">Danh sách kỷ luật</h2>
                            </div>
                            <Table
                                name="Danh sách kỷ luật"
                                data={kyluat}
                                columns={columns}
                                numOfPage={numOfPage}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                                onChangeItemsPerPage={setItemsPerPage}
                                onKeySearch={(keyword) => {

                                    console.log('keyword in user list comp=>', keyword)
                                    setSearchString(keyword)
                                }}
                                onSelectedRows={rows => {
                                    console.log('selected row in uselist=>', rows)
                                    setSelectedRows(rows)
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="mb-0">Danh sách khen thưởng</h2>
                            </div>
                            <Table
                                name="Danh sách khen thưởng"
                                data={reward}
                                columns={column}
                                numOfPage={numOfPage}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                                onChangeItemsPerPage={setItemsPerPage}
                                onKeySearch={(keyword) => {

                                    console.log('keyword in user list comp=>', keyword)
                                    setSearchString(keyword)
                                }}
                                onSelectedRows={rows => {
                                    console.log('selected row in uselist=>', rows)
                                    setSelectedRows(rows)
                                }}
                            />
                        </div>

                    </div>
                </div>

            </main>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; Your Website 2024</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Dashboard