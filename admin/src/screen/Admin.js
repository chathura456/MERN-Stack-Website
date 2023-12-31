import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import axios from 'axios';


const Admin = () => {
    //Id for update record and Delete
    const [RowData,SetRowData] = useState([])
    const [Data,setData] = useState([]);
    const[ViewShow,SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }
     //FOr Edit Model
     const [ViewEdit, SetEditShow] = useState(false)
     const handleEditShow = () => { SetEditShow(true) }
     const hanldeEditClose = () => { SetEditShow(false) }
       //FOr Delete Model
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }
     //Define here local state that store the form Data
     const [name, setname] = useState("")
     const [email, setemail] = useState("")
     const [income, setnumber] = useState("")
     
 
     const [Delete,setDelete] = useState(false)

     //Id for update record and Delete
     const [id,setId] = useState("");
    const GetAdminData = () => {
        //here we will get all admin data
         
         const url = 'http://localhost:5000/admin'
         axios.get(url)
             .then(response => {
                 const result = response.data;
                 const { status, message, data } = result;
                 if (status !== 'SUCCESS') {
                     alert(message, status)
                 }
                 else {
                     setData(data)
                     console.log(data)
                 }
             })
             .catch(err => {
                 console.log(err)
             })
        }
        
        const handleSubmite = () => {
            const url = 'http://localhost:5000/admin'
            const Credentials = { name, email, income }
            axios.post(url, Credentials)
                .then(response => {
                    const result = response.data;
                    const { status, message, data } = result;
                    if (status !== 'SUCCESS') {
                        alert(message, status)
                    }
                    else {
                        alert(message)
                        window.location.reload()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const handleEdit = () =>{
            const url = `http://localhost:5000/admin/${id}`
            const Credentials = { name, email, income }
            axios.put(url, Credentials)
                .then(response => {
                    const result = response.data;
                    const { status, message } = result;
                    if (status !== 'SUCCESS') {
                        alert(message, status)
                    }
                    else {
                        alert(message)
                        window.location.reload()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
         //handle Delete Function 
    const handleDelete = () =>{
        const url = `http://localhost:5000/admin/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
   
    //call this function in useEffect
    console.log(ViewShow, RowData)
    useEffect(() => {
        GetAdminData();
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Add New User
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Income</th>
                
                                <th>Action</th>
                            </tr>
                        </thead> 
                        <tbody>
                        {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.income}</td>
                                    
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>View</Button>
                                        <Button size='sm' variant='warning' onClick={() => { handleViewShow(SetRowData(item)) }}>Edit</Button>
                                        <Button size='sm' variant='danger' onClick={() => { handleViewShow(SetRowData(item)) }}>Delete</Button>
                                    </td>
                                </tr>
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View admin Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.name} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.email} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.income} readOnly />
                            </div>
                           
                            Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Employee</Button>
                                )
                           
                        </div>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
                {/* Modal for submit data to database */}
                <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add New User </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="User Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="User email" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="User Income" />
                            </div>
                           
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Users</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for Edit employee record */}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Please enter Name" defaultValue={RowData.name}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" defaultValue={RowData.email} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Number</label>
                                <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="Please enter Income" defaultValue={RowData.number}/>
                            </div>
                            
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        
        </div>
    );
};

export default Admin;