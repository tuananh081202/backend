import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import requestApi from '../../helpers/Api'
import { toast } from 'react-toastify'
import * as actions from '../../redux/actions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const CapNhatChamCong = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [chamcongData, setChamcongData] = useState([])
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm()
    const params = useParams()
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/api/chamcong/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật chấm công thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/chamcong'), 3000)
        } catch (error) {
            console.log('error', error)
            dispatch(actions.controlLoading(false))

        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi(`/api/user`, 'GET').then(res => {
            console.log('res=>', res)
            setUser(res.data.data)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        })
    }, [])

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {

                const ChiTietChamCong = await requestApi(`/api/chamcong/${params.id}`, 'GET');
                console.log("Chi tiết chấm công=>", ChiTietChamCong)
                const fields = ['HoTen', 'GioVao', 'GioRa'];
                fields.forEach(field => {

                    setValue(field, ChiTietChamCong.data[field])
                })
                setChamcongData({ ...ChiTietChamCong.data })
                dispatch(actions.controlLoading(false))

            }
            renderData();
        } catch (err) {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        }
    }, [])

   
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'>Chấm công</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'> Tổng quan </Link></li>
                        <li className='breadcrumb-item'>Quản lý lương</li>
                        <li className='breadcrumb-item '>Danh sách chấm công</li>
                        <li className='breadcrumb-item active'>Cập nhật chấm công</li>

                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Cập nhật chấm công
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                        
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Mã nhân viên:</label></strong>
                                                <select {...register('user')} className='form-select' placeholder='Chọn nhân viên'>
                                                    <option value=''>--Mã nhân viên--</option>
                                                    {user.map(user => {
                                                        return <option key={user.id} value={user.id}>{user.maNV}</option>
                                                    })}
                                                </select>
                                                {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
                                            </div>

                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Họ tên:</label></strong>
                                                <input {...register('HoTen', { required: 'Họ tên là bắt buộc' })} type='text' className='form-control' placeholder='Nhập họ tên' />
                                                {errors.HoTen && <p style={{ color: 'red' }}>{errors.HoTen.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Giờ đến:</label></strong>
                                                <input {...register('GioVao', { required: 'Giờ vào là bắt buộc' })} type='time' className='form-control' placeholder='Nhập giờ đến' />
                                                {errors.GioVao && <p style={{ color: 'red' }}>{errors.GioVao.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Giờ về:</label></strong>
                                                <input {...register('GioRa', { required: 'Giờ vào là bắt buộc' })} type='time' className='form-control' placeholder='Nhập giờ ra' />
                                                {errors.GioRa && <p style={{ color: 'red' }}>{errors.GioRa.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Ngày tạo:</label></strong>
                                                <input {...register('created_at')} type='date' className='form-control' placeholder='Nhập ngày tạo' />
                                                {errors.created_at && <p style={{ color: 'red' }}>{errors.created_at.message}</p>}
                                            </div>

                                        </div>
                                        
                                       
                                    </div>
                                    <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'>Cập nhật chấm công</button>



                                </form>
                            </div>
                        </div>

                    </div>



                </div>
            </main>


        </div>
    )
}

export default CapNhatChamCong