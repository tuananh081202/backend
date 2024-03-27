import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import requestApi from '../../helpers/Api'
import { toast } from 'react-toastify'
import * as actions from '../../redux/actions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter';

const PositionUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [positionData,setPositionData] = useState([])
    const { register, handleSubmit,setValue,trigger, formState: { errors } } = useForm()
    const params = useParams()
    const handleSubmitFormUpdate = async (data) =>{
        console.log('data form=>',data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/api/position/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật chức vụ thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/api/position'), 3000)
        } catch (error) {
            console.log('error', error)
            dispatch(actions.controlLoading(false))

        }
    }
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {

                const detailPosition = await requestApi(`/api/position/${params.id}`, 'GET');
                console.log("detailPosition=>", detailPosition)
                const fields = ['maNV','namePosition','degree', 'salary', 'description','createdBy'];
                fields.forEach(field => {

                    setValue(field, detailPosition.data[field])
                })
                setPositionData({ ...detailPosition.data })
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
            <h3 className='mt-4'>Chức vụ</h3>
            <ol className='breadcrumb mb-4'>
                <li className='breadcrumb-item'><Link to='/'> Tổng quan </Link></li>
                <li className='breadcrumb-item'>Chức vụ</li>
                <li className='breadcrumb-item active'>Cập nhật chức vụ</li>
            </ol>
            <div className='card mb-4'>
                <div className='card-header'>
                    <i className='fas fa-plus me-1'></i>
                    Cập nhật chức vụ
                </div>
                <div className='card-body'>
                    <div className='row mb-3'>
                        <form>
                            <div className='col-md-6'>
                                <div className='mb-3 mt-3'>
                                    <label className='form-label'>Mã chức vụ:</label>
                                    <input  {...register('maCV', { required: 'Mã chức vụ là bắt buộc' })} type='text' className='form-control' placeholder='Nhập mã chức vụ' />
                                    {errors.maCV && <p style={{ color: 'red' }}>{errors.maCV.message}</p>}
                                </div>
                                <div className='mb-3 mt-3'>
                                    <label className='form-label'>Tên chức vụ:</label>
                                    <input {...register('namePosition', { required: 'Tên chức vụ là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập tên chức vụ' />
                                    {errors.namePosition && <p style={{ color: 'red' }}>{errors.namePosition.message}</p>}
                                </div>
                                <div className='mb-3 mt-3'>
                                    <label className='form-label'>Bằng cấp:</label>
                                    <input {...register('degree', { required: 'Bằng cấp là bắt buộc.' })} type='text' className='form-control' placeholder='Nhập bằng cấp' />
                                    {errors.degree && <p style={{ color: 'red' }}>{errors.degree.message}</p>}
                                </div>
                                <div className='mb-3 mt-3'>
                                    <label className='form-label'>Lương ngày:</label>
                                    <input {...register('salary')} type='text' className='form-control' placeholder='Nhập lương /ngày' />
                                    {errors.namePosition && <p style={{ color: 'red' }}>{errors.namePosition.message}</p>}
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


                                <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'> Submit </button>

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

export default PositionUpdate