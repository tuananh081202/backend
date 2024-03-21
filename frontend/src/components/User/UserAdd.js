import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'

const UserAdd = () => {
  const dispatch = useDispatch()
  const { register, setValue, trigger, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [image, SetImage] = useState('')
  const [employeetype, SetEmployeeType] = useState([])
  const [position, SetPosition] = useState([])
  const handleSubmitFormAdd = async (data) => {
    console.log('data form=>', data)

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
      const res = await requestApi('/api/user/create', 'POST', formData, 'json', 'multipart/form-data');
      console.log('res=>', res)
      dispatch(actions.controlLoading(false))
      toast.success('Thêm nhân viên thành công !!!', { position: 'top-center', autoClose: 2000 })
      setTimeout(() => navigate('/api/user'), 3000)
    } catch (error) {
      console.log('error=> ', error)
      dispatch(actions.controlLoading(false))
    }
  }

  useEffect(() => {
    dispatch(actions.controlLoading(true))
    requestApi('/api/employeetype', 'GET').then(res => {
      console.log("res=>", res)
      SetEmployeeType(res.data.data)
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
      SetPosition(res.data.data)
      dispatch(actions.controlLoading(false))
    }).catch(err => {
      console.log('err=>', err)
      dispatch(actions.controlLoading(false))
    })
  }, [])

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
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h3 className="mt-4">Thêm mới nhân viên</h3>
          <ol className="breadcrumb mb-4">
            <li className='breadcrumb-item'><Link to='/'><small>Tổng quan</small></Link></li>
            <li className='breadcrumb-item'><small>Nhân viên</small></li>
            <li className="breadcrumb-item active"><small>Danh sách nhân viên</small></li>
          </ol>
          <div className='card mb-4'>
            <div className='card-header'>

              Thêm mới nhân viên &nbsp;    <small >Những ô nhập có dấu<strong className='required'></strong> là bắt buộc </small>
            </div>
            <div className='card-body'>
              <div className='row mb-3'>
                <form>
                  <div className='row '>
                    <div className='col-md-6'>
                      <div className='mb-3 mt-3'>
                        <label className=' form-label'><strong>Mã nhân viên:</strong></label>
                        <input  {...register('maNV', { required: 'Mã nhân viên là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập mã nhân viên' />
                        {errors.maNV && <p style={{ color: 'red' }}>{errors.maNV.message}</p>}
                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Tên nhân viên:</label></strong>
                        <input  {...register('name', { required: 'Tên nhân viên là bắt buộc' })} type='text' className='form-control' placeholder='Nhập tên nhân viên' />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Số CMND:</label></strong>
                        <input {...register('CMND', { required: 'Số CMND là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập CMND' />
                        {errors.CMND && <p style={{ color: 'red' }}>{errors.CMND.message}</p>}
                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Ngày cấp:</label></strong>
                        <input {...register('date_range', { required: 'Ngày cấp là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập ngày cấp' />
                        {errors.date_range && <p style={{ color: 'red' }}>{errors.date_range.message}</p>}
                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Nơi cấp:</label></strong>
                        <input {...register('issued_by', { required: 'Nơi cấp là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập nơi cấp' />
                        {errors.issued_by && <p style={{ color: 'red' }}>{errors.issued_by.message}</p>}
                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Quốc tịch:</label></strong>
                        <input {...register('nationality', { required: 'Quốc tịch là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập quốc tịch' />
                        {errors.nationality && <p style={{ color: 'red' }}>{errors.nationality.message}</p>}
                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='form-label'>Tôn giáo:</label></strong>
                        <select {...register('religion')} className='form-select'>
                          <option value='Không'>Không</option>
                          <option value='Có'>Có</option>
                        </select>
                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Dân tộc:</label></strong>
                        <select {...register('nation')} className='form-select'>
                          <option value="">--Chọn dân tộc--</option>
                          <option value='Kinh'>Kinh</option>
                          <option value='Khác'>Khác</option>
                        </select>
                        {errors.nation && <p style={{ color: 'red' }}>{errors.nation.message}</p>}

                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Loại nhân viên:</label></strong>
                        <select {...register('employeetype', { required: 'Chọn loại nhân viên' })} className='form-select'>
                          <option value="">--Chọn loại nhân viên--</option>
                          {employeetype.map(employeetype => {
                            return <option key={employeetype.id} value={employeetype.id}>{employeetype.LoaiNV}</option>
                          })}
                        </select>
                        {errors.employeetype && <p style={{ color: 'red' }}>{errors.employeetype.message}</p>}
                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Trạng thái:</label></strong>
                        <select {...register('status')} className='form-select'>
                          <option value="">--Chọn trạng thái--</option>
                          <option value='Đang hoạt động'>Đang làm việc</option>
                          <option value='Không hoạt động'>Đã nghỉ việc</option>
                        </select>
                      </div>
                      
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3 mt-3'>
                        <strong><label className='form-label'>Ảnh 3x4(Nếu có):</label></strong>
                        {image && <img style={{ width: '300px' }} src={image} className='mb-2' alt='...' />}
                        <input type='file' name='image' {...register('image', { onChange: onImageChange })} className='form-control' accept='image/*' />
                        {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Giới tính:</label></strong>
                        <select {...register('gender', { required: 'Giới tính là bắt buộc.' })} className='form-select' placeholder='Chọn giới tính'>
                          <option value="">--Chọn giới tính--</option>
                          <option value='Nam'>Nam</option>
                          <option value='Nữ'>Nữ</option>
                        </select>
                        {errors.gender && <p style={{ color: 'red' }}>{errors.gender.message}</p>}

                      </div>
                      <div className='mb-3 mt-3'>
                        <strong><label className='form-label'>Ngày sinh:</label></strong>
                        <input {...register('date_of_birth', { required: 'Ngày sinh là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập ngày sinh' />
                        {errors.date_of_birth && <p style={{ color: 'red' }}>{errors.date_of_birth.message}</p>}
                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='form-label'>Nơi sinh:</label></strong>
                        <input {...register('birthplace', { required: 'Nơi sinh là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập nơi sinh' />
                        {errors.birthplace && <p style={{ color: 'red' }}>{errors.birthplace.message}</p>}
                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Hộ khẩu:</label></strong>
                        <input {...register('household', { required: 'Hộ khẩu là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập hộ khẩu' />
                        {errors.household && <p style={{ color: 'red' }}>{errors.household.message}</p>}
                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='form-label'>Tạm trú:</label></strong>
                        <input {...register('shelter')} type='text' className='form-control' placeholder='Nhập hộ khẩu' />
                        
                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='required'>Chức vụ:</label></strong>
                        <select {...register('position', )} className='form-select' placeholder='Chọn chức vụ'>
                          <option value="">--Chọn chức vụ--</option>
                          {position.map(position => {
                            return <option key={position.id} value={position.id}>{position.namePosition}</option>
                          })}
                        </select>
                      </div>

                      <div className='mb-3 mt-3'>
                        <strong><label className='form-label'>Bằng cấp:</label></strong>
                        <select {...register('position', )} className='form-select'>
                          <option value="">--Chọn bằng cấp--</option>
                          {position.map(position => {
                            return <option key={position.id} value={position.id}>{position.degree}</option>
                          })}
                        </select>
                      </div>


                      
                    </div>


                  </div>
                  <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Submit</button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserAdd