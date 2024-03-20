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
      setTimeout(() => navigate('/user'), 3000)
    } catch (error) {
      console.log('error=> ', error)
      dispatch(actions.controlLoading(false))
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
              <i className='fas fa-plus me-1'></i>
              Thêm mới nhân viên
            </div>
            <div className='card-body'>
              <div className='row mb-3'>
                <form>
                  <div className='col-md-6'>
                    <div className='mb-3 mt-3'>


                    </div>
                    <div className='mb-3 mt-3'>

                    </div>

                    <div className='mb-3 mt-3'>


                    </div>

                    <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Submit</button>

                  </div>

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