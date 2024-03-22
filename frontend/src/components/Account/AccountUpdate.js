
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'//chứa các hành động redux
import requestApi from '../../helpers/Api';//xử lý yêu cầu api
import { toast } from 'react-toastify'


const AccountUpdate = () => {
    const dispatch = useDispatch()
    const { register, setValue,trigger,  handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
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
            setTimeout(() => navigate('/api/account'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }

    //Lấy dữ liệu danh mục  và lấy dữ liệu sản phẩm theo id
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {
                const res = await requestApi('/api/user', 'GET');
                setUser(res.data.data);
                const detailAccount = await requestApi(`/api/account/${params.id}`, 'GET');
                console.log("detailAccount=>", detailAccount)
                const fields = ['avatar', 'fullName', 'email', 'phoneNumber','roles', 'status'];
                fields.forEach(field => {

                    setValue(field, detailAccount.data[field])// đặt giá cho mỗi trường = setvalue
                })
                setAccountData({ ...detailAccount.data, avatar: process.env.REACT_APP_API_URL + '/' + detailAccount.data.avatar })
                dispatch(actions.controlLoading(false))

            }
            renderData();
        } catch (err) {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        }
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
                    <h3 className="mt-4">Cập nhật tài khoản</h3>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item "><Link to='/'>Tổng quan</Link></li>
                        <li className="breadcrumb-item "><Link to='/api/account'>Tài khoản</Link></li>
                        <li className="breadcrumb-item active">Cập nhật tài khoản mới</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Cập nhật
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                            <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <strong><label className='form-label'>Chọn ảnh:</label></strong>
                                            {accountData.avatar && <img style={{ width: '0px' }} src={accountData.avatar} className='mb-2' alt='...' />}
                                            <input type='file' name='avatar' {...register('avatar', { onChange: onAvatarChange })} className='form-control' accept='avatar/*' />
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
                                    <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success me-1'>Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AccountUpdate


