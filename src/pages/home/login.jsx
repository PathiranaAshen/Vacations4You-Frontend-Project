import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "./common/footer";
import NavBar from "./common/before_login";
import { b4 } from "../../assets/assets";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  useEffect(() => {
    const storedObject = localStorage.getItem("profile");
    if (storedObject) {
      let user = JSON.parse(storedObject);

      if (user.role === "Admin") {
        window.location.href = "../admin/dashboard";
      }
      if (user.role === "Office") {
        window.location.href = "../office/dashboard";
      }
      if (userrole === "Agent") {
        window.location.href = "../agent/activity";
      }
    }

  }, []);

  const handleLogin = () => {
    // Create an object with the login data
    const loginData = {
      email: email,
      password: password,
    };

    // Send a POST request to perform the login
    axios
      .post("http://localhost:5000/auth/login", loginData)
      .then((response) => {
        // Handle success, display a success message using SweetAlert 2
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Login successful!",
        }).then(() => {
          localStorage.setItem("profile", JSON.stringify(response.data.data));
          if (response.data.data.role === "Admin") {
            window.location.href = "../admin/dashboard";
          }
          if (response.data.data.role === "Office") {
            window.location.href = "../office/dashboard";
          }
          if (response.data.data.role === "Agent") {
            window.location.href = "../agent/activity";
          }
        });
        // Clear the form after successful login
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Login failed. Invalid email or password.",
        });
        // Handle error, display an error message or perform any other action
        console.error("Login failed:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundImage: "url(" + b4 + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          marginTop: 2,
          paddingBottom: 300,
          paddingTop: "5%",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-5">
              <div className="card">
                <div className="card-body">
                  <div>
                    <h3 className="text-center text-uppercase text-decoration-underline">
                      Login
                    </h3>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passsword">Password :</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <MDBBtn
                        type="submit"
                        className="btn btn-dark shadow-0"
                        onClick={handleLogin}
                      >
                        Login
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
