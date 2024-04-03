import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Table from '../Table/Table'
import { toast } from 'react-toastify'
import { Button, Modal } from 'react-bootstrap'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api'
import { formatDateTime } from '../../helpers/common'


const GroupAdd = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [image,SetImage] = useState('')
    const [groupuser, setGroupUser] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [numOfPage, setNumofPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm();

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
            name: "Hành động",
            element: row => (
                <>
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
        dispatch(actions.controlLoading(true));
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/groupuser${query}`, 'GET', []).then(response => {
            console.log("res=>", response)
            setGroupUser(response.data.data);
            setNumofPage(response.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false));
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    const handleSubmitFormAdd = async (data) => {
        console.log('data form =>', data)
        let formData = new FormData();
        for (let key in data) {
            if (key === 'image') {
                formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/api/groupuser/create', 'POST', data);
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm nhân viên vào nhóm thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/groupuser/'), 3000)

        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                SetImage(reader.result)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }


   
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'>Quản lý nhóm</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link>Tổng quan</Link></li>
                        <li className='breadcrumb-item'>Danh sách nhóm</li>
                        <li className='breadcrumb-item active'>Quản lý nhóm</li>

                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Thêm nhân viên vào nhóm
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                            <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Mã nhóm:</label>
                                            <input  {...register('MaNhom', { required: 'Mã nhóm là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã nhóm' />
                                            {errors.MaNhom && <p style={{ color: 'red' }}>{errors.MaNhom.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Tên nhóm:</label>
                                            <input {...register('TenNhom', { required: 'Tên nhóm là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập tên nhóm' />
                                            {errors.TenNhom && <p style={{ color: 'red' }}>{errors.TenNhom.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                                <label className='form-label'>Ảnh 3x4(Nếu có):</label>
                                                {image && <img style={{ width: '0px' }} src={image} className='mb-2' alt='...' />}
                                                <input type='file' name='image' {...register('image', { onChange: onImageChange })} className='form-control' accept='image/*' />
                                                {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Người tạo:</label>
                                            <input {...register('createdBy')} type='text' className='form-control' placeholder='Nhập người tạo' />
                                            {errors.createdBy && <p style={{ color: 'red' }}>{errors.createdBy.message}</p>}
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Ngày tạo:</label>
                                            <input {...register('created_at')} type='date' className='form-control' placeholder='Nhập ngày tạo' />
                                            {errors.created_at && <p style={{ color: 'red' }}>{errors.created_at.message}</p>}
                                        </div>


                                        <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'><i class="fa-solid fa-floppy-disk"></i> Lưu thông tin </button>

                                    </div>
                                </form>

                            </div>
                        </div>
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

export default GroupAdd