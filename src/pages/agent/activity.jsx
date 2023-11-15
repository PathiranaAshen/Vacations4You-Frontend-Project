import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import Footer from "./common/footer";
import NavBar from "./common/after_login";
import { b3 } from "../../assets/assets";
import axios from "axios";
import RangeSlider from "react-bootstrap-range-slider";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";


function Activity_Home() {
  const [searchText, setSearchText] = useState("");
  const [searchText1, setSearchText1] = useState();
  const [searchText2, setSearchText2] = useState(0);
  const [searchText3, setSearchText3] = useState("");
  const [activityData, setActivityData] = useState([]);
  const [user, setUser] = useState("");
  const getData = () => {
    axios
      .get(`http://localhost:5000/agent/get/activity`)
      .then((res) => {
        console.log(res.data.data);
        setActivityData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const storedObject = localStorage.getItem("profile");
    if (storedObject) {
      setUser(JSON.parse(storedObject));
    }
    getData();
  }, []);

  async function search_destination() {
    await axios
      .get(`http://localhost:5000/agent/search/activity/destination/${searchText}`)
      .then((response) => {
        if (response.data) {
          setActivityData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no activities.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching activities:", error);
      });
  }

  async function search_date() {
    await axios
      .get(`http://localhost:5000/agent/search/activity/date/${searchText1}`)
      .then((response) => {
        if (response.data) {
          setActivityData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no activities.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching activities:", error);
      });
  }

  async function search_type() {
    await axios
      .get(`http://localhost:5000/agent/search/activity/type/${searchText3}`)
      .then((response) => {
        if (response.data) {
          setActivityData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no activities.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching activities:", error);
      });
  }

  async function search_rating() {
    await axios
      .get(`http://localhost:5000/agent/search/activity/rating/${searchText2}`)
      .then((response) => {
        if (response.data) {
          setActivityData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no activities.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching activities:", error);
      });
  }

  const filterDataByRating = (ratingValue) => {
    axios
      .get(`http://localhost:5000/agent/get/activity`)
      .then((res) => {
        const filteredItems = res.data.data.filter(
          (item) => item.rating === parseInt(ratingValue)
        );
        setActivityData(filteredItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterDataByPrice = (priceValue) => {
    axios
      .get(`http://localhost:5000/agent/get/activity`)
      .then((res) => {
        const filteredItems = res.data.data.filter(
          (item) => item.price <= priceValue
        );
        setActivityData(filteredItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function clear() {
    setSearchText("");
    setSearchText1("");
    setSearchText2("");
    setSearchText3("");
    getData();
  }

  async function cart(act) {
    let data = {
      act_id: act._id,
      agent: user.userId,
      name: act.name,
      type: "activity",
    };
    await axios
      .post(`http://localhost:5000/agent/cart/add`, data)
      .then((response) => {
        if (response.data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Added to Cart.",
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Error.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
                <MDBRow style={{ fontSize: 60, marginLeft: "30%" }}>
                  Activity
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <section style={{ paddingTop: "5%", paddingBottom: "2%" }}>
        <div className="container-fluid">
          <MDBRow>
            <MDBCol sm="2"></MDBCol>
            <MDBCol sm="4">
              <div className="row pb-3">
                <div className="col">
                  <label>Activity Destination</label>
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
                    onClick={search_destination}
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
            </MDBCol>
            <MDBCol sm="4">
              <div className="row pb-3">
                <div className="col">
                  <label>Activity Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={searchText1}
                    onChange={(e) => setSearchText1(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_date}
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
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol sm="2"></MDBCol>
            <MDBCol sm="4">
              <div className="row pb-3">
                <div className="col">
                  <label>Activity Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    value={searchText2}
                    onChange={(e) => setSearchText2(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_rating}
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
            </MDBCol>
            <MDBCol sm="4">
              <div className="row pb-3">
                <div className="col">
                  <label>Activity Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchText3}
                    onChange={(e) => setSearchText3(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_type}
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
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol sm="2"></MDBCol>
            <MDBCol sm="4">
              <div className="row pb-3">
                <div className="col">
                  <label>Activity Rate Filter</label>
                  <RangeSlider
                    min={0}
                    max={5}
                    tooltip="auto"
                    onChange={(changeEvent) =>
                      filterDataByRating(changeEvent.target.value)
                    }
                  />
                </div>
              </div>
            </MDBCol>
            <MDBCol sm="4">
              <div className="row pb-3">
                <div className="col">
                  <label>Activity Price Filter</label>
                  <RangeSlider
                    min={0}
                    max={5000}
                    tooltip="auto"
                    onChange={(changeEvent) =>
                      filterDataByPrice(changeEvent.target.value)
                    }
                  />
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </section>

      <section style={{ paddingTop: "5%", paddingBottom: "20%" }}>
        <div className="container">
          {activityData ? (
            activityData.map((act, index) => (
              <MDBRow key={index} style={{ marginBottom: "20px" }}>
                <MDBCol sm="4"></MDBCol>
                <MDBCol sm="5">
                  <MDBCard>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image hover-overlay"
                    >
                      <MDBCardImage src={act.image} fluid alt="..." />
                      <a>
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        ></div>
                      </a>
                    </MDBRipple>
                    <MDBCardBody>
                      <MDBCardTitle>{act.name}</MDBCardTitle>

                      <div>
                        <strong>Destination:</strong> {act.destination}
                      </div>
                      <div>
                        <strong>Date:</strong> {act.date}
                      </div>
                      <div>
                        <strong>Type:</strong> {act.type}
                      </div>
                      <div>
                        <strong>Price:</strong> {act.price}
                      </div>
                      <Rating initialValue={act.rating} readonly={true} />
                      <br />
                      <MDBBtn onClick={() => cart(act)}>Add</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            ))
          ) : (
            <div>No data</div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Activity_Home;
