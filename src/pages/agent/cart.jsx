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

function Cart() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  const getData = () => {
    axios
      .get(`http://localhost:5000/agent/cart/get/` + user.userId)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const storedObject = localStorage.getItem("profile");
    if (storedObject) {
      setUser(JSON.parse(storedObject));
      axios
        .get(
          `http://localhost:5000/agent/cart/get/` +
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

  async function removecart(act) {
    await axios
      .delete(`http://localhost:5000/agent/cart/delete/` + act._id)
      .then((response) => {
        if (response.data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Remove from Cart.",
          }).then(getData());
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Error.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
    
    
  function cart(act) {
      localStorage.setItem("cart", JSON.stringify(act))
      window.location.href = "../agent/booking";
  }

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
                  Shoping Cart
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
                    >
                      
                    </MDBRipple>
                    <MDBCardBody>
                      <MDBCardTitle>{act.name}</MDBCardTitle>

                      <div>
                        <strong>Type:</strong> {act.type}
                      </div>

                      <br />
                      <MDBBtn onClick={() => removecart(act)} color='danger'>Remove</MDBBtn>
                      <br />
                      <br />
                      <br />
                      <MDBBtn onClick={() => cart(act)}  color='success'>Check Out</MDBBtn>
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

export default Cart;
