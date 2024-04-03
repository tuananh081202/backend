import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify';
import * as actions from '../../redux/actions'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter';

const TripUpdate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tripData, setTripData] = useState([])
  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm()
  const params = useParams()
  const [user, setUser] = useState([])
  const [position, setPosition] = useState([])
  const handleSubmitFormUpdate = async (data) => {
    console.log('data form=>', data)
    dispatch(actions.controlLoading(true))
    try {

      const res = await requestApi(`/api/trip/${params.id}`, 'PUT', data, 'json')
      console.log('res=>', res)
      dispatch(actions.controlLoading(false))
      toast.success('Cập nhật công tác thành công!!!', { position: 'top-center', autoClose: 2000 })
      setTimeout(() => navigate('/api/trip'), 3000)
    } catch (error) {
      console.log('error', error)
      dispatch(actions.controlLoading(false))

    }
  }
  useEffect(() => {
    dispatch(actions.controlLoading(true))
    try {
      const renderData = async () => {

        const detailTrip = await requestApi(`/api/trip/${params.id}`, 'GET');
        console.log("detailTrip=>", detailTrip)
        const fields = ['MaCongTac', 'NgayBatDau', 'NgayKetThuc', 'DiaDiem', 'MucDich'];
        fields.forEach(field => {

          setValue(field, detailTrip.data[field])
        })
        setTripData({ ...detailTrip.data })
        dispatch(actions.controlLoading(false))

      }
      renderData();
    } catch (err) {
      console.log('err=>', err)
      dispatch(actions.controlLoading(false))
    }
  }, [])

  useEffect(() => {
    dispatch(actions.controlLoading(true))
    requestApi('/api/user', 'GET').then(res => {
      console.log("res=>", res)
      setUser(res.data.data)
      dispatch(actions.controlLoading(false))
    }).catch(err => {
      console.log('err=>', err)
      dispatch(actions.controlLoading(false))
    })
  }, [])

  useEffect(() => {
    dispatch(actions.controlLoading(true))
    requestApi('/api/position', 'GET').then(res => {
      console.log("res=>", res)
      setPosition(res.data.data)
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
          <h3 className='mt-4'>Cập nhật công tác</h3>
          <ol className='breadcrumb mb-4'>
            <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
            <li className='breadcrumb-item'>Danh sách công tác</li>
            <li className='breadcrumb-item active'>Cập nhật công tác</li>
          </ol>
          <div className='card mb-4'>
            <div className='card-header'>
              <i className='fas fa-plus me-1'></i>
              Cập nhật công tác
            </div>
            <div className='card mb-4'>
              <div className='card-header'>

                <strong>Cập nhật công tác</strong> &nbsp;    <small >Những ô nhập có dấu<strong className='required'></strong> là bắt buộc </small>
              </div>
              <div className='card-body'>
                <div className='row mb-3'>
                  <form>
                    <div className='col-md-12'>
                      <div className='mb-3 mt-3'>
                        <label className=' form-label'><strong>Mã công tác:</strong></label>
                        <input  {...register('MaCongTac', { required: 'Mã công tác là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập mã công tác' />
                        {errors.MaCongTac && <p style={{ color: 'red' }}>{errors.MaCongTac.message}</p>}
                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='form-label'>Nhân viên:</label></strong>
                        <select {...register('user', { required: 'Chọn tên nhân viên' })} className='form-select'>
                          <option value="">--Chọn tên nhân viên--</option>
                          {user.map(user => {
                            return <option key={user.id} value={user.id}>{user.name}</option>
                          })}
                        </select>
                        {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='form-label'>Chức vụ:</label></strong>
                        <select {...register('position', { required: 'Chọn chức vụ' })} className='form-select'>
                          <option value="">--Chọn chức vụ--</option>
                          {position.map(position => {
                            return <option key={position.id} value={position.id}>{position.namePosition}</option>
                          })}
                        </select>
                        {errors.position && <p style={{ color: 'red' }}>{errors.position.message}</p>}
                      </div>



                      <div className='row mb-6'>
                        <div className='col-md-6'>
                          <div className='mb-3 mt-3'>
                            <label className='required'><strong>Ngày bắt đầu:</strong></label>
                            <input {...register('NgayBatDau', { required: 'Ngày bắt đầu là bắt buộc.' })} type='date' className='form-control' placeholder='Nhập ngày bắt đầu' />
                            {errors.NgayBatDau && <p style={{ color: 'red' }}>{errors.NgayBatDau.message}</p>}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3 mt-3'>
                            <label className='required'><strong>Ngày kết thúc:</strong></label>
                            <input {...register('NgayKetThuc', { required: 'Ngày kết thúc là bắt buộc.' })} type='date' className='form-control' placeholder='Nhập ngày kết thúc' />
                            {errors.NgayKetThuc && <p style={{ color: 'red' }}>{errors.NgayKetThuc.message}</p>}
                          </div>
                        </div>
                      </div>

                      <div className='mb-3 mt-3'>
                        <label className=' required'><strong>Địa điểm công tác:</strong></label>
                        <input  {...register('DiaDiem', { required: 'Địa điểm là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập địa điểm công tác' />
                        {errors.DiaDiem && <p style={{ color: 'red' }}>{errors.DiaDiem.message}</p>}
                      </div>

                      <div className='mb-3 mt-3'>
                        <label className='form-label'><strong>Mục đích công tác:</strong></label>
                        <CKEditor
                          editor={ClassicEditor}
                          onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            register('MucDich')
                          }}

                          onChange={(event, editor) => {
                            const data = editor.getData()
                            console.log('data=>', data)
                            setValue('MucDich', data)
                            trigger('MucDich')
                          }}
                          config={{
                            extraPlugins: [uploadPlugin]
                          }}

                        />

                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Trạng thái:</label></strong>
                        <select {...register('TrangThai')} className='form-select'>
                          <option value="">--Chọn trạng thái--</option>
                          <option value='Đang công tác' >Đang công tác</option>
                          <option value='Đã công tác'>Đã công tác</option>
                          <option value='Sắp công tác' >Sắp công tác</option>
                        </select>
                      </div>

                    </div>
                    <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'>Lưu lại</button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TripUpdate