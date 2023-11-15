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
import NavBar from "./common/office_nav";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Rating } from "react-simple-star-rating";

function Cruise() {
  const [searchText, setSearchText] = useState("");
  const [cruiseData, setCruiseData] = useState([]);
  const [basicEditModal, setBasicEditModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name:"",
    departureDestination:"",
    arrivalDestination:"",
    departureDate: "",
    arrivalDate: "",
    deck:"",
    cabin: "",
    price: "",
    duration:"",
    provider: "",
    image: "",
  });

  const navigate = useNavigate();

  const getData = () => {
    axios
      .get(`http://localhost:5000/office/get/cruise`)
      .then((res) => {
        setCruiseData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleEditShow = () => setBasicEditModal(!basicEditModal);

  function back() {
    navigate("/office/dashboard");
  }

  function handleViewCruise(data) {
    Swal.fire({
      title: "Cruise Details",
      html: `<div class='text-start'><br/>
                <p><strong>Package Name</strong> ${data.name}</p>
                <p><strong>Departure Destination</strong> ${data.departureDestination}</p>
                <p><strong>Departure Date</strong> ${data.departureDate}</p>
                <p><strong>Provider</strong> ${data.provider}</p>
                <p><strong>Price:</strong> ${data.price}</p>
                </div>
            `,
      confirmButtonText: "OK",
    });
  }

  function handleDeleteCruise(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this Cruise package. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/office/delete/cruise/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The Cruise package has been deleted.", "success");
            getData();
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to delete the Cruise package.", "error");
          });
      }
    });
  }

  function handleEditCruise(data) {
    setInitialValues(data);
    setBasicEditModal(!basicEditModal);
  }

  async function search_Cruise() {
    await axios
      .get(`http://localhost:5000/office/search/cruise/${searchText}`)
      .then((response) => {
        if (response.data) {
          setCruiseData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no Cruise packages.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching Cruise packages:", error);
      });
  }

  function clear() {
    setSearchText("");
    getData();
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    departureDestination: Yup.string().required("required"),
    duration: Yup.string().required("required"),
    price: Yup.number().min(1).required("required"),
  });

  const handleUpdateSubmit = async (values, { setSubmitting }) => {

    try {
      const response = await axios.put(
        `http://localhost:5000/office/update/cruise/${values._id}`,
        values
      );

      setBasicEditModal(false);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Package Updated.",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select a file",
      });
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/office/add/cruise",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Cruise package Added.",
      }).then(() => {
        getData();
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Error",
      });
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: "#E2E7E9" }}>
        <main style={{ marginTop: "58px", backgroundColor: "#D7DDDC" }}>
          <div className="container pt-5 pb-5">
            <div className="container">
              <h4 className="text-uppercase " style={{ color: "black" }}>
                Office Dashboard
              </h4>
              <p style={{ fontSize: "18px", lineHeight: "20px" }}>
                Cruise Package Managing
              </p>
              <hr />
              <div className="text-end">
                
            
                <input type="file" onChange={handleFileChange} />
                <button className="btn btn-dark " onClick={handleUpload}>Add Files</button>
                &nbsp;
                <button className="btn btn-outline-dark" onClick={back}>
                  Back
                </button>
              </div>
              <div className="bg-white p-3 rounded mt-4">
                <h5 className="text-uppercase">Filter Data</h5>
                <hr />
                <div className="row pb-3">
                  <div className="col">
                    <label>Cruise package Name</label>
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
                      onClick={search_Cruise}
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
                      Package Name
                    </th>
                    <th scope="col" className="text-center">
                      Departure Destination
                    </th>
                    <th scope="col" className="text-center">
                       Duration
                    </th>
                    <th scope="col" className="text-center">
                       Provider
                    </th>
                    <th scope="col" className="text-center">
                      Price
                    </th>
                  
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ backgroundColor: "white" }}>
                  {cruiseData ? (
                    cruiseData.map((act, index) => (
                      <tr key={index}>
                        <td>{act.name}</td>
                        <td className="text-center">{act.departureDestination}</td>
                        <td className="text-center">{act.duration}</td>
                        <td className="text-center">{act.provider}</td>
                        <td className="text-center">{act.price}</td>
                      
                        <td className="text-center">
                          <MDBBtn
                            color="danger"
                            outline
                            size="sm"
                            className="shadow-0"
                            onClick={() => handleDeleteCruise(act._id)}
                          >
                            <MDBIcon fas icon="trash" />
                          </MDBBtn>{" "}
                          <MDBBtn
                            color="success"
                            outline
                            size="sm"
                            className="shadow-0"
                            onClick={() => handleViewCruise(act)}
                          >
                            <MDBIcon fas icon="eye" />
                          </MDBBtn>{" "}
                          <MDBBtn
                            color="primary"
                            outline
                            size="sm"
                            className="shadow-0"
                            onClick={() => handleEditCruise(act)}
                          >
                            <MDBIcon fas icon="pen" />
                          </MDBBtn>{" "}
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
                show={basicEditModal}
                setShow={setBasicEditModal}
                tabIndex="-1"
              >
                <MDBModalDialog centered size="lg">
                  <MDBModalContent>
                    <MDBModalHeader className="bg-dark">
                      <MDBModalTitle className="text-warning">
                        Edit Cruise Package
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
                                <label htmlFor="departureDestination">Departure Destination</label>
                                <Field
                                  type="text"
                                  name="departureDestination"
                                  id="departureDestination"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="departureDestination"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                             

                              <div className="form-group  mb-3">
                                <label htmlFor="duration">Duration</label>
                                <Field
                                  type="text"
                                  name="duration"
                                  id="duration"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="duration"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="form-group  mb-3">
                                <label htmlFor="price">Price</label>
                                <Field
                                  type="number"
                                  name="price"
                                  id="price"
                                  className={`form-control ${
                                    dirty && isValid ? "is-valid" : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="price"
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Cruise;
