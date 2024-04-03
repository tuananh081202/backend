import React, { useState, useEffect } from 'react'
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import requestApi from '../../helpers/Api'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import * as actions from '../../redux/actions'

const GroupUserCreate = () => {
    const [user, setUser] = useState([])
    const dispatch = useDispatch()
    const { register, setValue, handleSubmit, trigger, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [image, SetImage] = useState('')
    const handleSubmitFormAdd = async (data) => {
        console.log('data form =>', data)
        let formData = new FormData();
        for (let key in data) {
            if (key === 'image') {
                formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }

        dispatch(actions.controlLoading(true))// gửi hành động đến redux store để điều khiển trạng thái loading 
        try {

            const res = await requestApi(`/api/groupuser/create`, 'POST', formData, 'json', 'multipart/form-data')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))

            toast.success('Tạo nhóm nhân viên thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/groupuser'), 3000)
        } catch (error) {
            console.log('error =>', error)
            dispatch(actions.controlLoading(false))

        }
    }

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

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                SetImage(reader.result)
            };
            reader.readAsDataURL(event.target.files[0]);
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
                    <h3 className='mt-4'> Nhóm nhân viên </h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'> Tổng quan </Link></li>
                        <li className='breadcrumb-item'> Nhóm nhân viên </li>
                        <li className="breadcrumb-item active"> Tạo nhóm </li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <strong>Tạo nhóm mới</strong>
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong>Mã nhóm:</strong></label>
                                                <input {...register('MaNhom', { required: 'Mã nhóm là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã nhóm' />
                                                {errors.MaNhom && <p style={{ color: 'red' }}>{errors.MaCongTac.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <label className='required'><strong>Tên nhóm:</strong></label>
                                                <input {...register('TenNhom', { required: 'Tên nhóm là bắt buộc' })} type='text' className='form-control' placeholder='Nhập tên nhóm' />
                                                {errors.TenNhom && <p style={{ color: 'red' }}>{errors.TenNhom.message}</p>}
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
                                                <strong><label className='required'>Tên nhân viên:</label></strong>
                                                <select {...register('user')} className='form-select' placeholder='Chọn nhân viên'>
                                                    <option value=''>--Tên nhân viên--</option>
                                                    {user.map(user => {
                                                        return <option key={user.id} value={user.id}>{user.name}</option>
                                                    })}
                                                </select>
                                                {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong>Giới tính:</strong></label>
                                                <input {...register('GioiTinh')} type='text' className='form-control' placeholder='Nhập giới tính' />
                                                {errors.GioiTinh && <p style={{ color: 'red' }}>{errors.GioiTinh.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong>Năm sinh:</strong></label>
                                                <input {...register('NamSinh')} type='date' className='form-control' placeholder='Nhập năm sinh' />
                                                {errors.NamSinh && <p style={{ color: 'red' }}>{errors.NamSinh.message}</p>}
                                            </div>

                                            

                                        </div>
                                        <div className='col-md-6'>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Ảnh 3x4(Nếu có):</label></strong>
                                                {image && <img style={{ width: '0px' }} src={image} className='mb-2' alt='...' />}
                                                <input type='file' name='image' {...register('image', { onChange: onImageChange })} className='form-control' accept='image/*' />
                                                {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong>Mô Tả:</strong></label>
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
                                                <label className='form-label'><strong>Người tạo:</strong></label>
                                                <input {...register('createdBy')} type='text' className='form-control' placeholder='Nhập người tạo' />
                                                {errors.createdBy && <p style={{ color: 'red' }}>{errors.createdBy.message}</p>}
                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong>Ngày tạo:</strong></label>
                                                <input {...register('created_at')} type='date' className='form-control' placeholder='Nhập ngày tạo' />
                                                {errors.created_at && <p style={{ color: 'red' }}>{errors.created_at.message}</p>}
                                            </div>


                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Trạng thái:</label></strong>
                                                <select {...register('status')} className='form-select'>
                                                    <option value="">--Chọn trạng thái--</option>
                                                    <option value='Đang làm việc'>Đang làm việc</option>
                                                    <option value='Đã nghỉ việc'>Đã nghỉ việc</option>
                                                </select>
                                            </div>



                                        </div>
                                    </div>
                                    <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Tạo nhóm nhân viên</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default GroupUserCreate