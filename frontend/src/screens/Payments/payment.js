import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { listNotes, updateNoteStatusAction } from '../../actions/notesActions';

const Payment = () => {
  const dispatch = useDispatch();
  const noteList = useSelector(state => state.noteList)
  const{loading, notes, error} = noteList;
  

   const userLogin = useSelector(state => state.userLogin);
   const {userInfo} = userLogin;

const navigate = useNavigate();

useEffect(() => {
  dispatch(listNotes());
if(!userInfo){
  navigate("/")
}
},[dispatch,navigate,userInfo] );   

const handlePaymentProcess = async (noteId) => {
  const newStatus = "done";
  //const newPayment = 75000;
  
  try {
      // Wait for the dispatch to complete
      await dispatch(updateNoteStatusAction(noteId, newStatus));

      // Navigate to the /success page only after the dispatch has completed
      navigate('/success');
  } catch (error) {
      // Handle any errors that might occur during the dispatch
      console.error("Error updating note:", error);
  }
};




  return (
    <MDBContainer
      className="py-5"
      fluid
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)",
      }}
    >
      <MDBRow className=" d-flex justify-content-center">
      {notes?.map((note, index) => (
        <MDBCol md="10" lg="8" xl="5">
          <MDBCard className="rounded-3">
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <h1><strong>Payment Details </strong></h1>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ textAlign: 'left', maxWidth: '400px' , color: 'grey' }}>
        <p style={{ fontSize: "18px", whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block", width: "200px" }}>
                Tax payment(3 months)
            </span> 
            : &emsp;{(note.payment / 4).toFixed(2)} LKR
        </p>
        <p style={{ fontSize: "18px", whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block", width: "200px" }}>
                Dept. Payment
            </span> 
            : &emsp; {((note.payment * 0.15) / 4).toFixed(2)} LKR
        </p>
        <p style={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block", width: "200px" }}>
                Total Payment
            </span> 
            : &emsp;{(note.payment / 4 + (note.payment * 0.15) / 4).toFixed(2)} LKR
        </p>
    </div>
</div>

              <br/>
              <h4><strong>Credit/Debit Card :</strong></h4><br/>
              <MDBInput
                label="Cardholder's Name"
                id="form3"
                type="text"
                size="lg"
                placeholder="John Doe"
              />
              <MDBRow className="my-4">
                <MDBCol size="6">
                  <MDBInput
                    label="Card Number"
                    id="form4"
                    type="text"
                    size="lg"
                    placeholder="1234 5678 1234 5678"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBInput
                    label="Expire"
                    id="form5"
                    type="password"
                    size="lg"
                    placeholder="MM/YYYY"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBInput
                    label="CVV"
                    id="form6"
                    type="password"
                    size="lg"
                    placeholder="CVV"
                  />
                </MDBCol>
              </MDBRow>
              <MDBBtn color="primary" size="lg" block onClick={() => handlePaymentProcess(note._id)}>
    Process Payment ({(note.payment / 4 + (note.payment * 0.15) / 4).toFixed(2)} LKR)
</MDBBtn>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>))}
      </MDBRow>
    </MDBContainer>
  );
};

export default Payment;