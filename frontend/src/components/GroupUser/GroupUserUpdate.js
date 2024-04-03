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

const GroupUserUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [positionData, setPositionData] = useState([])
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm()
    const params = useParams()
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/api/groupuser/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Chỉnh sửa nhóm thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/groupuser'), 3000)
        } catch (error) {
            console.log('error', error)
            dispatch(actions.controlLoading(false))

        }
    }
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {

                const detailGroupUser = await requestApi(`/api/groupuser/${params.id}`, 'GET');
                console.log("detailGroupUser=>", detailGroupUser)
                const fields = ['MaNhom', 'created_at', 'createdBy'];
                fields.forEach(field => {

                    setValue(field, detailGroupUser.data[field])
                })
                setPositionData({ ...detailGroupUser.data })
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
                    <h3 className='mt-4'>Quản lý nhóm</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        <li className='breadcrumb-item'>Danh sách nhóm</li>
                        <li className='breadcrumb-item active'>Quản lý nhóm</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Chỉnh sửa thông tin nhóm
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Mã nhóm:</label>
                                            <input  {...register('MaNhom', { required: 'Mã nhóm là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã nhóm' />
                                            {errors.MaNhom && <p style={{ color: 'red' }}>{errors.MaNhom.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Tên nhóm:</label>
                                            <input {...register('TenNhom', { required: 'Tên nhóm là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập tên nhóm' />
                                            {errors.TenNhom && <p style={{ color: 'red' }}>{errors.TenNhom.message}</p>}
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
                                            <label className='form-label'>Người tạo:</label>
                                            <input {...register('createdBy')} type='text' className='form-control' placeholder='Nhập người tạo' />
                                            {errors.createdBy && <p style={{ color: 'red' }}>{errors.createdBy.message}</p>}
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Ngày tạo:</label>
                                            <input {...register('created_at')} type='date' className='form-control' placeholder='Nhập ngày tạo' />
                                            {errors.created_at && <p style={{ color: 'red' }}>{errors.created_at.message}</p>}
                                        </div>


                                        <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'><i class="fa-solid fa-floppy-disk"></i> Lưu thông tin </button>

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

export default GroupUserUpdate