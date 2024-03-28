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

const EmployeeTypeUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [positionData, setPositionData] = useState([])
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm()
    const params = useParams()
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/api/employeetype/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật loại nhân viên thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/employeetype'), 3000)
        } catch (error) {
            console.log('error', error)
            dispatch(actions.controlLoading(false))

        }
    }
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {

                const detailEmployeeType = await requestApi(`/api/employeetype/${params.id}`, 'GET');
                console.log("detailEmployeeType=>", detailEmployeeType)
                const fields = ['MaLoai', 'LoaiNV', 'description', 'createdBy'];
                fields.forEach(field => {

                    setValue(field, detailEmployeeType.data[field])
                })
                setPositionData({ ...detailEmployeeType.data })
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
                    <h3 className='mt-4'>Loại nhân viên</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        <li className='breadcrumb-item'>Loại nhân viên</li>
                        <li className='breadcrumb-item active'>Cập nhật loại nhân viên</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Cập nhật loại nhân viên
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Mã loại NV</label>
                                            <input {...register('MaLoai', { required: 'Mã loại là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã loại nhân viên' />
                                            {errors.MaLoai && <p style={{ color: 'red' }}>{errors.MaLoai.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Loại NV</label>
                                            <input {...register('LoaiNV', { required: 'Loại nhân viên là bắt buộc' })} type='text' className='form-control' placeholder='Nhập loại nhân viên' />
                                            {errors.LoaiNV && <p style={{ color: 'red' }}>{errors.LoaiNV.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Mô tả:</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    register('description')
                                                }}

                                                onChange={(event, editor) => {
                                                    const data = editor.getData()
                                                    const sanitizedData = data.replace(/<\/?p>/g, '')//dữ liệu được làm sạch cập nhật vào form
                                                    console.log('data=>', sanitizedData)
                                                    setValue('description', sanitizedData)
                                                    trigger('description')
                                                }}
                                                config={{
                                                    extraPlugins: [uploadPlugin],
                                                    autoParagraph: false // Tắt tự động thêm thẻ `<p>`
                                                }}
                                            />

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Người tạo</label>
                                            <input {...register('createdBy', { required: 'Người tạo là bắt buộc' })} type='text' className='form-control' placeholder='Nhập người tạo' />
                                            {errors.createdBy && <p style={{ color: 'red' }}>{errors.createdBy.message}</p>}
                                        </div>

                                        <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'>Lưu lại</button>

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

export default EmployeeTypeUpdate