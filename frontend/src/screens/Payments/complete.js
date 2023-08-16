import { MDBBtn, MDBContainer, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Success() {
    return (
      <MDBContainer className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 shadow-4 rounded">
        <MDBIcon fas icon="check-circle" className="text-success mx-auto d-block mb-4" size="3x" />
        <div className="text-center">
          <MDBTypography tag="h3" variant="h5" className="text-dark font-weight-bold">
            Payment Done!
          </MDBTypography>
          <p className="text-muted my-2">Thank you for completing your secure online payment.</p>
          <p>Have a great day!</p>
          <div className="py-3">
          <Link to="/mynotes">
            <MDBBtn color="primary" href="#">
              GO BACK
            </MDBBtn></Link>
          </div>
        </div>
      </div>
    </MDBContainer>
    );
  }