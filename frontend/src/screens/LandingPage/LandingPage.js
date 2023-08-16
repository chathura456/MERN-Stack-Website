//import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import "./LandingPage.css";
//import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  /*const Navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      Navigate("/mynotes"); // Redirect to "/mynotes" if user is already logged in
    }
  }, [Navigate]); */
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Tax Online</h1>
              <p className="subtitle">
                First and Largest online tax advisory website in Sri Lanka
              </p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button size="lg" className="landingbutton" variant="outline-primary">
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage
