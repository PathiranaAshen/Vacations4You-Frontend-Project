import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import Footer from "./common/footer";
import NavBar from "./common/after_login";
import { b3 } from "../../assets/assets";
import axios from "axios";
import Swal from "sweetalert2";

function View() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedObject = localStorage.getItem("profile");
    if (storedObject) {
      setUser(JSON.parse(storedObject));
      axios
        .get(
          `http://localhost:5000/agent/booking/get/` +
            JSON.parse(storedObject).userId
        )
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <NavBar />
      <div
        style={{
          backgroundImage: "url(" + b3 + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          marginTop: 2,
          paddingBottom: 200,
        }}
      >
        <div className="container-fluid">
          <MDBRow>
            <MDBCol sm="4"></MDBCol>
            <MDBCol sm="5">
              <div
                style={{
                  marginTop: "20%",
                  fontWeight: "bolder",
                  color: "white",
                }}
              >
                <MDBRow style={{ fontSize: 60, marginLeft: "20%" }}>
                  View Bookings
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </div>

      <section style={{ paddingTop: "5%", paddingBottom: "20%" }}>
        <div className="container">
          {data ? (
            data.map((act, index) => (
              <MDBRow key={index} style={{ marginBottom: "20px" }}>
                <MDBCol sm="4"></MDBCol>
                <MDBCol sm="5">
                  <MDBCard>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image hover-overlay"
                    ></MDBRipple>
                    <MDBCardBody>
                      <MDBCardTitle>{act.package}</MDBCardTitle>

                      <div>
                        <strong>Customer:</strong> {act.name}
                      </div>
                      <br />
                      <div>
                        <strong>Email:</strong> {act.email}
                      </div>
                      <br />
                      <div>
                        <strong>Total:</strong> {act.total}
                      </div>
                      <br />
                      <div>
                        <strong>Participants:</strong> {act.participants}
                      </div>
                      <br />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            ))
          ) : (
            <div>No data</div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default View;
