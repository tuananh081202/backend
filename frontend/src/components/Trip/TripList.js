import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../helpers/common'
import { Button, Modal } from 'react-bootstrap'
import Table from '../Table/Table'
import { useDispatch } from 'react-redux'
import { CSVLink } from 'react-csv'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api'
import DescriptionCell from '../../helpers/DescriptionCell'

const TripList = () => {
    const dispatch = useDispatch()
    const [trip, setTrip] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const [dataExport, setDataExport] = useState([])

    const columns = [
        {
            name: 'STT',
            element: row => row.id
        },
        {
            name: 'Mã công tác',
            element: row => row.MaCongTac
        },
        {
            name: 'Tên nhân viên',
            element: row => row.user.name
        },
        {
            name:'Chức vụ',
            element: row => row.position.namePosition
        },
        {
            name: 'Ngày bắt đầu',
            element: row => formatDateTime(row.NgayBatDau)
        },
        {
            name: 'Ngày kết thúc',
            element: row => formatDateTime(row.NgayKetThuc)
        },
        {
            name: 'Địa điểm',
            element: row => row.DiaDiem
        },
        {
            name: 'Mục đích',
            element: row => <DescriptionCell description={row.MucDich} />
        },
        {
            name: 'Trạng thái',
            element: row => {
                let content;
                switch (row.TrangThai) {
                    case 'Đang công tác':
                        content = <span className="in-progress">{row.TrangThai}</span>;
                        break;
                    case 'Đã công tác':
                        content = <span className="completed">{row.TrangThai}</span>;
                        break;
                    case 'Sắp công tác':
                        content = <span  className="scheduled">{row.TrangThai}</span>;
                        break;
                    default:
                        content = row.TrangThai;
                }
                return content;
            }
        },               
        {
            name: 'Hành động',
            element: row => (
                <>
                    <Link to={`/api/trip/edit/${row.id}`} className='btn btn-sm btn-info me-1'><i className='fa fa-pencil'></i> Edit </Link>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i>Delete</button>
                </>
            )
        }
    ]

    const handleDelete = (id) => {
        console.log('single delete with id =>', id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType(id)
        setDeleteType('single')
    }

    const requestDeleteApi = () => {

        requestApi(`/api/trip/${deleteItem}`, 'DELETE', []).then(response => {
            setShowModal(false)
            setRefresh(Date.now())
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            setShowModal(false)
            dispatch(actions.controlLoading(false))
        })

    }

    useEffect(() => {
        dispatch(actions.controlLoading(true));
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/trip${query}`, 'GET', []).then(response => {
            console.log("res=>", response)
            setTrip(response.data.data);
            setNumofPage(response.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false));
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    const getTripExport = (_event, done) => {
        let result = []
        if (TripList && TripList.length > 0) {
            result.push(['id', 'MaCongTac', 'NgayBatDau', 'NgayKetThuc', 'DiaDiem', 'MucDich', 'TrangThai']);
            TripList.map(item => {
                let arr = [];

                arr[0] = item.id
                arr[1] = item.MaCongTac
                arr[2] = item.NgayBatDau
                arr[3] = item.NgayKetThuc
                arr[4] = item.DiaDiem
                arr[5] = item.MucDich
                arr[6] = item.TrangThai

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
                    <h3 className='mt-4'>Công tác</h3>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Tổng quan</Link></li>
                        <li className='breadcrumb-item'>Quản lý công tác</li>
                        <li className='breadcrumb-item active'>Danh sách công tác</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to='/api/trip/add'><i class="fa-solid fa-plus"></i> Tạo công tác </Link>
                        <CSVLink
                            filename={'trip.csv'}
                            className='btn btn-sm btn-primary me-1'
                            data={trip}
                            target='_blank'
                            asyncOnClick={true}
                            onClick={(event, done) => getTripExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Xuất Excel </CSVLink>

                    </div>
                    <Table
                        name="Danh sách công tác"
                        data={trip}
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
            <Modal show={showModal} onHide={() => setShowModal(false)} size='sm'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete?

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                    <Button className='btn-danger' onClick={requestDeleteApi}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TripList