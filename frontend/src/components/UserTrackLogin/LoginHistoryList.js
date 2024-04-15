// LoginHistoryComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import LiveSearch from '../Table/LiveSearch';
const LoginHistoryComponent = () => {
    // const { onChangeItemsPerPage, onKeySearch } = props
    const [loginHistory, setLoginHistory] = useState([]);


    useEffect(() => {
        // Gọi API để lấy thông tin lịch sử đăng nhập từ server
        axios.get('http://localhost:5000/api/usertracklogin/login-history')
            .then(response => {
                setLoginHistory(response.data); // Cập nhật state với dữ liệu lịch sử đăng nhập từ server
            })
            .catch(error => {
                console.error('Error fetching login history:', error);
            });
    }, []);

    // const onChangeOption = (event) => {
    //     const target = event.target
    //     console.log("change items per page to=>", target)
    //     onChangeItemsPerPage(target.value)
    // }
    // Hàm xử lý sự kiện đăng nhập thành công



    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Login History</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item"><a href="index.html">Tổng quan</a></li>
                        <li class="breadcrumb-item active">Lịch sử đăng nhập</li>
                    </ol>
                    <div class="card mb-4">
                        <div class="card-body">
                            DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                            <a target="_blank" href="https://datatables.net/"> official DataTables documentation</a>
                            .
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Bảng theo dõi lịch sử đăng nhập
                        </div>
                        <div class="card-body">

                            <div className='row mb-3'>
                                <div className='col-sm-12 col-md-6'>
                                    <label className='d-inline-flex'>Show
                                        <select className='form-select form-select-sm ms-1 me-1' >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select> entries
                                    </label>
                                </div>
                                <div className='col-sm-12 col-md-6'>
                                    <label className='d-inline-flex float-end'>Search:

                                    </label>

                                </div>

                            </div>
                            {loginHistory.length === 0 ? (
                                <p>No available</p>
                            ) : (
                                <table className='table table-striped table-bordered table-hover' cellPadding="0" width="100%" border="1">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tài khoản</th>
                                            <th>Địa chỉ Ip</th>
                                            <th>Ngày tạo</th>
                                            {/* Thêm các cột thông tin khác nếu cần */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loginHistory.map(history => (
                                            <tr key={history.id}>
                                                <td>{history.id}</td>
                                                <td>{history.account.email}</td>
                                                <td>{history.ip_address}</td>
                                                <td>{history.created_at}</td>
                                                {/* Hiển thị các thông tin khác của lịch sử đăng nhập */}
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            )}
                        </div>

                    </div>
                </div>
            </main>

        </div>

    );
};

export default LoginHistoryComponent;
