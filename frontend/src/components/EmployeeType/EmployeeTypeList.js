import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../helpers/moment'
import requestApi from '../../helpers/Api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Modal,Button } from 'react-bootstrap'
import Table from '../Table/Table'
import { CSVLink } from 'react-csv'
import DescriptionCell from '../../helpers/DescriptionCell'
const EmployeeTypeList = () => {
    const dispatch = useDispatch()
    const [employeetype, setEmployeeType] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [numOfPage, setNumofPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const [dataExport,setDataExport] = useState('')
    const columns = [
        {
            name: 'STT',
            element: row => row.id
        },
        {
            name: 'Mã loại',
            element: row => row.MaLoai
        },
        {
            name: 'Loại nhân viên',
            element: row => row.LoaiNV
        },
        {
            name: 'Mô tả',
            element: row => <DescriptionCell description={row.description}  />
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
                    <Link to={`/api/employeetype/edit/${row.id}`} className='btn btn-sm btn-warning me-1'  ><i className="fa fa-pencil"  ></i> Sửa </Link>
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
        requestApi(`/api/employeetype/${deleteItem}`, 'DELETE', []).then(respone => {
            setShowModal(false)
            setRefresh(Date.now())
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        })
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/employeetype${query}`, 'GET', []).then(respone => {
            console.log('res=>', respone)
            setEmployeeType(respone.data.data)
            setNumofPage(respone.data.lastPage)
            dispatch(actions.controlLoading(false))

        }).catch(err => {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    const getEmployeeTypeExport = (_event, done) => {
        let result = []
        if (EmployeeTypeList && EmployeeTypeList.length > 0) {
            result.push(['id','MaLoai', 'LoaiNV',  'description','createdBy','created_at','updated_at']);
            EmployeeTypeList.map(item => {
                let arr = [];

                arr[0] = item.id
                arr[1] = item.MaLoai
                arr[2] = item.LoaiNV
                arr[3] = item.description
                arr[4] = item.createdBy
                arr[5] = item.created_at
                arr[6] = item.updated_at
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
                    <h3 className='mt-4'>Loại nhân viên</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        {/* <li className='breadcrumb-item'>Loại nhân </li> */}
                        <li className='breadcrumb-item '>Danh sách loại nhân viên</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to='/api/employeetype/add'><i className='fa fa-plus'></i>Thêm tài khoản</Link>
                        {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger' ><i className='fa fa-trash'></i>Delete</button>}
                 
                        <CSVLink
                            filename={"employeetype.csv"}
                            className="btn btn-sm btn-primary me-1"
                            data={employeetype}
                            target="_blank"
                            asyncOnClick={true}
                            onClick={(event, done) => getEmployeeTypeExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Xuất Excel </CSVLink>
                

                    </div>
                    <Table
                        name='Danh sách loại nhân viên'
                        data={employeetype}
                        columns={columns}
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onChangeItemsPerPage={setItemsPerPage}
                        onKeySearch={(keyword) => {
                            console.log('keyword in user list comp', keyword)
                            setSearchString(keyword)
                        }}
                        onSelectedRows={rows => {
                            console.log('selected row in uselist', rows)
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

export default EmployeeTypeList