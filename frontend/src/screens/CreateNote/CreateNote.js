import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

function CreateNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Add Company Details">
      <Card>
        <Card.Header>Company Details</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter your company name"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
             <br/>
            <Form.Group controlId="content">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the address"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="content">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter contact number"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <br/>
            <Button type="submit" variant="primary">
              Sumbit Details
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
