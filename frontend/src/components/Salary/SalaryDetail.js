import React, { useEffect, useState } from 'react'
import requestApi from '../../helpers/Api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Link } from 'react-router-dom'
import Table from '../Table/Table'
import { formatDateTime } from '../../helpers/common'
const SalaryDetail = () => {
    const dispatch = useDispatch([])
    const [salary, setSalary] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())


    const columns = [
        {
            name: "STT",
            element: row => row.id
        },
        {
            name: "Mã lương",
            element: row => row.MaLuong
        },
        {
            name: "Tên nhân viên",
            element: row => row.user.name
        },
        {
            name:"Chức vụ",
            element: row => row.position.namePosition
        },  
        {
            name: "Lương giờ (VND)",
            element: row => <div> {parseFloat(row.LuongGio).toLocaleString('vi-VN')}</div>
        },
        { 
            name: "Số giờ làm",
            element: row => row.SoGioLam
        },
        {
            name: "Số giờ nghỉ",
            element: row => row.SoGioNghi
        },
        {
            name:"Số giờ muộn",
            element: row => row.SoGioMuon
        },
        {
            name: "Phụ cấp (VND)",
            element: row => <div> {parseFloat(row.PhuCap).toLocaleString('vi-VN')}</div>
        },
        {
            name: "Tạm ứng (VND)",
            element: row => <div> {parseFloat(row.TamUng).toLocaleString('vi-VN')}</div>
        },
        {
            name: "Thực lãnh (VND)",
            element: row =><div style={{ color: 'blue' }}>{parseFloat(row.ThucLanh).toLocaleString('vi-VN')}</div>
        },
        {
            name: "Ngày chấm",
            element: row => formatDateTime(row.NgayTinhLuong)
        },
    ]

    
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?item_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/salary${query}`, 'GET', []).then(response => {
            console.log('res=>', response)
            setSalary(response.data.data)
            setNumofPage(response.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

   
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'> Chi tiết lương nhân viên </h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link> </li>
                        <li className='breadcrumb-item'>Quản lý lương</li>
                        <li className='breadcrumb-item active'>Bảng lương</li>
                    </ol>
                    
                    <Table
                        name="Bảng lương"
                        data={salary}
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

export default SalaryDetail