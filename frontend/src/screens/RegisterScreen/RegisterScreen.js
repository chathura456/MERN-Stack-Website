import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import MainScreen from '../../components/MainScreen';
import "./RegisterScreen.css";

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import Loading from '../../components/Loading';
const RegisterScreen = () => {
const[email, setEmail] = useState("");
const [name, setName] = useState("");
const [pic, setPic] = useState
("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
const [password, setPassword] = useState("");
const [confirmpassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState(null);
const [picMessage, setPicMessage] = useState(null);

const dispatch = useDispatch();
const navigate = useNavigate();
const userRegister = useSelector((state) => state.userRegister)
const {loading, error, userInfo} = userRegister;

useEffect(() => {
  if(userInfo){
    navigate("/mynotes");
  }
},[navigate,userInfo]
);

const submitHandler = async(e) =>{
  e.preventDefault();

  if (password!==confirmpassword){
    setMessage("Password Do not Mattch");
  }else{
    dispatch(register(name, email, password, pic));
  }
  
};

const postDetails = (pic) => {
  if (!pic) {
    return setPicMessage("Please Select an Image");
  }
  setPicMessage(null);

  if (pic.type  === "image/jpeg" || pic.type === "image/png"){
    const data = new FormData();
    data.append("file", pic)
    data.append("upload_preset","taxonline")
    data.append("cloud_name", "dwolfiuzq")
    fetch("https://api.cloudinary.com/v1_1/dwolfiuzq/image/upload", {
    method : "post",
    body: data,
     
    }).then((res)=> res.json())
      .then((data)=>{
        console.log(data);
      setPic(data.url.toString());
    })
    .catch((err) =>{
      console.log(err);
    });
  } else{
    return setPicMessage("Please Select an Image");
  }
};

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error} </ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message} </ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
             {picMessage && (<ErrorMessage variant= "danger">{picMessage}</ErrorMessage>)}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <div className="custom-file">
              <input
              onChange={(e) => postDetails(e.target.files[0])}
                type="file"
                className="custom-file-input"
                id="custom-file"
               custom
              />
              <label className="custom-file-label" htmlFor="custom-file">
                Choose file
              </label>
            </div>
          </Form.Group>
          <br/>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen
