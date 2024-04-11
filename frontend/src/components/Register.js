import React, { useState, useEffect } from 'react'
import requestApi from '../helpers/Api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions'
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
    const [registerData, setRegisterData] = useState({})
    const [formErrors, setFormErrors] = useState({});
    const [isSummited, setIsSummited] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = (event) => {
        let target = event.target;
        setRegisterData({
            ...registerData, [target.name]: target.value
        })
    }
    useEffect(() => {
        if (isSummited) {
            validateForm();
        }
    }, [registerData])

    const validateForm = () => {
        let isValid = true;
        const errors = {}
        
        if (registerData.email === '' || registerData.email === undefined) {
            errors.email = "Vui lòng nhập email"
        } else {
            let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registerData.email);
            if (!valid) {
                errors.email = 'Email không hợp lệ'
            }
        }
        if (registerData.password === '' || registerData.password === undefined) {
            errors.password = 'Mật khẩu phải có ít nhất 8 ký tự'
        }
        
        if (registerData.password !== registerData.repeatPassword) {
            errors.repeatPassword = 'Mật khẩu không đúng'
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            isValid = false
        } else {
            setFormErrors({});
        }
        return isValid;
    }

    const onSummit = () => {
        console.log(registerData)
        let valid = validateForm();
        if (valid) {
            console.log('request register api')
            dispatch(actions.controlLoading(true))
            requestApi('/api/auth/register', 'POST', registerData).then((res) => {
                console.log('Đăng ký thành công !', res)
                dispatch(actions.controlLoading(false))
                toast.success('Đăng ký thành công !!!', { position: 'top-center', autoClose: 2000 })
                setTimeout(() => navigate('/login'), 3000)
            }).catch(err => {
                dispatch(actions.controlLoading(false))
                console.log('err=>', err)
                if (typeof err.respone !== "undefined") {
                    if (err.respone.status !== 201) {
                        toast.error(err.respone.data.message, { position: "top-right" }
                        )
                    }
                } else {
                    toast.error("Máy chủ không hoạt động.Vui lòng thử lại!", { position: "top-center" })
                }
            })
        }

        setIsSummited(true)
    }
    return (
        <div id="layoutAuthentication" className='bg-primary animate-bg'>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Tạo tài khoản</h3></div>
                                    <div className="card-body">
                                        <form>      
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="text" name='fullName' onChange={onChange} placeholder="Nhập họ tên của bạn" />
                                                <label>Họ tên</label>
                                                {formErrors.fullName && <p style={{ color: 'red' }}>{formErrors.fullName}</p>}
                                            </div>
                                                
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="email" name='email' onChange={onChange} placeholder="name@example.com" />
                                                <label>Địa chỉ email</label>
                                                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" type="password" name='password' onChange={onChange} placeholder="Tạo một mật khẩu" />
                                                        <label>Mật khẩu</label>
                                                        {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" type="password" name='repeatPassword' onChange={onChange} placeholder="Xác nhận mật khẩu" />
                                                        <label>Nhập lại mật khẩu</label>
                                                        {formErrors.repeatPassword && <p style={{ color: 'red' }}>{formErrors.repeatPassword}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" type="phoneNumber" name='phoneNumber' onChange={onChange} placeholder="Nhập số điện thoại" />
                                                        <label>Số điện thoại</label>
                                                        {formErrors.phoneNumber && <p style={{ color: 'red' }}>{formErrors.phoneNumber}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" type="roles" name='roles' onChange={onChange} placeholder="Nhập quyền hạn" />
                                                        <label>Quyền</label>
                                                        {formErrors.roles && <p style={{ color: 'red' }}>{formErrors.roles}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 mb-0">
                                                <div className="d-grid">
                                                    <button className="btn btn-primary " type='button' onClick={onSummit}>Tạo tài khoản</button>
                                                </div>
                                            </div>
                                            
                                            

                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to='/login'>Đã có tài khoản? Đi đến đăng nhập</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2024</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Register