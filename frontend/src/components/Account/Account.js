
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'//chứa các hành động redux
import requestApi from '../../helpers/Api';//xử lý yêu cầu api
import { toast } from 'react-toastify'


const Account = () => {
    const dispatch = useDispatch()
    const { register, setValue, trigger, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useState([])
    const params = useParams()
    const [accountData, setAccountData] = useState({})
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)

        let formData = new FormData();
        for (let key in data) {
            if (key === 'avatar') {
                if (data.avatar[0] instanceof File)
                    formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/api/account/${params.id}`, 'PUT', formData, 'json', 'multipart/form-data');
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật tài khoản thành công !!!', { position: 'top-center', autoClose: 2000 })
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
 

    const onAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();//file reader cho phép đọc file bất đồng bộ
            reader.onload = (e) => {
                setAccountData({ ...accountData, avatar: reader.result })
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }


    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h3 className="mt-4">Thông tin tài khoản</h3>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item "><Link to='/'>Tổng quan</Link></li>
                        <li className="breadcrumb-item "><Link to='/api/account'>Tài khoản</Link></li>
                        <li className="breadcrumb-item active">Thông tin tài khoản </li>
                    </ol>

                    <div className='card mb-4'>

                        <div className='card-header'>

                            Thay đổi thông tin

                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'></label></strong>
                                                {accountData.avatar && <img style={{ width: '300px' }} src={accountData.avatar} className='mb-2' alt='...' />}
                                                <input type='file' name='avatar' {...register('avatar', { onChange: onAvatarChange })} className='form-control' accept='avatar/*' />
                                                {errors.avatar && <p style={{ color: 'red' }}>{errors.avatar.message}</p>}
                                            </div>

                                        </div>
                                        <div className='col-md-6'>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Mã nhân viên:</label></strong>
                                                <select {...register('user')} className='form-select' placeholder='Chọn nhân viên'>
                                                    <option value=''>--Chọn mã nhân viên--</option>
                                                    {user.map(user => {
                                                        return <option key={user.id} value={user.id}>{user.maNV}</option>
                                                    })}
                                                </select>
                                                {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Họ tên:</label></strong>
                                                <input {...register('fullName', { required: 'Họ tên là bắt buộc' })} type='text' className='form-control' placeholder='Nhập họ tên' />
                                                {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Email:</label></strong>
                                                <input {...register('email', { required: 'Email là bắt buộc' })} type='email' className='form-control' placeholder='Nhập địa chỉ email' />
                                                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Số điện thoại:</label></strong>
                                                <input {...register('phoneNumber')} type='text' className='form-control' placeholder='Nhập số điện thoại' />
                                                {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Quyền hạn:</label></strong>
                                                <select {...register('roles')} className='form-select'>
                                                    <option value="">--Chọn quyền hạn--</option>
                                                    <option value='Admin'>Admin</option>
                                                    <option value='User'>User</option>
                                                </select>
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Ngày tạo:</label></strong>
                                                <input {...register('created_at', { required: 'Ngày tạo là bắt buộc' })} type='date' className='form-control' placeholder='Nhập ngày tạo' />
                                                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Ngày sửa:</label></strong>
                                                <input {...register('updated_at', { required: 'Ngày sửa là bắt buộc' })} type='date' className='form-control' placeholder='Nhập ngày sửa' />
                                                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Trạng thái:</label></strong>
                                                <select {...register('status')} className='form-select'>
                                                    <option value="">--Chọn trạng thái--</option>
                                                    <option value='Đang hoạt động'>Đang hoạt động</option>
                                                    <option value='Ngừng hoạt động'>Ngừng hoạt động</option>


                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success me-1'>Lưu lại</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Account


