import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const AccountAdd = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState('')
    const handleSubmitFormAdd = async (data) => {
        console.log('data form =>', data)

        let formData = new FormData();
        for (let key in data) {
            if (key === 'avatar') {
                formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/api/account/create', 'POST', formData, 'json', 'multipart/form-data');
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Tạo tài khoản thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/account'), 3000)
        } catch (error) {
            console.log('error', error)
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
            let reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(reader.result)
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }

    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className="container-fluid px-4">
                    <h3 className="mt-4">Tài khoản</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        <li className='breadcrumb-item'>Tài khoản</li>
                        <li className="breadcrumb-item active">Tạo mới tài khoản</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>

                            Tạo tài khoản
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Chọn ảnh:</label></strong>
                                            {avatar && <img style={{ width: '0px' }} src={avatar} className='mb-2' alt='...' />}
                                            <input type='file' name='avatar' {...register('avatar', { onChange: onAvatarChange })} className='form-control' accept='image/*' />
                                            {errors.avatar && <p style={{ color: 'red' }}>{errors.avatar.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='required'>Chọn nhân viên:</label></strong>
                                            <select {...register('user')} className='form-select' placeholder='Chọn nhân viên'>
                                                <option value=''>--Chọn nhân viên--</option>
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
                                            <strong><label className='required'>Mật khẩu:</label></strong>
                                            <input {...register('password', { required: 'Mật khẩu là bắt buộc' })} type='password' className='form-control' placeholder='Nhập mật khẩu' />
                                            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='required'>Nhập lại mật khẩu:</label></strong>
                                            <input {...register('repeatPassword', { required: 'Nhập lại mật khẩu là bắt buộc' })} type='password' className='form-control' placeholder='Nhập lại mật khẩu' />
                                            {errors.repeatPassword && <p style={{ color: 'red' }}>{errors.repeatPassword.message}</p>}
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
                                            <strong><label className='form-label'>Trạng thái:</label></strong>
                                            <select {...register('status')} className='form-select'>
                                                <option value="">--Chọn trạng thái--</option>
                                                <option value='Đang hoạt động'>Đang hoạt động</option>
                                                <option value='Ngừng hoạt động'>Ngừng hoạt động</option>
                                            </select>
                                        </div>


                                    </div>
                                    <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success me-1'>Submit</button>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default AccountAdd