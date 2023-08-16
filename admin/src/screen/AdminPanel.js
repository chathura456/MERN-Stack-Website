import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Check, Clock, Plus } from 'react-bootstrap-icons';


const AdminPanel = () => {
    const [data, setData] = useState([]);
    const [newTaxAmount, setNewTaxAmount] = useState('');
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/notes/usersWithNotes');
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
            <div style={{ margin: '20px' }}>
                <h1>Admin Panel</h1><br/>
                
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
                                <td style={{ backgroundColor: item.status === "pending" ? "yellow" : item.status === "done" ? "green" : "white", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {item.status === "pending" ? <Clock /> : item.status === "done" ? <Check color="white" size="1.5em" /> : "-"}
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
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
        );
        
        
        
        
        
};

export default AdminPanel;