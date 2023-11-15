import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardText,
} from "mdb-react-ui-kit";
import Footer from "./common/footer";
import NavBar from "./common/before_login";
import {
  b1,
  b2,
  b3,
  b4,
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
} from "../../assets/assets";
function Home() {
  return (
    <>
      <NavBar />
      <div
        style={{
          backgroundImage: "url(" + b4 + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          marginTop: 2,
          paddingBottom: 300,
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
                <MDBRow style={{ fontSize: 40, marginLeft: "10%" }}>
                  Discover The Colorful World
                </MDBRow>
                <MDBRow style={{ textAlign: "center", marginLeft: "-10%" }}>
                  <hr />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla pulvinar non neque vel scelerisque. Mauris ut ultrices
                    quam. Vestibulum eget turpis vel turpis finibus congue.
                    Donec varius viverra eros posuere tincidunt. Sed tincidunt
                    malesuada tellus eu lobortis. Etiam auctor lacus eu justo
                    lacinia gravida. Orci varius natoque penatibus et magnis dis
                    parturient montes
                  </p>
                </MDBRow>
                <MDBRow
                  style={{
                    fontSize: 50,
                    textAlign: "center",
                    marginLeft: "23%",
                    marginTop: "2%",
                  }}
                >
                  Vacations4You
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <section style={{ paddingTop: "5%", paddingBottom: "2%" }}>
        <div className="container-fluid">
          <MDBRow style={{ marginLeft: "5%" }}>
            <MDBCol sm="2"></MDBCol>

            <MDBCol sm="3">
              <figure className="figure">
                <img
                  src={bg1}
                  className="figure-img  rounded shadow-3 mb-3"
                  height="200px"
                  alt="logo"
                  loading="lazy"
                />
                <figcaption
                  className="figure-caption"
                  style={{ fontWeight: "bold" }}
                >
                  Best Policy
                </figcaption>
                Simple policies
              </figure>
            </MDBCol>
            <MDBCol sm="3">
              <figure className="figure">
                <img
                  src={bg2}
                  className="figure-img  rounded shadow-3 mb-3"
                  height="200px"
                  alt="logo"
                  loading="lazy"
                />
                <figcaption
                  className="figure-caption"
                  style={{ fontWeight: "bold" }}
                >
                  Access to All Events
                </figcaption>
                Many events
              </figure>
            </MDBCol>
            <MDBCol sm="1">
              <figure className="figure">
                <img
                  src={bg3}
                  className="figure-img  rounded shadow-3 mb-3"
                  height="200px"
                  alt="logo"
                  loading="lazy"
                />
                <figcaption
                  className="figure-caption"
                  style={{ fontWeight: "bold" }}
                >
                  Travel Guide
                </figcaption>
                Provide assistance
              </figure>
            </MDBCol>
          </MDBRow>
        </div>
      </section>
      <section style={{ paddingBottom: "5%" }}>
        <div className="container-fluid">
          <MDBRow style={{ marginLeft: "5%" }}>
            <MDBCol sm="2"></MDBCol>

            <MDBCol sm="3">
              <figure className="figure">
                <img
                  src={bg4}
                  className="figure-img  rounded shadow-3 mb-3"
                  height="200px"
                  alt="logo"
                  loading="lazy"
                />
                <figcaption
                  className="figure-caption"
                  style={{ fontWeight: "bold" }}
                >
                  Best Prices
                </figcaption>
                Low cost tours
              </figure>
            </MDBCol>
            <MDBCol sm="3">
              <figure className="figure">
                <img
                  src={bg5}
                  className="figure-img  rounded shadow-3 mb-3"
                  height="200px"
                  alt="logo"
                  loading="lazy"
                />
                <figcaption
                  className="figure-caption"
                  style={{ fontWeight: "bold" }}
                >
                  Easy Tour Booking
                </figcaption>
                Easy booking guide
              </figure>
            </MDBCol>
            <MDBCol sm="1">
              <figure className="figure">
                <img
                  src={bg6}
                  className="figure-img  rounded shadow-3 mb-3"
                  height="200px"
                  alt="logo"
                  loading="lazy"
                />
                <figcaption
                  className="figure-caption"
                  style={{ fontWeight: "bold" }}
                >
                  Travel Safty
                </figcaption>
                Ensure safty of the customer
              </figure>
            </MDBCol>
          </MDBRow>
        </div>
      </section>
      <div className="container" style={{ paddingTop: "4%" }}>
        <hr />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31687.80372271748!2d79.88771603549692!3d6.893537958746704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25990379a8a4f%3A0x4b887a5266410b49!2sSri%20Jayawardenepura%20Kotte!5e0!3m2!1sen!2slk!4v1691778354738!5m2!1sen!2slk"
          width="1300"
          height="370"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </>
  );
}

export default Home;
