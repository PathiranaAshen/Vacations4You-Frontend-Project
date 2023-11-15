import React from "react";
import NavBar from "./common/before_login";
import Footer from "./common/footer";

const TermsAndConditions = () => {
  return (
    <>
      <NavBar />
      <div
        className="container m-5 rounded"
        style={{ backgroundColor: "#EAE8DB" }}
      >
        <div style={{ padding: "4%" }}>
          <h1 className="text-center">Terms and Conditions</h1>
          <hr />
          <br />
          <h4>Introduction</h4>
          <p> Travel4You Discover The Colorful World</p>
          <br />
          <h4>Service Description</h4>
          <p>Low cos tour service</p>
          <br />

          <h4>Governing Law</h4>
          <p>Act Under government laws</p>
          <br />
          <h4>Changes to Terms</h4>
          <p>Changes will notify within 1 month</p>
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
