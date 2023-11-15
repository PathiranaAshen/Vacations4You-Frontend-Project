import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import NavBar from "./common/admin_nav";
import { emp } from "../../assets/assets"
import { useNavigate } from "react-router-dom";

function AdminDash() {
  const navigate = useNavigate();
  function employee() {
     navigate("/admin/employee");
  }


  return (
    <>
      <NavBar />

      <div style={{ backgroundColor: "#E2E7E9" }}>
        <main style={{ marginTop: "58px", backgroundColor: "#D7DDDC" }}>
          <div className="container pt-5">
            <div className="container">
              <h4 className="text-uppercase">Admin Dashboard</h4>
              <hr />
              <br />

              <MDBRow className="pb-5">
                <MDBCol sm="4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={employee}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img src={emp} style={{ width: "43%" }} />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        Employee 
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

export default AdminDash;
