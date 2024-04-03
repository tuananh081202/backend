import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DescriptionCell from '../../helpers/DescriptionCell'
import { formatDateTime } from '../../helpers/moment'
import { useDispatch } from 'react-redux'
import requestApi from '../../helpers/Api'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap'
import Table from '../Table/Table'
import { CSVLink } from 'react-csv'

const DepartmentList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [DashboardData,setDashboardData] = useState({})
    const [department, setDepartment] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [numOfPage, setNumofPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const [dataExport, setDataExport] = useState([])

    const columns = [
        {
            name: 'STT',
            element: row => row.id
        },
        {
            name: 'Mã phòng ban',
            element: row => row.maPB
        },
        {
            name: 'Tên phòng ban',
            element: row => row.tenPB
        },
        {
            name: 'Mô tả',
            element: row => <DescriptionCell description={row.description} />
        },
        {
            name: 'Người tạo',
            element: row => row.createdBy
        },
        {
            name: 'Ngày tạo',
            element: row => formatDateTime(row.created_at)
        },
        {
            name: 'Ngày sửa',
            element: row => formatDateTime(row.updated_at)
        },
        {
            name: 'Hành động',
            element: row => (
                <>
                    <Link to={`/api/department/edit/${row.id}`} className='btn btn-sm btn-warning me-1'  ><i className="fa fa-pencil"  ></i> Sửa </Link>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i> Xóa</button>
                </>
            )
        }
    ]

    const handleDelete = (id) => {
        console.log('Single delete with id', id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const requestDeleteApi = () => {
        requestApi(`/api/department/${deleteItem}`, 'DELETE', []).then(respone => {
            setShowModal(false)
            setRefresh(Date.now())
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            setShowModal(false)
            dispatch(actions.controlLoading(false))
        })
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true));
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/department${query}`, 'GET', []).then(response => {
            console.log("res=>", response)
            setDepartment(response.data.data);
            setNumofPage(response.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false));
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    useEffect(() => {
        const TongSoPhongBan = requestApi('/api/department/', 'GET')
       
        dispatch(actions.controlLoading(true))
        Promise.all([TongSoPhongBan]).then(res => {
            console.log('res=>', res)
            setDashboardData({
                ...DashboardData, TongSoPhongBan: res[0].data.total, 
            })
            dispatch(actions.controlLoading(false))

        }).catch(error => {
            console.log("error=>", error)
            dispatch(actions.controlLoading(false))
        })


    }, [])

    // const getDepartmentExport = (_event, done) => {
    //     let result = []
    //     if (DepartmentList && DepartmentList.length > 0) {
    //         result.push(['id', 'maPB', 'tenPB', 'description', 'createdBy', 'created_at', 'updated_at']);
    //         DepartmentList.map(item => {
    //             let arr = [];
    //             arr[0] = item.id
    //             arr[1] = item.maPB
    //             arr[2] = item.tenPB
    //             arr[3] = item.description
    //             arr[4] = item.createdBy
    //             arr[5] = item.created_at
    //             arr[6] = item.updated_at
    //             result.push(arr)
    //         })
    //         setDataExport(result);
    //         done();
    //     }
    // }
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
                        <h4 className='mt-2'> Chức năng </h4>

                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <Link className='btn btn-lg btn-success me-2' to='/api/department/'><i className='fa fa-plus'></i>Thêm phòng ban</Link>
                                    {/* <CSVLink
                                        filename={"department.csv"}
                                        className="btn btn-lg btn-primary me-2"
                                        data={department}
                                        target="_blank"
                                        asyncOnClick={true}
                                        onClick={(event, done) => getDepartmentExport(event, done)}
                                    ><i className='fa-solid fa-file-arrow-down'></i> Xuất Excel </CSVLink> */}
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-md-6" >
                            <div className="card bg-secondary text-white mb-4">
                                <div className="card-body">Phòng hành chính</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/department/1' className="small text-white stretched-link" >Chi tiết phòng ban</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-info text-white mb-4">
                                <div className="card-body">Phòng phát triển 1</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/department/2' className="small text-white stretched-link" >Chi tiết phòng ban</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Phòng phát triển 2</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/department/4' className="small text-white stretched-link" >Chi tiết phòng ban</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Phòng phát triển 3</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/department/5' className="small text-white stretched-link" >Chi tiết phòng ban</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Phòng giám đốc</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/department/6' className="small text-white stretched-link" >Chi tiết phòng ban</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-light text-dark mb-4">
                                <div className="card-body">Tổng số phòng ban
                                    
                                    {DashboardData.TongSoPhongBan  && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
                                        {DashboardData.TongSoPhongBan}
                                    </span>)}</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/api/department/' className="small text-dark stretched-link" >Phòng ban</Link>
                                    <div className="small text-dark"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table
                        name="Danh sách phòng ban"
                        data={department}
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

            </main>
            <Modal show={showModal} onHide={() => setShowModal(false)} size='sm'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete?

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                    <Button className='btn-danger' onClick={requestDeleteApi}>Delete</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default DepartmentList