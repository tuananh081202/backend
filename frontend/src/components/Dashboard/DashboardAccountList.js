import React, { useEffect, useState } from 'react'
import Table from '../Table/Table';
import { Link } from 'react-router-dom';
import requestApi from '../../helpers/Api';
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'


const DashboardAccountList = () => {
    const dispatch = useDispatch();
    const [account, setAccount] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [refresh, setRefresh] = useState(Date.now())




    const columns = [
        {
            name: "STT",
            element: row => row.id
        },
        {
            name: "Ảnh",
            element: row => <img width="100px" src={process.env.REACT_APP_API_URL + '/' + row.avatar} />
        },
        {
            name: "Họ tên",
            element: row => row.fullName
        },
        {
            name: "Mã NV",
            element: row => row.user.maNV
        },
        {
            name: "Email",
            element: row => row.email
        },
        {
            name: "Điện thoại",
            element: row => row.phoneNumber
        },
        {
            name: "Quyền hạn",
            element: row => row.roles
        },
        {
            name: "Trạng thái",
            element: row => row.status
        },

    ]






    useEffect(() => {
        dispatch(actions.controlLoading(true));
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/account${query}`, 'GET', []).then(response => {
            console.log("res=>", response)
            setAccount(response.data.data);
            setNumofPage(response.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false));
        })
    }, [itemsPerPage, currentPage, searchString, refresh])


    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h3 className="mt-4">Tài khoản</h3>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to='/'>Tổng quan</Link></li>
                        <li className="breadcrumb-item">Tài khoản</li>
                        <li className="breadcrumb-item active">Danh sách tài khoản</li>
                    </ol>

                    <Table
                        name="Danh sách tài khoản"
                        data={account}
                        columns={columns}
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onChangeItemsPerPage={setItemsPerPage}
                        onKeySearch={(keyword) => {
                            console.log('keyword in user list comp=>', keyword)
                            setSearchString(keyword)
                        }}
                        onSelectedRows={rows => {
                            console.log('selected row in uselist=>', rows)
                            setSelectedRows(rows)
                        }}
                    />

                </div>
            </main>


        </div>

    )
}
export default DashboardAccountList;