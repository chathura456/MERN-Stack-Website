import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import AdminHeader from './header';
import './header.css';

const AdminPanel = () => {
    const [data, setData] = useState([]);
    const [newTaxAmount, setNewTaxAmount] = useState('');
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/notes/usersWithNotes');
                    console.log(response.data);
                    setData(response.data);
                } catch (error) {
                    console.error("Error fetching users and notes:", error);
                }
            };
    
            fetchData();
        }, []);

        const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const handleButtonClick = (note) => {
        setSelectedNote(note);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedNote(null);
    };
    

    const handleSaveChanges = async () => {
        try {
            

            const requestBody = {
                payment: newTaxAmount,
                status: 'pending' // Setting status to 'pending'
            };

            const { data } = await axios.put(`http://localhost:5000/api/notes/${selectedNote._id}/noteStatus`, requestBody);

            // Handle successful update (e.g., update local state, show a success message, etc.)
            setShowModal(false);
            // Refresh your data or make necessary state updates

            // Refresh the page
        window.location.reload();

        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error updating note status:", error);
        }
    };

    


        return (
            
            <div>
                <div>
            <AdminHeader />
            {/* Rest of your admin panel content */}
        </div>
        <div style={{ margin: '50px' }}>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Company Name</th>
                            <th>Company Address</th>
                            <th>Phone No</th>
                            <th>Tax Amount(LKR)</th>
                            <th>1st Quarter</th>
                            <th>2nd Quarter</th>
                            <th>3rd Quarter</th>
                            <th>4th Quarter</th>
                        </tr>
                    </thead>
                    <tbody>
    {data.map((item) => (
        <tr key={item._id}>
            <td>{item.user.name}</td>
            <td>{item.user.email}</td>
            <td>{item.title}</td>
            <td>{item.content}</td>
            <td>{item.category}</td>
            <td>
                {item.payment ? (
                    <>
                        <span className="mr-2">{item.payment}</span>
                    </>
                ) : (
                    <Button variant="primary" size="sm" onClick={() => handleButtonClick(item)}>
                        <Plus /> Add Taxes
                    </Button>
                )}
            </td>
            <td style={{ backgroundColor: item.status === "pending" ? "yellow" : item.status === "done" ? "green" : "white", color: item.status === "done" ? "white" : "black", fontWeight: item.status === "done" ? "bold" : "normal" }}>
            {item.status || "-"}
        </td>
        <td style={{ backgroundColor: item.status2 === "pending" ? "yellow" : item.status2 === "done" ? "green" : "white", color: item.status2 === "done" ? "white" : "black", fontWeight: item.status2 === "done" ? "bold" : "normal" }}>
            {item.status2 || "-"}
        </td>
        <td style={{ backgroundColor: item.status3 === "pending" ? "yellow" : item.status3 === "done" ? "green" : "white", color: item.status3 === "done" ? "white" : "black", fontWeight: item.status3 === "done" ? "bold" : "normal" }}>
            {item.status3 || "-"}
        </td>
        <td style={{ backgroundColor: item.status4 === "pending" ? "yellow" : item.status4 === "done" ? "green" : "white", color: item.status4 === "done" ? "white" : "black", fontWeight: item.status4 === "done" ? "bold" : "normal" }}>
            {item.status4 || "-"}
        </td>

        </tr>
    ))}
</tbody>


                </Table>
                <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit/Add Tax</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tax ID</Form.Label>
                            <Form.Control type="text" value={selectedNote?._id} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" value={selectedNote?.user.name} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" value={selectedNote?.title} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tax Amount</Form.Label>
                            <Form.Control 
                        type="text" 
                        value={newTaxAmount} 
                        onChange={(e) => setNewTaxAmount(e.target.value)} 
                    />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            </div>
            </div>
        );
        
        
        
        
        
};

export default AdminPanel;