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

const RewardUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [rewardData, setRewardData] = useState([])
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm()
    const params = useParams()
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/api/reward/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật khen thưởng thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/reward'), 3000)
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

                const detailReward = await requestApi(`/api/reward/${params.id}`, 'GET');
                console.log("detailReward=>", detailReward)
                const fields = ['MaKhenThuong', 'TenKhenThuong', 'NgayQuyetDinh', 'HinhThuc', 'SoTien','NguoiTao', 'NgayKhenThuong'];
                fields.forEach(field => {

                    setValue(field, detailReward.data[field])
                })
                setRewardData({ ...detailReward.data })
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
                    <h3 className='mt-4'>Cập nhật khen thưởng</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'> Tổng quan </Link></li>
                        <li className='breadcrumb-item'>Khen thưởng - kỷ luật</li>
                        <li className='breadcrumb-item active'>Cập nhật khen thưởng</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Cập nhật khen thưởng
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Mã khen thưởng:</label></strong>
                                                <input  {...register('MaKhenThuong', { required: 'Mã khen thưởng là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã khen thưởng' />
                                                {errors.MaKhenThuong && <p style={{ color: 'red' }}>{errors.MaKhenThuong.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Tên khen thưởng:</label></strong>
                                                <input {...register('TenKhenThuong', { required: 'Tên khen thưởng là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập tên khen thưởng' />
                                                {errors.TenKhenThuong && <p style={{ color: 'red' }}>{errors.TenKhenThuong.message}</p>}
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
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Ngày quyết định:</label></strong>
                                                <input {...register('NgayQuyetDinh', { required: 'Ngày quyết định là bắt buộc.' })} type='date' className='form-control' placeholder='Nhập ngày quyết định' />
                                                {errors.NgayQuyetDinh && <p style={{ color: 'red' }}>{errors.NgayQuyetDinh.message}</p>}
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Hình thức:</label></strong>
                                                <input {...register('HinhThuc')} type='text' className='form-control' placeholder='Nhập hình thức' />
                                                {errors.HinhThuc && <p style={{ color: 'red' }}>{errors.HinhThuc.message}</p>}
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='mb-3 mt-3'>
                                                <strong><label className='form-label'>Số tiền:</label></strong>
                                                <input {...register('SoTien')} type='text' className='form-control' placeholder='Nhập số tiền' />
                                                {errors.SoTien && <p style={{ color: 'red' }}>{errors.SoTien.message}</p>}
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
                                                <strong><label className='form-label'>Ngày khen thưởng:</label></strong>
                                                <input {...register('NgayKhenThuong')} type='date' className='form-control' placeholder='Nhập ngày khen thưởng' />
                                                {errors.NgayKhenThuong && <p style={{ color: 'red' }}>{errors.NgayKhenThuong.message}</p>}
                                            </div>

                                        </div>
                                    </div>
                                    <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'>Cập nhật khen thưởng</button>

                                </form>


                            </div>
                        </div>
                    </div>



                </div>
            </main>


        </div>
    )
}

export default RewardUpdate