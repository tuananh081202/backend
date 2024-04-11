import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UserRead = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        // Gọi API để lấy thông tin nhân viên theo ID
        axios.get(`http://localhost:5000/api/user/${id}`)
            .then(response => {
                // Lưu trữ thông tin nhân viên vào state
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching User:', error);
            });
    }, [id]); // Gọi API lại khi ID thay đổi

    if (!user) {
        return <div>Loading...</div>;
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
                        <div className='card-header'>
                            <div className="d-flex justify-content-center">
                                <h4>Chi tiết thông tin nhân viên</h4>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <p><strong></strong> <img style={{ width: '250px' }} src={`http://localhost:5000/${user.image}`} alt="..." /></p>

                                        </div>
                                        
                                        <div className="col-md-3">
                                            <p><strong>ID:</strong> {user.id}</p>
                                            <p><strong>Mã nhân viên:</strong> {user.maNV}</p>
                                            <p><strong>Tên nhân viên:</strong> {user.name}</p>
                                            <p><strong>Giới tính:</strong> {user.gender}</p>
                                            <p><strong>Ngày sinh:</strong> {user.date_of_birth}</p>
                                            <p><strong>Nơi sinh:</strong> {user.birthplace}</p>
                                            <p><strong>Loại nhân viên:</strong> </p>
                                            <p><strong>CMND:</strong> {user.CMND}</p>
                                            <p><strong>Tình trạng:</strong> {user.status}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Ngày cấp:</strong> {user.date_range}</p>
                                            <p><strong>Nơi cấp:</strong> {user.issued_by}</p>
                                            <p><strong>Quốc tịch:</strong> {user.nationality}</p>
                                            <p><strong>Dân tộc:</strong> {user.nation}</p>
                                            <p><strong>Tôn giáo:</strong> {user.religion}</p>
                                            <p><strong>Hộ khẩu:</strong> {user.household}</p>
                                            <p><strong>Tạm trú:</strong> {user.shelter}</p>
                                            <p><strong>Chức vụ:</strong> </p>
                                            <p><strong>Bằng cấp:</strong> </p>


                                        </div>
                                      

                                    </div>

                                    <Link to={`/api/user/edit/${id}`} className='btn btn-warning'><i className="fa-sharp fa-thin fa-pencil"></i> Update </Link>
                                    <Link to="/api/user" className='btn btn-primary ms-3'><i className="fa-solid fa-backward-step"></i> Back </Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserRead;
