import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions'
import requestApi from '../helpers/Api'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"
const Login = () => {
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({})
    const [formErrors, setFormErrors] = useState({});
    const [isSummited, setIsSummited] = useState(false);
    const navigate = useNavigate();
    const onChange = (event) => {
        let target = event.target;
        setLoginData({
            ...loginData, [target.name]: target.value
        })
    }

    useEffect(() => {
        if (isSummited) {
            validateForm();
        }

    }, [loginData])

    const validateForm = () => {
        let isValid = true;
        const errors = {}
        if (loginData.email === '' || loginData.email === undefined) {
            errors.email = "Please enter email"
        } else {
            let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.email);
            if (!valid) {
                errors.email = 'Email is not valid'
            }
        }
        if (loginData.password === '' || loginData.password === undefined) {
            errors.password = 'Please enter password'
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            isValid = false
        } else {
            setFormErrors({});
        }
        return isValid;
    }
    const onSubmit = () => {
        console.log(loginData)
        let valid = validateForm();
        if (valid) {
            console.log('request login api')

            dispatch(actions.controlLoading(true))
            requestApi('/api/auth/login', 'POST', loginData).then((res) => {
                console.log(res)
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                dispatch(actions.controlLoading(false))

                navigate('/');
            }).catch(err => {
                dispatch(actions.controlLoading(false))
                console.log(err)
                if (typeof err.respone !== "undefined") {
                    if (err.respone.status !== 201) {
                        toast.error(err.respone.data.message, { position: "top-right" }

                        )
                    }
                } else {
                    toast.error("Máy chủ không hoạt động.Vui lòng thử lại !", { position: "top-center" })
                }
            })
        }
        setIsSummited(true);

    }
    return (
        <div id="layoutAuthentication" className='bg-primary '>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5  ">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Đăng nhập</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="email" type="email" onChange={onChange} placeholder="name@example.com" />
                                                <label >Nhập email</label>
                                                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}

                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="password" name="password" onChange={onChange} placeholder="Password" />
                                                <label >Nhập mật khẩu</label>
                                                {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}

                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" for="inputRememberPassword">Ghi nhớ mật khẩu </label>
                                            </div>
                                            <div className=" mt-4 mb-0">
                                                <button className="btn btn-primary btn-block btn-lg" type='button' onClick={onSubmit}>Login</button>
                                            </div>
                                            <div className="mt-4 mb-0">
                                                <div className="d-grid">
                                                    <GoogleLogin
                                                        onSuccess={(credentialResponse) => {
                                                            const decoded = jwtDecode(credentialResponse?.credential);
                                                            console.log(decoded);
                                                        }}
                                                        onError={() => {
                                                            console.log('Login Failed');
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-2 mb-0">
                                                <div className="d-grid"><a className="btn btn-facebook btn-user btn-block" href="index.html"><i className="fab fa-facebook-f fa-fw">
                                                </i> Đăng nhập bằng Facebook </a></div>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="card-footer text-center py-3">
                                        <Link to='/resetpassword' className="small" >Quên mật khẩu?</Link>
                                        <hr />
                                        <div className="small"><Link to='/register'> Cần một tài khoản? Đăng ký!</Link></div>
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

export default Login