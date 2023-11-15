import React from "react";
import { bg4 } from "../../assets/assets";
import NavBar from "./common/before_login";
import Footer from "./common/footer";

function Contact() {
  return (
    <>
      <NavBar />
      <div className="mb-5 bg-dark">
        <div
          className="P-5 text-center"
          style={{ paddingTop: "5%", paddingBottom: "5%" }}
        >
          <h1
            style={{ fontSize: "60px", letterSpacing: "1px" }}
            className="text-warning"
          >
            CONTACT US
          </h1>
          <span style={{ letterSpacing: "3px" }}   className="text-warning">
            Home / Contact Us
          </span>
        </div>
      </div>

      <section style={{ paddingTop: "7%", paddingBottom: "20%" }}>
        <div className="container" style={{ paddingTop: "2%" }}>
          <div className="row" style={{ paddingTop: "5%" }}>
            <div className="col-5 pt-5">
              <img src={bg4} style={{ width: "70%" }} />
            </div>
            <div className="col-7">
              <form
                className="mt-5 p-5 rounded "
                style={{ backgroundColor: "#EAE8DB" }}
              >
                <h2 className="text-center text-uppercase text-decoration-underline">
                  Contact Form
                </h2>
                <div className="mb-3 mt-5">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                  ></textarea>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default Contact;
