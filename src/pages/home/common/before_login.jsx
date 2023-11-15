import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { logo } from "../../../assets/assets"

function NavBar() {
  const [showBasic, setShowBasic] = useState(false);
  function login_now() {
    window.location.href = "./login";
  }

  return (
    <MDBNavbar expand="lg" light bgColor="light">
       <MDBContainer fluid>
        <MDBNavbarBrand
          href="/"
          style={{ fontSize: "28px" }}
          className="fw-bold"
        >
          <img src={logo} height="25" alt="logo" loading="lazy" />
              Vacations4You
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar  show={showBasic} >
          <MDBNavbarNav className=" mb-2 justify-content-center" >
            <MDBNavbarItem>
              <MDBNavbarLink
                active
                aria-current="page"
                href="/"
              ></MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/" style={{fontSize: "20px"}}>
                &nbsp;&nbsp;&nbsp;Home&nbsp;&nbsp;&nbsp;
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="./About" style={{fontSize: "20px"}}>
                &nbsp;&nbsp;&nbsp;About&nbsp;&nbsp;&nbsp;
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/Contact" style={{fontSize: "20px"}}>
                &nbsp;&nbsp;&nbsp;Contact&nbsp;&nbsp;&nbsp;
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/Terms" style={{fontSize: "20px"}}>
                &nbsp;&nbsp;&nbsp;Terms & Condition&nbsp;&nbsp;&nbsp;
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <div className="d-flex input-group w-auto">
            <MDBBtn color='success' size="lg" onClick={login_now}>
              Login
            </MDBBtn>
          </div>
        </MDBCollapse>


        
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;
