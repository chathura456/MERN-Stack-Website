import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listNotes } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

const MyNotes = () => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  console.log(notes);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name}...`}>
      <br />

      {!notes?.length && (
        <>
          <h1>
            <strong>Company Details</strong>
          </h1>
          <br />
          <p>You have not added company details yet.</p>
          <br />
          <Link to="/createnote">
            <Button size="lg">Add Company Details</Button>
          </Link>
        </>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes?.map((note, index) => (
        <div
          key={note._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: index !== notes.length - 1 ? "20px" : "0",
          }}
        >
          <div style={{ flex: 1 }}>
            <h1>
              <strong>Company Details</strong>
            </h1>
            <br />
            <p style={{ fontSize: "18px" }}>
              <strong style={{ display: "inline-block", width: "150px" }}>
                Name
              </strong>{" "}
              :&emsp;{note.title}
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong style={{ display: "inline-block", width: "150px" }}>
                Address
              </strong>{" "}
              :&emsp; {note.content}
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong style={{ display: "inline-block", width: "150px" }}>
                Contact
              </strong>{" "}
              :&emsp; {note.category}
            </p>
            <p style={{ fontSize: "18px" }}>
              <strong style={{ display: "inline-block", width: "150px" }}>
                Update Date
              </strong>{" "}
              :&emsp; {note.createdAt.substring(0, 10)}
            </p>
            <br />
            <Button href={`/note/${note.id}`} className="mr-2">
              Edit
            </Button>
            <Button variant="danger" onClick={deleteHandler}>
              Delete
            </Button>
          </div>
          <Card
            style={{
              flex: 1,
              padding: "20px",
              marginLeft: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ textAlign: "center" }}>
              <strong>Tax Details</strong>
            </h2>
            <br />
            <div
              style={{ margin: "0 auto", maxWidth: "400px", textAlign: "left" }}
            >
              {note.payment ? (
                <>
                  <p style={{ fontSize: "18px", whiteSpace: "nowrap" }}>
                    <strong style={{ display: "inline-block", width: "200px" }}>
                      Tax ID
                    </strong>{" "}
                    : &emsp;{note._id}
                  </p>
                  <p style={{ fontSize: "18px", whiteSpace: "nowrap" }}>
                    <strong style={{ display: "inline-block", width: "200px" }}>
                      Tax payment(3 months)
                    </strong>{" "}
                    : &emsp;{(note.payment / 4).toFixed(2)} LKR
                  </p>
                  <p style={{ fontSize: "18px", whiteSpace: "nowrap" }}>
                    <strong style={{ display: "inline-block", width: "200px" }}>
                      Dept. Payment
                    </strong>{" "}
                    : &emsp; {((note.payment * 0.15) / 4).toFixed(2)} LKR
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <strong style={{ display: "inline-block", width: "200px" }}>
                      Total Payment
                    </strong>{" "}
                    : &emsp;
                    {(note.payment / 4 + (note.payment * 0.15) / 4).toFixed(2)}{" "}
                    LKR
                  </p>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    {note.status === "pending" && (
                      <Link to="/payment">
                        <Button
                          style={{
                            width: "150px",
                            color: "#fff",
                            fontSize: "20px",
                            padding: "10px 20px",
                          }}
                        >
                          Pay Now
                        </Button>
                      </Link>
                    )}
                    {note.status === "done" && (
                      <div
                        style={{
                          border: "2px solid green",
                          color: "green",
                          padding: "5px 20px", // Increased horizontal padding
                          borderRadius: "5px",
                          display: "inline-block",
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "24px", // Increased text size
                          transform: "rotate(-5deg)",
                          fontFamily: "Arial, sans-serif", // Sharp font family
                        }}
                      >
                        Paid
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p style={{ fontSize: "18px" }}>
                  Not allocated tax information yet.
                </p>
              )}
            </div>
          </Card>
        </div>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
