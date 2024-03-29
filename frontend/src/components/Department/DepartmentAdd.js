import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DescriptionCell from '../../helpers/DescriptionCell'
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Table from '../Table/Table'
import { toast } from 'react-toastify'
import { Button, Modal } from 'react-bootstrap'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api'
import { formatDateTime } from '../../helpers/moment'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const DepartmentAdd = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm();

  const columns = [
    {
      name: 'STT',
      element: row => row.id
    },
    {
      name: "Mã phòng ban",
      element: row => row.maPB
    },
    {
      name: "Tên phòng ban",
      element: row => row.tenPB

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

  const handleSubmitFormAdd = async (data) => {
    console.log('data form => ', data)
    dispatch(actions.controlLoading(true))
    try {
      const res = await requestApi('/api/department/create', 'POST', data);
      console.log('res =>', res)
      dispatch(actions.controlLoading(false))
      toast.success('Thêm phòng ban thành công !!!', { position: 'top-center', autoClose: 2000 })
      setTimeout(() => navigate('/api/department/'), 3000)

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
          <h3 className='mt-4'>Quản lý phòng ban</h3>
          <ol className='breadcrumb mb-4'>
            <li className='breadcrumb-item'><Link>Tổng quan</Link></li>
            <li className='breadcrumb-item'>Quản lý phòng ban</li>
            <li className='breadcrumb-item active'>Phòng ban</li>

          </ol>
          <div className='card mb-4'>
            <div className='card-header'>
              <i className='fas fa-plus me-1'></i>
              Thêm phòng ban
            </div>
            <div className='card-body'>
              <div className='row mb-3'>
                <form>
                  <div className='col-md-6'>
                    <div className='mb-3 mt-3'>
                      <label className='form-label'>Mã phòng ban:</label>
                      <input  {...register('maPB', { required: 'Mã phòng ban là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã phòng ban' />
                      {errors.maPB && <p style={{ color: 'red' }}>{errors.maPB.message}</p>}
                    </div>
                    <div className='mb-3 mt-3'>
                      <label className='form-label'>Tên phòng ban:</label>
                      <input {...register('tenPB', { required: 'Tên phòng ban là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập tên phòng ban' />
                      {errors.tenPB && <p style={{ color: 'red' }}>{errors.tenPB.message}</p>}
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


                    <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Thêm phòng ban</button>

                  </div>
                </form>

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

export default DepartmentAdd