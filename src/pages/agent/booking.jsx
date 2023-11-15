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
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const MyForm = ({ condition1 ,isValid,dirty}) => {
  if (condition1=="cruise") {
    return (<><label htmlFor="name">Name</label>
      <Field
        type="text"
        name="name"
        id="name"
        className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
      <ErrorMessage
        name="name"
        component="div"
        className="text-danger" />
    <div className="form-group  mb-3">
        <label htmlFor="email">
          email
        </label>
        <Field
          type="email"
          name="email"
          id="email"
          className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
        <ErrorMessage
          name="email"
          component="div"
          className="text-danger" />
      </div><div className="form-group  mb-3">
        <label htmlFor="address">Address</label>
        <Field
          type="text"
          name="address"
          id="address"
          className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
        <ErrorMessage
          name="address"
          component="div"
          className="text-danger" />
      </div><div className="form-group">
        <label htmlFor="payment">Payment</label>
        <Field
          as="select"
          name="payment"
          id="payment"
          style={{ width: "600px" }}
          className="form-control"
        >
          <option value="">Select a Payment method</option>
          <option value="visa">Visa Card</option>
          <option value="master">Master Card</option>
          <option value="bank">Bank</option>
        </Field>
        <ErrorMessage
          name="payment"
          component="div"
          className="text-danger" />
      </div><div className="form-group">
        <label htmlFor="meal">Meal</label>
        <Field
          as="select"
          name="meal"
          id="meal"
          style={{ width: "600px" }}
          className="form-control"
        >
          <option value="">Select Meal</option>
          <option value="full">Full</option>
          <option value="half">Half</option>
          <option value="course">One Course</option>
        </Field>
        <ErrorMessage
          name="payment"
          component="div"
          className="text-danger" />
      </div><div className="form-group">
        <label htmlFor="cabin">Cabin</label>
        <Field
          as="select"
          name="cabin"
          id="cabin"
          style={{ width: "600px" }}
          className="form-control"
        >
          <option value="">Select Cabin</option>
          <option value="first">First Class</option>
          <option value="second">Second Class</option>
          <option value="eco">Economy</option>
        </Field>
        <ErrorMessage
          name="cabin"
          component="div"
          className="text-danger" />
      </div><div className="form-group  mb-3">
        <label htmlFor="age">Age</label>
        <Field
          type="number"
          name="age"
          id="age"
          className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
        <ErrorMessage
          name="age"
          component="div"
          className="text-danger" />
      </div><div className="form-group  mb-3">
        <label htmlFor="participants">Participants</label>
        <Field
          type="text"
          name="participants"
          id="participants"
          className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
        <ErrorMessage
          name="participants"
          component="div"
          className="text-danger" />
      </div></> )
  }  else {
    return (<><label htmlFor="name">Name</label>
      <Field
        type="text"
        name="name"
        id="name"
        className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
      <ErrorMessage
        name="name"
        component="div"
        className="text-danger" />
    <div className="form-group  mb-3">
        <label htmlFor="email">
          email
        </label>
        <Field
          type="email"
          name="email"
          id="email"
          className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
        <ErrorMessage
          name="email"
          component="div"
          className="text-danger" />
      </div><div className="form-group  mb-3">
        <label htmlFor="address">Address</label>
        <Field
          type="text"
          name="address"
          id="address"
          className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
        <ErrorMessage
          name="address"
          component="div"
          className="text-danger" />
      </div><div className="form-group">
        <label htmlFor="payment">Payment</label>
        <Field
          as="select"
          name="payment"
          id="payment"
          style={{ width: "600px" }}
          className="form-control"
        >
          <option value="">Select a Payment method</option>
          <option value="visa">Visa Card</option>
          <option value="master">Master Card</option>
          <option value="bank">Bank</option>
        </Field>
        <ErrorMessage
          name="payment"
          component="div"
          className="text-danger" />
      </div><div className="form-group  mb-3">
        <label htmlFor="age">Age</label>
        <Field
          type="number"
          name="age"
          id="age"
          className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
        <ErrorMessage
          name="age"
          component="div"
          className="text-danger" />
      </div><div className="form-group  mb-3">
        <label htmlFor="participants">Participants</label>
        <Field
          type="text"
          name="participants"
          id="participants"
          className={`form-control ${dirty && isValid ? "is-valid" : ""}`} />
        <ErrorMessage
          name="participants"
          component="div"
          className="text-danger" />
      </div></> )
  }
};


function Booking() {
  const navigate = useNavigate();
  const [data,setData] = useState("");
  const [user, setUser] = useState("");
  const [item, setItem] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    address: "",
    total: "",
    agent: "",
    package: "",
    cabin: "",
    meal: "",
    age:0,
    participants: 0,
  });

  useEffect(() => {
    const storedObject = localStorage.getItem("profile");
    if (storedObject) {
      setUser(JSON.parse(storedObject));
    }

    const storedObject2 = localStorage.getItem("cart");
    if (storedObject2) {
      setItem(JSON.parse(storedObject2));
      if (JSON.parse(storedObject2).type == "cruise")
      {
        axios
        .get(
          `http://localhost:5000/office/get/cruise/` +
            JSON.parse(storedObject2).act_id
        )
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
        }
      if (JSON.parse(storedObject2).type == "activity")
      {
        axios
        .get(
          `http://localhost:5000/office/get/activity/` +
            JSON.parse(storedObject2).act_id
        )
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
          }
      if (JSON.parse(storedObject2).type == "holiday")
      {
        axios
        .get(
          `http://localhost:5000/office/get/holiday/` +
            JSON.parse(storedObject2).act_id
        )
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
          }
      
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {

    
    let dt = {
      name: values.name,
      email: values.email,
      address: values.address,
      total: data.price,
      agent: item.agent,
      package: item.type,
      cabin: values.cabin,
      meal: values.meal,
      participants: values.participants,
      }
     console.log(dt)
    try {
      const response = await axios.post(
        `http://localhost:5000/agent/booking/add`,
        dt
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Booking Completed",
      }).then(() => {
        localStorage.removeItem("cart")
         axios
        .delete(`http://localhost:5000/agent/cart/delete/` + item._id)
        .then((response) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
        navigate("/agent/view")
      });
    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error.",
      });
    }
    setSubmitting(false);
  };


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    email: Yup.string().required("required"),
    address: Yup.string().required("required")
  });


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
                  Booking
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <section style={{ paddingTop: "5%", paddingBottom: "20%" }}>
        <div className="container">
          <p><strong>Total: {data.price}</strong></p>
          <br/>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form>
                <div className="mt-2">
                  <div className="form-group mb-3">
                 
                    <MyForm condition1={item.type} invalid={isValid} dt={dirty} />
                  <MDBBtn
                    className="btn btn-success"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Booking..." : "Book"}
                  </MDBBtn>
                  <MDBBtn
                    className="btn btn-danger"
                    type="button"
                    onClick={() => setBasicEditModal(false)}
                  >
                    Cancel
                  </MDBBtn>
                  </div>
                     </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Booking;
