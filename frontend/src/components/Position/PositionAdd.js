import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { formatDateTime } from '../../helpers/moment'
import Table from '../Table/Table'
import requestApi from '../../helpers/Api'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DescriptionCell from '../../helpers/DescriptionCell'
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter'
const PositionAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [position, setPosition] = useState([])
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
            name: "Mã chức vụ",
            element: row => row.maCV
        },
        {
            name: "Tên vị trí",
            element: row => row.namePosition
        },
        {
            name: "Bằng cấp",
            element: row => row.degree
        },
        {
            name: "Lương ngày (VND)",
            element: row =><div style={{color: 'red'}}>{parseFloat(row.salary).toLocaleString('vi-VN')}</div>

        },
        {
            name: "Mô tả",
            element: row => <DescriptionCell description={row.description} />
        },
        {
            name: "Người tạo",
            element: row => row.createdBy
        },
        {
            name: "Ngày tạo",
            element: row => formatDateTime(row.created_at)
        },
        {
            name: "Ngày sửa",
            element: row => formatDateTime(row.updated_at)
        },
        {
            name: "Hành động",
            element: row => (
                <>
                    <Link to={`/api/position/edit/${row.id}`} className='btn btn-sm btn-warning me-1'  ><i className="fa fa-pencil"  ></i> Sửa </Link>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i> Xóa</button>
                </>
            )
        }
    ]

    const handleDelete = (id) => {
        console.log('Single delete witd id=>', id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const requestDeleteApi = () => {
        requestApi(`/api/position/${deleteItem}`, 'DELETE', []).then(respone => {
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

        requestApi(`/api/position${query}`, 'GET', []).then(response => {
            console.log("res=>", response)
            setPosition(response.data.data);
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
            const res = await requestApi('/api/position/create', 'POST', data);
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm chức vụ thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/position'), 3000)

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
                    <h3 className='mt-4'>Chức vụ</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'> Tổng quan </Link></li>
                        <li className='breadcrumb-item'>Quản lý nhân viên</li>
                        <li className='breadcrumb-item active'>Chức vụ</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Thêm chức vụ
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Mã chức vụ:</label>
                                            <input  {...register('maCV', { required: 'Mã chức vụ là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã chức vụ' />
                                            {errors.maCV && <p style={{ color: 'red' }}>{errors.maCV.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Tên chức vụ:</label>
                                            <input {...register('namePosition', { required: 'Tên chức vụ là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập tên chức vụ' />
                                            {errors.namePosition && <p style={{ color: 'red' }}>{errors.namePosition.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Bằng cấp:</label>
                                            <input {...register('degree', { required: 'Bằng cấp là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập bằng cấp' />
                                            {errors.degree && <p style={{ color: 'red' }}>{errors.degree.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Lương ngày (VND):</label>
                                            <input {...register('salary')} type='text' className='form-control' placeholder='Nhập lương /ngày' />
                                            {errors.namePosition && <p style={{ color: 'red' }}>{errors.namePosition.message}</p>}
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
                                                    console.log('data=>', data)
                                                    setValue('description', data)
                                                    trigger('description')
                                                }}
                                                config={{
                                                    extraPlugins: [uploadPlugin]
                                                }}

                                            />

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Người tạo:</label>
                                            <input {...register('createdBy')} type='text' className='form-control' placeholder='Nhập người tạo' />
                                            {errors.createdBy && <p style={{ color: 'red' }}>{errors.createdBy.message}</p>}
                                        </div>


                                        <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Thêm chức vụ</button>

                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                    <Table
                        name="Danh sách chức vụ"
                        data={position}
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

export default PositionAdd