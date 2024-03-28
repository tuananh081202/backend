import React, { useState, useEffect } from 'react'
import Table from '../Table/Table'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter';
import { useDispatch } from 'react-redux';
import { formatDateTime } from '../../helpers/moment';
import { Link, useNavigate } from 'react-router-dom';
import requestApi from '../../helpers/Api';
import * as actions from '../../redux/actions';
import { useForm } from 'react-hook-form'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify'
import DescriptionCell from '../../helpers/DescriptionCell';
const EmployeeTypeAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm();

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

    const handleSubmitFormAdd = async (data) => {
        console.log('data form => ', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/api/employeetype/create', 'POST', data);
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm loại nhân viên thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/employeetype'), 3000)

        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CustomUploadAdapter(loader)
        }
    }
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'>Loại nhân viên</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link> </li>
                        <li className='breadcrumb-item'> Quản lý nhân viên </li>
                        <li className='breadcrumb-item'>Loại nhân viên</li>
                        <li className='breadcrumb-item active'>Thêm loại nhân viên</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'> </i>
                            Thêm loại nhân viên

                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Mã loại NV</label>
                                            <input {...register('MaLoai', { required: 'Mã loại là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã loại nhân viên' />
                                            {errors.MaLoai && <p style={{ color: 'red' }}>{errors.MaLoai.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Loại NV</label>
                                            <input {...register('LoaiNV', { required: 'Loại nhân viên là bắt buộc' })} type='text' className='form-control' placeholder='Nhập loại nhân viên' />
                                            {errors.LoaiNV && <p style={{ color: 'red' }}>{errors.LoaiNV.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Mô tả:</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    register('description')
                                                }}

                                                onChange={(event, editor) => {
                                                    const data = editor.getData()
                                                    const sanitizedData = data.replace(/<\/?p>/g, '')//dữ liệu được làm sạch cập nhật vào form
                                                    console.log('data=>', sanitizedData)
                                                    setValue('description', sanitizedData)
                                                    trigger('description')
                                                }}

                                                config={{
                                                    extraPlugins: [uploadPlugin],

                                                    autoParagraph: false // Tắt tự động thêm thẻ `<p>`
                                                }}

                                            />

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Người tạo</label>
                                            <input {...register('createdBy', { required: 'Người tạo là bắt buộc' })} type='text' className='form-control' placeholder='Nhập người tạo' />
                                            {errors.createdBy && <p style={{ color: 'red' }}>{errors.createdBy.message}</p>}
                                        </div>

                                        <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Thêm loại nhân viên</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Table
                        name="Danh sách loại nhân viên"
                        data={employeetype}
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

export default EmployeeTypeAdd