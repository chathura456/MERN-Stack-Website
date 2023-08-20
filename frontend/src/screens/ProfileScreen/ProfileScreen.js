import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
//import { updateProfile } from "../../actions/userActions";
//import ErrorMessage from "../../components/ErrorMessage";
//import Loading from "../../components/Loading";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //const userUpdate = useSelector((state) => state.userUpdate);
  //const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  /*const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };*/

  const submitHandler = (e) => {
    e.preventDefault();

    //dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <MainScreen title="User PROFILE">
    <div>
   <br/>

        <Row className="profileContainer">
            {/* Left Column */}
            {/* Left Column for Profile Picture */}
            <Col md={6} style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" alt={name} className="profilePic" />
            </Col>

            {/* Right Column for User and Company Details */}
            <Col md={6}>
            <br/><br/>
                <Form onSubmit={submitHandler}>
                    <p style={{ fontSize: "18px" }}>
                        <strong style={{ display: "inline-block", width: "250px" }}>
                            User Name
                        </strong> :&emsp;{name}
                    </p>
                    <p style={{ fontSize: "18px" }}>
                        <strong style={{ display: "inline-block", width: "250px" }}>
                            User Email
                        </strong> :&emsp;{email}
                    </p>
                    {notes?.map((note, index) => (
                        <div key={note._id}>
                            <p style={{ fontSize: "18px" }}>
                                <strong style={{ display: "inline-block", width: "250px" }}>
                                    Company Name
                                </strong> :&emsp;{note.title}
                            </p>
                            <p style={{ fontSize: "18px" }}>
                                <strong style={{ display: "inline-block", width: "250px" }}>
                                    Company Address
                                </strong> :&emsp; {note.content}
                            </p>
                            <p style={{ fontSize: "18px" }}>
                                <strong style={{ display: "inline-block", width: "250px" }}>
                                    Company Contact
                                </strong> :&emsp; {note.category}
                            </p>
                        </div>
                    ))}
                </Form>
            </Col>

           
        </Row>

        

         {/* Center Column */}
         <Col md={12} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
         <br/> <h2>Tax Informaion</h2><br/>
                {notes?.map((note, index) => (
                    <div key={note._id}>
                        <p style={{ fontSize: "18px" }}>
                            <strong style={{ display: "inline-block", width: "250px" }}>
                                Allocated Tax Payment/Year
                            </strong> :&emsp; {((note.payment * 1)).toFixed(2)} LKR
                        </p>
                        <p style={{ fontSize: "18px" }}>
                            <strong style={{ display: "inline-block", width: "250px" }}>
                                Dept.Payment/Year(15% tax)
                            </strong> :&emsp; {((note.payment * 0.15)).toFixed(2)} LKR
                        </p>
                        <p style={{ fontSize: "22px" }}>
                            <strong style={{ display: "inline-block", width: "250px" }}>
                                Total Payment/Year
                            </strong> :&emsp; {((note.payment * 1) + (note.payment * 0.15)).toFixed(2)} LKR
                        </p>
                        <br />
                        <p style={{ fontSize: "18px" }}>
                            <strong style={{ display: "inline-block", width: "250px" }}>
                                Quater 01 Payment
                            </strong> :&emsp; {(note.status) || "pending"}
                        </p>
                        <p style={{ fontSize: "18px" }}>
                            <strong style={{ display: "inline-block", width: "250px" }}>
                                Quater 02 Payment
                            </strong> :&emsp; {(note.status2) || "pending"}
                        </p>
                        <p style={{ fontSize: "18px" }}>
                            <strong style={{ display: "inline-block", width: "250px" }}>
                                Quater 03 Payment
                            </strong> :&emsp; {(note.status3) || "pending"}
                        </p>
                        <p style={{ fontSize: "18px" }}>
                            <strong style={{ display: "inline-block", width: "250px" }}>
                                Quater 04 Payment
                            </strong> :&emsp; {(note.status4) || "pending"}
                        </p>
                    </div>
                ))}
            </Col>

        {/* Centered Back to Home Page Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/mynotes">
                <Button type="submit" varient="primary">
                    Back to Home Page
                </Button>
            </Link>
        </div>
    </div>
</MainScreen>

  );
};

export default ProfileScreen;
