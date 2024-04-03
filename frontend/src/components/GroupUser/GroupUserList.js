import React, { useEffect, useState } from 'react'
import requestApi from '../../helpers/Api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Modal,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Table from '../Table/Table'
import { formatDateTime } from '../../helpers/common'

const GroupUserList = () => {
    const dispatch = useDispatch([])
    const [groupuser, setGroupUser] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const columns = [
        {
            name:"STT",
            element: row => row.id
        },
        {
            name:"Mã nhân viên",
            element: row => row.user.maNV
        },
        {
            name:'Tên nhóm',
            element: row => row.TenNhom
        },
        {
            name:"Ảnh",
            element: row => <img width="120px"  src={process.env.REACT_APP_API_URL + '/' + row.image} />
        },
        {
            name:"Tên nhân viên",
            element: row => row.user.name
        },
        {
            name:'Giới tính',
            element: row => row.GioiTinh
        },
        {
            name:'Năm sinh',
            element: row => formatDateTime(row.NamSinh)
        },
        {
            name:'Ngày tạo',
            element: row => formatDateTime(row.created_at)
        },
        {
            name:"Trạng thái",
            element: row => row.status
        },
        {
            name: "Sửa",
            element: row => (
                <>
                    <Link to={`/api/groupuser/edit/${row.id}`} className='btn btn-sm btn-warning me-1'><i className="fa fa-pencil" ></i></Link>
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

        requestApi(`/api/groupuser/${deleteItem}`, 'DELETE', []).then(respone => {
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

        requestApi(`/api/groupuser${query}`, 'GET', []).then(response => {
            console.log('res=>', response)
            setGroupUser(response.data.data)
            setNumofPage(response.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'> Quản lý nhóm </h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link> </li>
                        <li className='breadcrumb-item'>Danh sách nhóm</li>
                        <li className='breadcrumb-item active'>Quản lý nhóm</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-primary me-2' to='/api/groupuser/add'><i className='fa fa-plus'></i> Thêm nhân viên</Link>
                        <Link className='btn btn-sm btn-success me-2' to='/api/groupuser/edit/'><i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa nhóm</Link>
                    </div>
                    <Table
                        name="Nhân viên trong nhóm"
                        data={groupuser}
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

export default GroupUserList
