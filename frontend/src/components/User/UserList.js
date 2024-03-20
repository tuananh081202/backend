import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Table from '../Table/Table'
import requestApi from '../../helpers/Api'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { CSVLink } from 'react-csv';

const UserList = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    // const [dataExport, setDataExport] = useState([])

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
            element: row => <img width="100px" src={process.env.REACT_APP_API_URL + '/' + row.image} />
            
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
            element: row => row.date_of_birth
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
        {
            name: "Actions",
            element: row => (
                <>
                    <Link to={`/api/user/${row.id}`} className='btn btn-sm btn-info me-1'><i class='fa-solid fa-book'></i> Read </Link>
                    <Link to={`/api/user/edit/${row.id}`} className='btn btn-sm btn-warning me-1' ><i className="fa fa-pencil"></i> Edit </Link>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i> Delete</button>
                </>
            )
        }


    ]

    const handleDelete = (id) => {
        console.log('Single delete with id=>', id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const handleMultiDelete = () => {
        console.log('multi delete =>', selectedRows)
        setShowModal(true)
        setDeleteType("multi")
    }

    const requestDeleteApi = () => {
        if (deleteType === 'single') {
            dispatch(actions.controlLoading(true))  

        requestApi(`/api/user/${deleteItem}`, 'DELETE', []).then(response => {
            setShowModal(false)
            setRefresh(Date.now())
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            setShowModal(false)
            dispatch(actions.controlLoading(false))
        })
      } else {
        dispatch(actions.controlLoading(true))
        requestApi(`api/user/multiple?ids=${selectedRows.toString()}`, 'DELETE', []).then(response => {
            setShowModal(false)
            setRefresh(Date.now())
            setSelectedRows([])
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            setShowModal(false)
            dispatch(actions.controlLoading(false))
        })

    }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true));
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

        requestApi(`/api/user${query}`, 'GET', []).then(response => {
            console.log("res=>", response)
            setUser(response.data.data);
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
                <div className='container-fluid px-4'>
                    <h1 className='mt-4'>Nhân viên</h1>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrum-item'><Link to=''>Tổng quan</Link></li>
                        <li className='breadcrum-item'>Nhân viên</li>
                        <li className="breadcrumb-item active">Danh sách nhân viên</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to='/api/user/add'><i className='fa fa-plus'></i>Add new</Link>
                        {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger me-2' onClick={handleMultiDelete}><i className='fa fa-trash'></i>Delete</button>}
                        {/* <CSVLink
                            filename={"user.csv"}
                            className="btn btn-sm btn-primary me-1"
                            data={user}
                            target="_blank"
                            asyncOnClick={true}
                            onClick={(event, done) => getUserExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Export Excel </CSVLink> */}
                    </div>
                    <Table
                        name="List Users"
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

export default UserList