import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import NavBar from "./common/office_nav";
import { bg1,bg2,bg3 } from "../../assets/assets"
import { useNavigate } from "react-router-dom";

function OfficeDash() {
  const navigate = useNavigate();


  function cruise() {
    navigate("/office/cruise");
  }
  
  function holiday() {
    navigate("/office/holiday");
  }
  
  function activity() {
    navigate("/office/activity");
 }


  return (
    <>
      <NavBar />

      <div style={{ backgroundColor: "#E2E7E9" }}>
        <main style={{ marginTop: "58px", backgroundColor: "#D7DDDC" }}>
          <div className="container pt-5">
            <div className="container">
              <h4 className="text-uppercase">Office Dashboard</h4>
              <hr />
              <br />

              <MDBRow className="pb-5">
                <MDBCol sm="4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={cruise}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img src={bg2} style={{ width: "43%" }} />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        Cruise
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>


                <MDBCol sm="4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={holiday}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img src={bg1} style={{ width: "43%" }} />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        Holiday
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>



                <MDBCol sm="4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={activity}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img src={bg3} style={{ width: "43%" }} />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        Activity
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>


              </MDBRow>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default OfficeDash;
