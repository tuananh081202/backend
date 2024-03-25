import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
const Personal = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState([])
    const [image, SetImage] = useState('')
    const { register, setValue, trigger, formState: { errors } } = useForm();
    const { id } = useParams()
    const [position, SetPosition] = useState([])
    const [employeetype, SetEmployeeType] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/' + id)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/api/employeetype', 'GET').then(res => {
            console.log("res=>", res)
            SetEmployeeType(res.data.data)
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
            SetPosition(res.data.data)
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



    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'>Thông tin nhân viên</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className="breadcrumb-item"><Link to='/'>Tổng quan</Link></li>
                        <li className="breadcrumb-item">Tài khoản</li>
                        <li className="breadcrumb-item active">Thông tin nhân viên</li>
                    </ol>
                    <div className='card mb-4'>

                        <div className='card-body'>
                            <div className='row mb-8'>
                                <form>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <div className='mb-3 mt-3'>

                                                <label className='form-label'><strong> Ảnh:</strong></label>
                                                {image && <img style={{ width: '300px' }} src={image} className='mb-2' alt='...' />}
                                                <input type='file' name='image' {...register('image', { onChange: onImageChange })} className='form-control' accept='image/*' />
                                                {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}

                                            </div>
                                        </div>
                                        <div className='col-md-6'>

                                            <div className='mb-3 mt-5'>
                                                <label className=' form-label'><strong> Mã nhân viên:{user.maNV}</strong></label>
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong> Tên nhân viên:{user.name}</strong></label>
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong> Giới tính:{user.gender}</strong></label>
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong> Ngày sinh:{user.date_of_birth}</strong></label>
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong> Nơi sinh:{user.birthplace}</strong></label>
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong> Số CMND:{user.CMND}</strong></label>
                                            </div>
                                            {/* <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong>Bằng cấp:{position.degree}</strong></label>
                                               

                                            </div>

                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong>Chức vụ:{ position.namePosition }</strong></label>
                                            </div> */}
                                            <div className='mb-3 mt-3'>
                                                <label className='form-label'><strong> Trạng thái:{user.status}</strong></label>
                                            </div>


                                        </div>

                                        <Link to="/api/user/edit/:id" className='btn btn-warning '><i class="fa-sharp fa-thin fa-pencil"></i> Update </Link>
                                        <Link to="/api/user" className='btn btn-primary '><i class="fa-solid fa-backward-step"></i> Back </Link>
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

export default Personal

