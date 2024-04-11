import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Table from '../Table/Table'
import requestApi from '../../helpers/Api'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { formatDateTime } from '../../helpers/common'

const DanhSachChamCong = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [chamcong, setChamCong] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm();
    const columns = [
        {
            name: 'STT',
            element: row => row.id
        },
        
        {
            name: "Mã nhân viên",
            element: row => row.user.maNV

        },
        {
            name: 'Họ tên',
            element: row => row.HoTen
        },
        {
            name: 'Giờ đến',
            element: row => row.GioVao
        },
        {
            name: 'Giờ về',
            element: row => row.GioRa
        },
        {
            name: 'Ngày ',
            element: row => formatDateTime(row.created_at)
        },
        {
            name: 'Sửa',
            element: row => (
                <>
                    <Link to={`/api/chamcong/edit/${row.id}`} className='btn btn-sm btn-warning me-1' ><i className='fa fa-pencil'></i> Sửa </Link>

                </>
            )
        },
        {
            name: "Xóa",
            element: row => (
                <>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i> Xóa</button>


                </>
            )
        }
    ]

    const handleDelete = (id) => {
        console.log('Single delete with id =>', id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const requestDeleteApi = () => {
        requestApi(`/api/chamcong/${deleteItem}`, 'DELETE', []).then(respone => {
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
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`

        requestApi(`/api/chamcong/${query}`, 'GET', []).then(respone => {
            console.log('res=>', respone)
            setChamCong(respone.data.data)
            setNumofPage(respone.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [itemsPerPage, refresh, currentPage, searchString])

    const handleSubmitFormAdd = async (data) => {
        console.log('data form => ', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/api/chamcong/create', 'POST', data);
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Tạo chấm công thành công !!!', { position: 'top-center', autoClose: 2000 })
            // setTimeout(() => navigate('/api/reward'), 3000)

        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/api/user', 'GET').then(res => {
            console.log('res=>', res)
            setUser(res.data.data)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        })
    }, [])

    

    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'> Chấm công </h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        <li className='breadcrumb-item'> Quản lý lương</li>
                        <li className='breadcrumb-item active'>Danh sách chấm công</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Tạo chấm công
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                        
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Mã nhân viên:</label></strong>
                                                <select {...register('user')} className='form-select' placeholder='Chọn nhân viên'>
                                                    <option value=''>--Mã nhân viên--</option>
                                                    {user.map(user => {
                                                        return <option key={user.id} value={user.id}>{user.maNV}</option>
                                                    })}
                                                </select>
                                                {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
                                            </div>

                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Họ tên:</label></strong>
                                                <input {...register('HoTen', { required: 'Họ tên là bắt buộc' })} type='text' className='form-control' placeholder='Nhập họ tên' />
                                                {errors.HoTen && <p style={{ color: 'red' }}>{errors.HoTen.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Giờ đến:</label></strong>
                                                <input {...register('GioVao', { required: 'Giờ vào là bắt buộc' })} type='time' className='form-control' placeholder='Nhập giờ đến' />
                                                {errors.GioVao && <p style={{ color: 'red' }}>{errors.GioVao.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Giờ về:</label></strong>
                                                <input {...register('GioRa', { required: 'Giờ vào là bắt buộc' })} type='time' className='form-control' placeholder='Nhập giờ ra' />
                                                {errors.GioRa && <p style={{ color: 'red' }}>{errors.GioRa.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Ngày tạo:</label></strong>
                                                <input {...register('created_at')} type='date' className='form-control' placeholder='Nhập ngày tạo' />
                                                {errors.created_at && <p style={{ color: 'red' }}>{errors.created_at.message}</p>}
                                            </div>

                                        </div>
                                        
                                       
                                    </div>
                                    <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Tạo chấm công</button>



                                </form>
                            </div>
                        </div>
                    </div>
                    <Table
                        name="Danh sách chấm công"
                        data={chamcong}
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

export default DanhSachChamCong



