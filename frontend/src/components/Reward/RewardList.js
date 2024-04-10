import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { formatDateTime } from '../../helpers/common'
import Table from '../Table/Table'
import requestApi from '../../helpers/Api'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import DescriptionCell from '../../helpers/DescriptionCell'
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter'



const RewardList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user,setUser] = useState([])
    const [reward, setReward] = useState([])
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
            name: "STT",
            element: row => row.id
        },
        {
            name: "Mã khen thưởng",
            element: row => row.MaKhenThuong
        },
        {
            name:'Tên khen thưởng',
            element: row => row.TenKhenThuong
        },
        {
            name:"Tên nhân viên",
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
            element: row =><div style={{ color: 'blue' }}>{parseFloat(row.SoTien).toLocaleString('vi-VN')}</div>
        },
        {
            name: "Ngày khen thưởng",
            element: row => formatDateTime(row.NgayKhenThuong)
        },
        {
            name:"Sửa",
            element: row => (
                <>
                   <Link to={`/api/reward/edit/${row.id}` } className='btn btn-sm btn-warning me-1' ><i className='fa fa-pencil'></i> Sửa </Link>
                </>
            )
        },
        {
            name:"Xóa",
            element: row => (
                <>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i> Xóa</button>
                </>
            )
        }
    ]

    const handleDelete = (id) => {
        console.log ('single delete with id =>',id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const requestDeleteApi = () =>{
        requestApi(`/api/reward/${deleteItem}`, 'DELETE',[]).then(respone =>{
            setShowModal(false)
            setRefresh(Date.now())
            dispatch(actions.controlLoading(false))
        }).catch(err =>{
            console.log(err)
            setShowModal(false)
            dispatch(actions.controlLoading(false))
        })
    }

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

    const handleSubmitFormAdd = async (data) => {
        console.log('data form => ', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/api/reward/create', 'POST', data);
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm khen thưởng thành công !!!', { position: 'top-center', autoClose: 2000 })
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

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CustomUploadAdapter(loader)
        }
    }



  return (
    <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'>Khen thưởng</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'> Tổng quan </Link></li>
                        <li className='breadcrumb-item'>Khen thưởng-Kỷ luật</li>
                        <li className='breadcrumb-item active'>Khen thưởng</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Tạo khen thưởng
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Mã khen thưởng:</label></strong>
                                            <input  {...register('MaKhenThuong', { required: 'Mã khen thưởng là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã khen thưởng' />
                                            {errors.MaKhenThuong && <p style={{ color: 'red' }}>{errors.MaKhenThuong.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Tên khen thưởng:</label></strong>
                                            <input {...register('TenKhenThuong', { required: 'Tên khen thưởng là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập tên khen thưởng' />
                                            {errors.TenKhenThuong && <p style={{ color: 'red' }}>{errors.TenKhenThuong.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='required'>Chọn nhân viên:</label></strong>
                                            <select {...register('user')} className='form-select' placeholder='Chọn nhân viên'>
                                                <option value=''>--Chọn nhân viên--</option>
                                                {user.map(user => {
                                                    return <option key={user.id} value={user.id}>{user.name}</option>
                                                })}
                                            </select>
                                            {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Ngày quyết định:</label></strong>
                                            <input {...register('NgayQuyetDinh', { required: 'Ngày quyết định là bắt buộc.' })} type='date' className='form-control' placeholder='Nhập ngày quyết định' />
                                            {errors.NgayQuyetDinh && <p style={{ color: 'red' }}>{errors.NgayQuyetDinh.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Hình thức:</label></strong>
                                            <input {...register('HinhThuc')} type='text' className='form-control' placeholder='Nhập hình thức' />
                                            {errors.HinhThuc && <p style={{ color: 'red' }}>{errors.HinhThuc.message}</p>}
                                        </div>
                                    </div>
                                     <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Số tiền:</label></strong>
                                            <input {...register('SoTien')} type='text' className='form-control' placeholder='Nhập số tiền' />
                                            {errors.SoTien && <p style={{ color: 'red' }}>{errors.SoTien.message}</p>}
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Mô tả:</label></strong>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    register('MoTa')
                                                }}

                                                onChange={(event, editor) => {
                                                    const data = editor.getData()
                                                    console.log('data=>', data)
                                                    setValue('MoTa', data)
                                                    trigger('MoTa')
                                                }}
                                                config={{
                                                    extraPlugins: [uploadPlugin]
                                                }}

                                            />

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Người tạo:</label></strong>
                                            <input {...register('NguoiTao')} type='text' className='form-control' placeholder='Nhập người tạo' />
                                            {errors.NguoiTao && <p style={{ color: 'red' }}>{errors.NguoiTao.message}</p>}
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Ngày khen thưởng:</label></strong>
                                            <input {...register('NgayKhenThuong')} type='date' className='form-control' placeholder='Nhập ngày khen thưởng' />
                                            {errors.NgayKhenThuong && <p style={{ color: 'red' }}>{errors.NgayKhenThuong.message}</p>}
                                        </div>

                                    </div>
                                   </div>
                                   <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Tạo khen thưởng</button>

                                </form>

                            </div>
                        </div>
                    </div>

                    <Table
                        name="Danh sách khen thưởng"
                        data={reward}
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

export default RewardList