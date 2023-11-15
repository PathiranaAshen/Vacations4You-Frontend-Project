import React, { useState, useEffect } from "react";
import "../../../App.css";
import { MDBIcon } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import {logo} from "../../../assets/assets"

function NavBar() {
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


  function main_dashboard() {
    window.location.href = "/office/dashboard";
  }

  return (
    <div>
      <header>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar  bg-white"
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <div
                style={{ cursor: "pointer" }}
                onClick={main_dashboard}
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Main dashboard</span>
              </div>

            
              <a
                href="/office/cruise"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Cruise</span>
              </a>

              <a
                href="/office/activity"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Activity</span>
              </a>


              <a
                href="/office/holiday"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Holiday</span>
              </a>


           
            </div>
          </div>
        </nav>
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <a className="navbar-brand text-uppercase" >
              <img src={logo} height="25" alt="logo" loading="lazy" />
              Vacations4You
            </a>

            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item me-3 me-lg-0" onClick={logout}>
                  <MDBIcon fas icon="sign-out-alt" />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
