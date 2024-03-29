import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
const DepartmentDetail = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/department/${id}`)
            .then(respone => {
                setDepartment(respone.data)
            })
            .catch(error => {
                console.error('Lỗi không hiển thị phòng ban!!!', error)
            })
    }, [])

    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'>Thông tin phòng ban</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className="breadcrumb-item"><Link to='/'>Tổng quan</Link></li>
                        <li className="breadcrumb-item">Phòng ban</li>
                        <li className="breadcrumb-item active">Thông tin phòng ban</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <div className='d-flex justify-content-center '>
                                <h4>Chi tiết thông tin phòng ban</h4>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className="col-md-3">
                                        <p><strong>ID:</strong> {department.id}</p>
                                        <p><strong>Mã phòng ban:</strong> {department.maPB}</p>
                                        <p><strong>Tên phòng ban:</strong> {department.tenPB}</p>
                                        <p><strong>Mô tả:</strong> {department.description}</p>
                                        <p><strong>Người tạo:</strong> {department.createdBy}</p>

                                    </div>
                                    <Link to={`/api/department/edit/${id}`} className='btn btn-warning'><i className="fa-sharp fa-thin fa-pencil"></i> Update </Link>
                                    <Link to="/api/department/list" className='btn btn-primary ms-3'><i className="fa-solid fa-backward-step"></i> Back </Link>

                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}

export default DepartmentDetail