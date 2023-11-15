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
import Swal from "sweetalert2";

function NavBar() {
  const [showBasic, setShowBasic] = useState(false);

  function logout() {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("profile")
        window.location.href = "/";
      }
    });
  }

  function nav() {
    window.location.href = "../agent/cart";
  }

  return (
    <MDBNavbar expand="lg" light bgColor="light">
       <MDBContainer fluid>
        <MDBNavbarBrand
          href="#"
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
                href="#"
              ></MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/agent/activity" style={{fontSize: "20px"}}>
                &nbsp;&nbsp;&nbsp;Activity&nbsp;&nbsp;&nbsp;
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/agent/cruise" style={{fontSize: "20px"}}>
                &nbsp;&nbsp;&nbsp;Cruise&nbsp;&nbsp;&nbsp;
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/agent/holiday" style={{fontSize: "20px"}}>
                &nbsp;&nbsp;&nbsp;Holiday&nbsp;&nbsp;&nbsp;
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/agent/view" style={{fontSize: "20px"}}>
                &nbsp;&nbsp;&nbsp;Bookings&nbsp;&nbsp;&nbsp;
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBIcon fas icon="shopping-cart" size='2x' onClick={nav}/>
          <div className="d-flex input-group w-auto " style={{marginLeft:30}}>
      
            <MDBBtn  size="lg"  onClick={logout} color='warning'>
              Logout
            </MDBBtn>
          </div>
        </MDBCollapse>


        
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;