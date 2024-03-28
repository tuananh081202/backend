import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../helpers/moment'
import { useDispatch } from 'react-redux'
import Table from '../Table/Table'
import requestApi from '../../helpers/Api'
import * as actions from '../../redux/actions'
import { CSVLink } from 'react-csv';
import DescriptionCell from '../../helpers/DescriptionCell'

const PositionList = () => {
    const dispatch = useDispatch()
    const [position, setPosition] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [refresh, setRefresh] = useState(Date.now())
    const [dataExport,setDataExport] = useState([])
    const columns = [
        {
            name: "STT",
            element: row => row.id
        },
        {
            name: "Mã chức vụ",
            element: row => row.maCV
        },
        {
            name: "Tên vị trí",
            element: row => row.namePosition
        },
        {
            name: "Bằng cấp",
            element: row => row.degree
        },
        {
            name: "Lương ngày",
            element: row => row.salary
        },
        {
            name: "Mô tả",
            element: row =><DescriptionCell description={row.description}/>
        },
        {
            name: "Người tạo",
            element: row => row.createdBy
        },
        {
            name: "Ngày tạo",
            element: row => formatDateTime(row.created_at)
        },
        {
            name: "Ngày sửa",
            element: row => formatDateTime(row.updated_at)
        },
       
    ]



    useEffect(() => {
        dispatch(actions.controlLoading(true));
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/position${query}`, 'GET', []).then(response => {
            console.log("res=>", response)
            setPosition(response.data.data);
            setNumofPage(response.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false));
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    const getPositionExport = (_event, done) => {
        let result = []
        if (PositionList && PositionList.length > 0) {
            result.push(['id', 'maCV', 'namePosition', 'degree', 'salary', 'description', 'createdBy', 'created_at', 'updated_at']);
            PositionList.map(item => {
                let arr = [];

                arr[0] = item.id
                arr[1] = item.maCV
                arr[2] = item.namePosition
                arr[3] = item.degree
                arr[4] = item.salary
                arr[5] = item.description
                arr[6] = item.createdBy
                arr[7] = item.created_at
                arr[8] = item.updated_at

                result.push(arr)
            })
            setDataExport(result);
            done();
        }

    }
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h3 className='mt-4'> Chức vụ </h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'> Tổng quan </Link></li>
                        <li className='breadcrumb-item'>Chức vụ</li>
                        <li className='breadcrumb-item active'>Danh sách chức vụ</li>
                    </ol>
                    <div className='mb-3'>
                        <CSVLink
                            filename={"position.csv"}
                            className="btn btn-sm btn-primary me-1"
                            data={position}
                            target="_blank"
                            asyncOnClick={true}
                            onClick={(event, done) => getPositionExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Xuất Excel </CSVLink>
                    </div>
                    <Table
                        name="Danh sách chức vụ"
                        data={position}
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

export default PositionList