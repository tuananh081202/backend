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

const SalaryUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [salaryData, setSalaryData] = useState([])
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm()
    const params = useParams()
    const [user, setUser] = useState([])
    const [position, setPosition] = useState([])
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)
        dispatch(actions.controlLoading(true))
        try {
            
            const res = await requestApi(`/api/salary/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật bảng lương thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/salary'), 3000)
        } catch (error) {
            console.log('error', error)
            dispatch(actions.controlLoading(false))

        }
    }
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {

                const detailSalary = await requestApi(`/api/salary/${params.id}`, 'GET');
                console.log("detailSalary=>", detailSalary)
                const fields = ['MaLuong', 'LuongThang', 'NgayCong', 'NgayTinhLuong'];
                fields.forEach(field => {

                    setValue(field, detailSalary.data[field])
                })
                setSalaryData({ ...detailSalary.data })
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
                    <h3 className='mt-4'>Cập nhật lương</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        <li className='breadcrumb-item'>Bảng lương</li>
                        <li className='breadcrumb-item active'>Cập nhật lương</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Cập nhật lương
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='row '>
                                        <div className='col-md-12'>
                                            <div className='mb-3 mt-3'>
                                                <label className=' form-label'><strong>Mã lương:</strong></label>
                                                <input  {...register('MaLuong', { required: 'Mã lương là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập mã lương' />
                                                {errors.MaLuong && <p style={{ color: 'red' }}>{errors.MaLuong.message}</p>}
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

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Số ngày công:</label></strong>
                                                <input  {...register('NgayCong', { required: 'Lương tháng là bắt buộc' })} type='text' className='form-control' placeholder='Nhập số ngày công' />
                                                {errors.NgayCong && <p style={{ color: 'red' }}>{errors.NgayCong.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Phụ Cấp:</label></strong>
                                                <input  {...register('PhuCap')} type='text' className='form-control' placeholder='Nhập phụ cấp' />
                                                {errors.PhuCap && <p style={{ color: 'red' }}>{errors.PhuCap.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Lương Tháng:</label></strong>
                                                <input  {...register('LuongThang')} type='text' className='form-control' placeholder='Nhập lương tháng' />
                                                {errors.LuongThang && <p style={{ color: 'red' }}>{errors.LuongThang.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Tạm ứng:</label></strong>
                                                <input  {...register('TamUng')} type='text' className='form-control' placeholder='Nhập tạm ứng' />
                                                {errors.TamUng && <p style={{ color: 'red' }}>{errors.TamUng.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Ngày tính lương:</label></strong>
                                                <input  {...register('NgayTinhLuong')} type='date' className='form-control' placeholder='Nhập ngày tính lương' />
                                                {errors.NgayTinhLuong && <p style={{ color: 'red' }}>{errors.NgayTinhLuong.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Thực lãnh:</label></strong>
                                                <input  {...register('ThucLanh')} type='text' className='form-control' placeholder='Nhập thực lãnh' />
                                                {errors.ThucLanh && <p style={{ color: 'red' }}>{errors.ThucLanh.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'>Mô tả:</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    onReady={editor => {
                                                        // You can store the "editor" and use when it is needed.
                                                        register('MoTa')
                                                    }}

                                                    onChange={(event, editor) => {
                                                        const data = editor.getData()
                                                        console.log('data=>', data)
                                                        setValue('MoTa', data)
                                                        trigger('MoTa')
                                                    }}
                                                    config={{
                                                        extraPlugins: [uploadPlugin]
                                                    }}

                                                />

                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Người tạo:</label></strong>
                                                <input  {...register('NguoiTao')} type='text' className='form-control' placeholder='Nhập người tạo' />
                                                {errors.NguoiTao && <p style={{ color: 'red' }}>{errors.NguoiTao.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Ngày tạo:</label></strong>
                                                <input  {...register('created_at')} type='date' className='form-control' placeholder='Nhập ngày tạo' />
                                                {errors.created_at && <p style={{ color: 'red' }}>{errors.created_at.message}</p>}
                                            </div>


                                        </div>


                                    </div>
                                    <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-info'><i class="fa-solid fa-money-bill"></i> Cập nhật lương nhân viên</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SalaryUpdate