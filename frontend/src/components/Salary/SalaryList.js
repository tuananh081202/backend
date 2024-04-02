import React, { useEffect, useState } from 'react'
import requestApi from '../../helpers/Api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { CSVLink } from 'react-csv'
import { Modal,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Table from '../Table/Table'
import { formatDateTime } from '../../helpers/common'
const SalaryList = () => {
    const dispatch = useDispatch([])
    const [salary, setSalary] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const [dataExport, setDataExport] = useState([])

    const columns = [
        {
            name: "STT",
            element: row => row.id
        },
        {
            name: "Mã lương",
            element: row => row.MaLuong
        },
        {
            name: "Tên nhân viên",
            element: row => row.user.name
        },
        {
            name: "Chức vụ",
            element: row => row.position.namePosition
        },
        {
            name: "Lương tháng (VND)",
            element: row => row.LuongThang
        },
        {
            name: "Ngày công",
            element: row => row.NgayCong
        },
        {
            name: "Thực lãnh (VND)",
            element: row =><div style={{ color: 'blue' }}>{row.ThucLanh}</div>
        },
        {
            name: "Ngày chấm",
            element: row => formatDateTime(row.NgayTinhLuong)
        },
        {
            name: "Xem",
            element: row => (
                <>
                    <Link to={`/api/salary/detail`} className='btn btn-sm btn-info me-1'><i class="fa-solid fa-eye"></i></Link>
                </>
            )
        },
        {
            name: "Sửa",
            element: row => (
                <>
                    <Link to={`/api/salary/edit/${row.id}`} className='btn btn-sm btn-warning me-1'  ><i className="fa fa-pencil" ></i></Link>
                </>
            )
        },
        {
            name: "Xóa",
            element: row => (
                <>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i></button>
                </>
            )
        }
    ]

    const handleDelete = (id) => {
        console.log('Single delete with id=>', id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const requestDeleteApi = () => {

        requestApi(`/api/salary/${deleteItem}`, 'DELETE', []).then(respone => {
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
        dispatch(actions.controlLoading(true))
        let query = `?item_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/salary${query}`, 'GET', []).then(response => {
            console.log('res=>', response)
            setSalary(response.data.data)
            setNumofPage(response.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    const getSalaryExport = (_event, done) => {
        let result = []
        if (SalaryList && SalaryList.length > 0) {
            result.push(['id', 'MaLuong', 'LuongThang', 'NgayCong', 'ThucLanh', 'NgayCham']);
            SalaryList.map(item => {
                let arr = [];

                arr[0] = item.id
                arr[1] = item.MaLuong
                arr[2] = item.LuongThang
                arr[3] = item.NgayCong
                arr[4] = item.ThucLanh
                arr[5] = item.NgayCham

                result.push(arr)
            })
            setDataExport(result);
            done();
        }

    }
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'> Tính lương nhân viên </h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link> </li>
                        <li className='breadcrumb-item'>Quản lý lương</li>
                        <li className='breadcrumb-item active'>Bảng lương</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-primary me-2' to='/api/salary/add'><i className='fa fa-plus'></i> Tính lương</Link>
                        <CSVLink
                            filename={'salary.csv'}
                            className='btn btn-sm btn-success me-1'
                            data={salary}
                            target='_blank'
                            asyncOnClick={true}
                            onClick={(event, done) => getSalaryExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Xuất Excel</CSVLink>
                    </div>
                    <Table
                        name="Bảng lương"
                        data={salary}
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

export default SalaryList