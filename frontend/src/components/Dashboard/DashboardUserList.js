import React, { useState, useEffect } from 'react'
import Table from '../Table/Table'
import { Link } from 'react-router-dom'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api'
import { useDispatch } from 'react-redux'
import { formatDateTime } from '../../helpers/common'

const DashboardUserList = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState([])
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
            name: "Mã nhân viên",
            element: row => row.maNV
        },
        {
            name: "Ảnh",
            element: row => <img width="120px" src={process.env.REACT_APP_API_URL + '/' + row.image} />
        },
        {
            name: "Tên nhân viên",
            element: row => row.name
        },
        {
            name: "Giới tính",
            element: row => row.gender
        },
        {
            name: "Ngày sinh",
            element: row => formatDateTime(row.date_of_birth)
        },
        {
            name: "Nơi sinh",
            element: row => row.birthplace
        },
        {
            name: "CMND",
            element: row => row.CMND
        },
        {
            name: "Tình trạng",
            element: row => row.status
        },
    ]



    // const requestDeleteApi = () => {
    //     requestApi(`/api/user/${deleteItem}`, 'DELETE', []).then(respone => {
    //         setShowModal(false)
    //         setRefresh(Date.now())
    //         dispatch(actions.controlLoading(false))
    //     }).catch(err => {
    //         console.log(err)
    //         setShowModal(false)
    //         dispatch(actions.controlLoading(false))

    //     })
    // }
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;
        requestApi(`/api/user${query}`, 'GET', []).then(respone => {
            console.log('res=>', respone)
            setUser(respone.data.data)
            setNumofPage(respone.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        })
    }, [itemsPerPage, currentPage, searchString, refresh])
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'>Nhân viên</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        <li className='breadcrumb-item'>Nhân viên</li>
                        <li className='breadcrumb-item active'>Danh sách nhân viên</li>
                    </ol>
                    <Table
                        name='Danh sách nhân viên'
                        data={user}
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

export default DashboardUserList