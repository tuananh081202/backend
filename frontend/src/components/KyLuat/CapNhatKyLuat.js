import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import requestApi from '../../helpers/Api'
import { toast } from 'react-toastify'
import * as actions from '../../redux/actions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter';

const CapNhatKyLuat = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [kyluatData, setKyluatData] = useState([])
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm()
    const params = useParams()
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/api/kyluat/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật kỷ luật thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/kyluat'), 3000)
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

                const ChiTietKyLuat = await requestApi(`/api/kyluat/${params.id}`, 'GET');
                console.log("Chi tiết kỷ luật=>", ChiTietKyLuat)
                const fields = ['MaKyLuat', 'TenKyLuat', 'NgayQuyetDinh', 'HinhThuc', 'SoTien', 'NguoiTao', 'NgayKyLuat'];
                fields.forEach(field => {

                    setValue(field, ChiTietKyLuat.data[field])
                })
                setKyluatData({ ...ChiTietKyLuat.data })
                dispatch(actions.controlLoading(false))

            }
            renderData();
        } catch (err) {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        }
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
                    <h3 className='mt-4'>Kỷ luật</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'> Tổng quan </Link></li>
                        <li className='breadcrumb-item'>Khen thưởng - Kỷ luật</li>
                        <li className='breadcrumb-item active'>Cập nhật kỷ luật</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Cập nhật kỷ luật
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                            <form>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'>Mã kỷ luật:</label></strong>
                                                <input {...register('MaKyLuat', { required: 'Mã kỷ luật là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã kỷ luật' />
                                                {errors.MaKyLuat && <p style={{ color: 'red' }}>{errors.MaKyLuat.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Tên kỷ luật: </label></strong>
                                                <input {...register('TenKyLuat', { required: 'Tên kỷ luật là bắt buộc' })} type='text' className='form-control' placeholder='Nhập tên kỷ luật' />
                                                {errors.TenKyLuat && <p style={{ color: 'red' }}>{errors.TenKyLuat.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='required'>Chọn nhân viên:</label></strong>
                                                <select {...register('user')} className='form-select' placeholder='Chọn nhân viên'>
                                                    <option value=''>--Chọn nhân viên--</option>
                                                    {user.map(user => {
                                                        return <option key={user.id} value={user.id}>{user.name}</option>
                                                    })}
                                                </select>
                                                {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Ngày quyết định:</label></strong>
                                                <input {...register('NgayQuyetDinh', { required: 'Ngày quyết định là bắt buộc' })} type='date' className='form-control' placeholder='Nhập ngày quyết định' />
                                                {errors.NgayQuyetDinh && <p style={{ color: 'red' }}>{errors.NgayQuyetDinh.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Tên loại:</label></strong>
                                                <input {...register('TenLoai', { required: 'Tên loại là bắt buộc' })} type='text' className='form-control' placeholder='Nhập tên loại' />
                                                {errors.TenLoai && <p style={{ color: 'red' }}>{errors.TenLoai.message}</p>}
                                            </div>
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Hình thức:</label></strong>
                                                <input {...register('HinhThuc', { required: 'Hình thức là bắt buộc' })} type='text' className='form-control' placeholder='Nhập hình thức' />
                                                {errors.HinhThuc && <p style={{ color: 'red' }}>{errors.HinhThuc.message}</p>}
                                            </div>

                                        </div>
                                        <div className='col-md-6'>
                                            {/* <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Hình thức:</label></strong>
                                                <input {...register('HinhThuc', { required: 'Hình thức là bắt buộc' })} type='text' className='form-control' placeholder='Nhập hình thức' />
                                                {errors.HinhThuc && <p style={{ color: 'red' }}>{errors.HinhThuc.message}</p>}
                                            </div> */}
                                            <div className='mt-3 mb-3'>
                                                <strong><label className='form-label'> Số tiền:</label></strong>
                                                <input {...register('SoTien', { required: 'Số tiền là bắt buộc' })} type='text' className='form-control' placeholder='Nhập số tiền ' />
                                                {errors.SoTien && <p style={{ color: 'red' }} >{errors.SoTien.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Mô tả:</label></strong>
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
                                                <input {...register('NguoiTao')} type='text' className='form-control' placeholder='Nhập người tạo' />
                                                {errors.NguoiTao && <p style={{ color: 'red' }}>{errors.NguoiTao.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Ngày kỷ luật :</label></strong>
                                                <input {...register('NgayKyLuat')} type='date' className='form-control' placeholder='Nhập ngày kỷ luật' />
                                                {errors.NgayKyLuat && <p style={{ color: 'red' }}>{errors.NgayKyLuat.message}</p>}
                                            </div>

                                        </div>
                                    </div>
                                    <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'>Cập nhật kỷ luật</button>



                                </form>

                            </div>
                        </div>
                    </div>



                </div>
            </main>


        </div>
    )
}

export default CapNhatKyLuat