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

const DepartmentUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [positionData, setPositionData] = useState([])
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm()
    const params = useParams()
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/api/department/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật phòng ban thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/department'), 3000)
        } catch (error) {
            console.log('error', error)
            dispatch(actions.controlLoading(false))

        }
    }
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {

                const detailDepartment = await requestApi(`/api/department/${params.id}`, 'GET');
                console.log("detailDepartment=>", detailDepartment)
                const fields = ['maPB', 'tenPB', 'description', 'createdBy'];
                fields.forEach(field => {

                    setValue(field, detailDepartment.data[field])
                })
                setPositionData({ ...detailDepartment.data })
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
                    <h3 className='mt-4'>Phòng ban</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        <li className='breadcrumb-item'>Phòng ban</li>
                        <li className='breadcrumb-item active'>Cập nhật phòng ban</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Cập nhật phòng ban
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Mã phòng ban:</label>
                                            <input  {...register('maPB', { required: 'Mã phòng ban là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã phòng ban' />
                                            {errors.maPB && <p style={{ color: 'red' }}>{errors.maPB.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Tên phòng ban:</label>
                                            <input {...register('tenPB', { required: 'Tên phòng ban là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập tên phòng ban' />
                                            {errors.tenPB && <p style={{ color: 'red' }}>{errors.tenPB.message}</p>}
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
                                                    console.log('data=>', data)
                                                    setValue('description', data)
                                                    trigger('description')
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


                                        <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'>Cập nhật phòng ban</button>

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

export default DepartmentUpdate