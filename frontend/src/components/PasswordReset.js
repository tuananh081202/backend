import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PasswordReset = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('');

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            
            setMessage('Mật khẩu đã được gửi đến địa chỉ email .');
        } catch (error) {
            console.log('error',error)
            setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };
    return (
        <div id="layoutAuthentication" className='bg-primary'>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Password Recovery</h3></div>
                                    <div className="card-body">
                                        <div className="small mb-3 text-muted">Enter your email address and we will send you a link to reset your password.</div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-floating mb-3">  
                                                <input className="form-control" type="email" value={email} placeholder="Vui lòng nhập email" onChange={(e) => setEmail(e.target.value)}  />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link to='/login'  >Return to login</Link>
                                                <button className="btn btn-primary " type='submit' >Reset Password</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <Link to='/register' >Need an account? Sign up!</Link>
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
                            <div className="text-muted">Copyright &copy; Your Website 2023</div>
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

export default PasswordReset