import React, { useEffect, useState } from 'react'
import Table from '../Table/Table';
import requestApi from '../../helpers/Api';
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { StarRating } from 'react-star-rating-component'; // Assuming you have a rating component
import { CSVLink } from 'react-csv';

const AccountList = () => {
    const dispatch = useDispatch();
    const [account, setAccount] = useState([])
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
            element: row => row.user.email
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
        // {
        //     name:"Rating",
        //     element: row => row.rating
        // },
       
        {
            name: "Actions",
            element: row => (
                <>
                    
                    <Link to={`/api/account/edit/${row.id}`} className='btn btn-sm btn-warning me-1' ><i className="fa fa-pencil"></i> Edit </Link>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i> Delete</button>
                </>
            )
        }
    ]


    const handleDelete = (id) => {
        console.log('single delete with id =>', id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }



    const requestDeleteApi = () => {

        requestApi(`/api/account/${deleteItem}`, 'DELETE', []).then(response => {
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
        
        requestApi(`/api/account${query}`, 'GET', []).then(response => {
            console.log("res=>",response)
            setAccount(response.data.data);
            setNumofPage(response.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false));
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    const getProductExport = (_event, done) => {
        let result = []
        if (AccountList && AccountList.length > 0) {
            result.push(['id','avatar', 'fullName',  'user','email','phoneNumber','roles', 'status']);
            AccountList.map(item => {
                let arr = [];

                arr[0] = item.id
                arr[1] = item.avatar
                arr[2] = item.fullName
                arr[3] = item.email
                arr[4] = item.phoneNumber
                arr[5] = item.roles
                arr[6] = item.status
                result.push(arr)
            })
            setDataExport(result);
            done();
        }
    
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Tài khoản</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to='/'>Tổng quan</Link></li>
                        <li className="breadcrumb-item active">Danh sách tài khoản</li>
                    </ol>
                    <div className='mb-3'>
                        
                        {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger' ><i className='fa fa-trash'></i>Delete</button>}
                        <CSVLink
                            filename={"product.csv"}
                            className="btn btn-sm btn-primary me-1"
                            data={account}
                            target="_blank"
                            asyncOnClick={true}
                            onClick={(event, done) => getProductExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Export Excel </CSVLink>

                    </div>
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
export default AccountList;