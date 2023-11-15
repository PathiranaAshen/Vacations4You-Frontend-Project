import React, { useState, useEffect } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBIcon,
  MDBTableBody,
} from "mdb-react-ui-kit";
import NavBar from "./common/admin_nav";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Employee() {
  const [searchText, setSearchText] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const [basicEditModal, setBasicEditModal] = useState(false);
  const [basicPassModal, setBasicPassModal] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    number: "",
    address: "",
    age: "",
    position: "",
    email: "",
    account: "",
  });

  const [initialPass, setInitialPass] = useState({
    password: "",
    new: "",
  });

  const navigate = useNavigate();

  const getData = () => {
    axios
      .get(`http://localhost:5000/employee/get`)
      .then((res) => {
        console.log(res.data.data);
        setEmployeeData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleShow = () => setBasicModal(!basicModal);
  const toggleEditShow = () => setBasicEditModal(!basicEditModal);
  const togglePassShow = () => setBasicPassModal(!basicPassModal);

  function back() {
    navigate("/admin/dashboard");
  }

  function handleViewEmployee(data) {
    Swal.fire({
      title: "Employee Details",
      html: `<div class='text-start'><br/>
                <p><strong>Full Name:</strong> ${data.name}</p>
                <p><strong>Contact Number:</strong> ${data.number}</p>
                <p><strong>Birth Day:</strong> ${data.age}</p>
                <p><strong>Position:</strong> ${data.position}</p>
                <p><strong>Address:</strong> ${data.address}</p>
                </div>
            `,
      confirmButtonText: "OK",
    });
  }

  function handleDeleteEmployee(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this employee. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/employee/delete/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The employee has been deleted.", "success");
            getData();
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to delete the employee.", "error");
          });
      }
    });
  }

  function handleEditEmployee(data) {
    setInitialValues(data);
    setBasicEditModal(!basicEditModal);
  }

  function handlePassEmployee(data) {
    setInitialValues(data);
    setBasicPassModal(!basicPassModal);
  }

  async function search_emp() {
    await axios
      .get(`http://localhost:5000/employee/search/${searchText}`)
      .then((response) => {
        if (response.data) {
          setEmployeeData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no employees.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching employees:", error);
      });
  }

  function clear() {
    setSearchText("");
    getData();
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    number: Yup.string().required("Number is required"),
    address: Yup.string().required("Address is required"),
    age: Yup.string().required("Birth Day is required"),
    position: Yup.string().required("Position is required"),
    email: Yup.string().required("Email is required"),
  });

  const validationPassSchema = Yup.object().shape({
    password: Yup.string().required("Old password is required"),
    new: Yup.string().required("New Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/employee/add",
        values
      );

      setBasicModal(false);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Employee Created.",
      }).then(() => {
        getData();
      });
    } catch (error) {
      setBasicModal(false);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error.",
      }).then(() => {
        getData();
      });
    }
    setSubmitting(false);
  };

  const handleUpdateSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/employee/update/${values._id}`,
        values
      );

      setBasicEditModal(false);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Employee Updated.",
      }).then(() => {
        getData();
      });
    } catch (error) {
      setBasicEditModal(false);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error.",
      }).then(() => {
        getData();
      });
    }
    setSubmitting(false);
  };

  const handleUpdatePassSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/employee/password/${employeeData[0].account}`,
        values
      );

      setBasicPassModal(false);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Employee Password Updated.",
      }).then(() => {
        getData();
      });
    } catch (error) {
      setBasicPassModal(false);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error.",
      }).then(() => {
        getData();
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: "#E2E7E9" }}>
        <main style={{ marginTop: "58px", backgroundColor: "#D7DDDC" }}>
          <div className="container pt-5 pb-5">
            <div className="container">
              <h4 className="text-uppercase " style={{ color: "black" }}>
                Admin Dashboard
              </h4>
              <p style={{ fontSize: "18px", lineHeight: "20px" }}>
                Employee Managing
              </p>
              <hr />
              <div className="text-end">
                <button className="btn btn-outline-dark" onClick={back}>
                  Back
                </button>
                &nbsp;
                <button className="btn btn-dark " onClick={toggleShow}>
                  Add Employee
                </button>
              </div>
              <div className="bg-white p-3 rounded mt-4">
                <h5 className="text-uppercase">Filter Data</h5>
                <hr />
                <div className="row pb-3">
                  <div className="col">
                    <label>Employee Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <br />
                    <button
                      className="btn btn-dark shadow-0"
                      onClick={search_emp}
                    >
                      Search
                    </button>{" "}
                    <button
                      className="btn btn-outline-dark shadow-0"
                      onClick={clear}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              <MDBTable className="mt-4">
                <MDBTableHead dark>
                  <tr>
                    <th scope="col" className="text-center">
                      Full Name
                    </th>
                    <th scope="col" className="text-center">
                      Contact Number
                    </th>
                    <th scope="col" className="text-center">
                      Birth Day
                    </th>
                    <th scope="col" className="text-center">
                      Position
                    </th>
                    <th scope="col" className="text-center">
                      Address
                    </th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ backgroundColor: "white" }}>
                  {employeeData ? (
                    employeeData.map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.name}</td>
                        <td className="text-center">{employee.number}</td>
                        <td className="text-center">{employee.age}</td>
                        <td className="text-center">{employee.position}</td>
                        <td className="text-center">{employee.address}</td>

                        <td className="text-center">
                          <MDBBtn
                            color="danger"
                            outline
                            size="sm"
                            className="shadow-0"
                            onClick={() => handleDeleteEmployee(employee._id)}
                          >
                            <MDBIcon fas icon="trash" />
                          </MDBBtn>{" "}
                          <MDBBtn
                            color="success"
                            outline
                            size="sm"
                            className="shadow-0"
                            onClick={() => handleViewEmployee(employee)}
                          >
                            <MDBIcon fas icon="eye" />
                          </MDBBtn>{" "}
                          <MDBBtn
                            color="primary"
                            outline
                            size="sm"
                            className="shadow-0"
                            onClick={() => handleEditEmployee(employee)}
                          >
                            <MDBIcon fas icon="pen" />
                          </MDBBtn>{" "}
                          <MDBBtn
                            color="warning"
                            outline
                            size="sm"
                            className="shadow-0"
                            onClick={() => handlePassEmployee(employee)}
                          >
                            <MDBIcon fas icon="lock" />
                          </MDBBtn>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div>No data</div>
                  )}
                </MDBTableBody>
              </MDBTable>
              <MDBModal
                staticBackdrop
                show={basicModal}
                setShow={setBasicModal}
                tabIndex="-1"
              >
                <MDBModalDialog centered size="lg">
                  <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                      <MDBModalTitle className="text-warning">
                        Add New Employee
                      </MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting, isValid, dirty }) => (
                        <Form>
                          <MDBModalBody className="p-4">
                            <div className="mt-2">
                              <div className="form-group mb-3">
                                <label htmlFor="name">Name</label>
                                <Field
                                  type="text"
                                  name="name"
                                  id="name"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="form-group  mb-3">
                                <label htmlFor="number">Contact Number</label>
                                <Field
                                  type="text"
                                  name="number"
                                  id="number"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="number"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                              <div className="form-group  mb-3">
                                <label htmlFor="age">Birth Day</label>
                                <Field
                                  type="date"
                                  name="age"
                                  id="age"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="age"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                              <div className="form-group  mb-3">
                                <label htmlFor="address">Address</label>
                                <Field
                                  type="text"
                                  name="address"
                                  id="address"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="address"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="form-group  mb-3">
                                <label htmlFor="position">Position</label>
                                <Field
                                  as="select"
                                  name="position"
                                  id="position"
                                  style={{ width: "600px" }}
                                  className="form-control"
                                >
                                  <option value="">Select a Position</option>
                                  <option value="Agent">Agent</option>
                                  <option value="Office">Office</option>
                                </Field>
                                <ErrorMessage
                                  name="position"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="form-group  mb-3">
                                <label htmlFor="email">Email</label>
                                <Field
                                  type="email"
                                  name="email"
                                  id="email"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </MDBModalBody>
                          <MDBModalFooter>
                            <MDBBtn
                              className="btn btn-success"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Saving..." : "Save"}
                            </MDBBtn>
                            <MDBBtn
                              className="btn btn-danger"
                              onClick={() => setBasicModal(!basicModal)}
                            >
                              Cancel
                            </MDBBtn>
                          </MDBModalFooter>
                        </Form>
                      )}
                    </Formik>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>

              <MDBModal
                staticBackdrop
                show={basicEditModal}
                setShow={setBasicEditModal}
                tabIndex="-1"
              >
                <MDBModalDialog centered size="lg">
                  <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                      <MDBModalTitle className="text-warning">
                        Edit Employee
                      </MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleEditShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <Formik
                      enableReinitialize={true}
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleUpdateSubmit}
                    >
                      {({ isSubmitting, isValid, dirty }) => (
                        <Form>
                          <MDBModalBody className="p-4">
                            <div className="mt-2">
                              <div className="form-group mb-3">
                                <label htmlFor="name">Name</label>
                                <Field
                                  type="text"
                                  name="name"
                                  id="name"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="form-group  mb-3">
                                <label htmlFor="number">Contact Number</label>
                                <Field
                                  type="text"
                                  name="number"
                                  id="number"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="number"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                              <div className="form-group  mb-3">
                                <label htmlFor="age">Birth Day</label>
                                <Field
                                  type="date"
                                  name="age"
                                  id="age"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="age"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                              <div className="form-group  mb-3">
                                <label htmlFor="address">Address</label>
                                <Field
                                  type="text"
                                  name="address"
                                  id="address"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="address"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="form-group  mb-3">
                                <label htmlFor="position">Position</label>
                                <Field
                                  as="select"
                                  name="position"
                                  id="position"
                                  style={{ width: "600px" }}
                                  className="form-control"
                                >
                                  <option value="">Select a Position</option>
                                  <option value="Agent">Agent</option>
                                  <option value="Office">Office</option>
                                </Field>
                                <ErrorMessage
                                  name="position"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </MDBModalBody>
                          <MDBModalFooter>
                            <MDBBtn
                              className="btn btn-success"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Updating..." : "Update"}
                            </MDBBtn>
                            <MDBBtn
                              className="btn btn-danger"
                              onClick={() => setBasicEditModal(false)}
                            >
                              Cancel
                            </MDBBtn>
                          </MDBModalFooter>
                        </Form>
                      )}
                    </Formik>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>

              <MDBModal
                staticBackdrop
                show={basicPassModal}
                setShow={setBasicPassModal}
                tabIndex="-1"
              >
                <MDBModalDialog centered size="lg">
                  <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                      <MDBModalTitle className="text-warning">
                        Edit Password
                      </MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={togglePassShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <Formik
                      initialValues={initialPass}
                      validationSchema={validationPassSchema}
                      onSubmit={handleUpdatePassSubmit}
                    >
                      {({ isSubmitting, isValid, dirty }) => (
                        <Form>
                          <MDBModalBody className="p-4">
                            <div className="mt-2">
                              <div className="form-group mb-3">
                                <label htmlFor="password">Old Password</label>
                                <Field
                                  type="text"
                                  name="password"
                                  id="password"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="form-group  mb-3">
                                <label htmlFor="new">New Password</label>
                                <Field
                                  type="text"
                                  name="new"
                                  id="new"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="new"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </MDBModalBody>
                          <MDBModalFooter>
                            <MDBBtn
                              className="btn btn-success"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Updating..." : "Update"}
                            </MDBBtn>
                            <MDBBtn
                              className="btn btn-danger"
                              type="button"
                              onClick={() => setBasicPassModal(false)}
                            >
                              Cancel
                            </MDBBtn>
                          </MDBModalFooter>
                        </Form>
                      )}
                    </Formik>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Employee;
