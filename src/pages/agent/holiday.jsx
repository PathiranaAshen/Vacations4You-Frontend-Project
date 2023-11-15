import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
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


function Holiday_Home() {
  const [searchText, setSearchText] = useState("");
  const [searchText1, setSearchText1] = useState(0);
  const [searchText2, setSearchText2] = useState(0);
  const [searchText3, setSearchText3] = useState("");
  const [HolidayData, setHolidayData] = useState([]);
  const [user, setUser] = useState("");
  const getData = () => {
    axios
      .get(`http://localhost:5000/agent/get/holiday`)
      .then((res) => {
        console.log(res.data.data);
        setHolidayData(res.data.data);
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
      .get(`http://localhost:5000/agent/search/holiday/destination/${searchText}`)
      .then((response) => {
        if (response.data) {
          setHolidayData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no holiday activities.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching holiday activities:", error);
      });
  }

  async function search_travlers() {
    await axios
      .get(`http://localhost:5000/agent/search/holiday/travlers/${searchText1}`)
      .then((response) => {
        if (response.data) {
          setHolidayData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no holiday activities.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching holiday activities:", error);
      });
  }

  async function search_type() {
    await axios
      .get(`http://localhost:5000/agent/search/holiday/specialty/${searchText3}`)
      .then((response) => {
        if (response.data) {
          setHolidayData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no holiday activities.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching holiday activities:", error);
      });
  }

  async function search_duration() {
    await axios
      .get(`http://localhost:5000/agent/search/holiday/duration/${searchText2}`)
      .then((response) => {
        if (response.data) {
          setHolidayData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no holiday activities.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching holiday activities:", error);
      });
  }

  const filterDataByRating = (ratingValue) => {
    axios
      .get(`http://localhost:5000/agent/get/holiday`)
      .then((res) => {
        const filteredItems = res.data.data.filter(
          (item) => item.rating === parseInt(ratingValue)
        );
        setHolidayData(filteredItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterDataByPrice = (priceValue) => {
    axios
      .get(`http://localhost:5000/agent/get/holiday`)
      .then((res) => {
        const filteredItems = res.data.data.filter(
          (item) => item.price <= priceValue
        );
        setHolidayData(filteredItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const filterDataByDuration= (duration) => {
    axios
      .get(`http://localhost:5000/agent/get/holiday`)
      .then((res) => {
        const filteredItems = res.data.data.filter(
          (item) => item.duration === duration
        );
        setHolidayData(filteredItems);
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
      type: "holiday",
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
                  Holiday
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
                  <label>Holiday Destination</label>
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
                  <label>Holiday Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchText2}
                    onChange={(e) => setSearchText2(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_duration}
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
                  <label>Holiday Travlers</label>
                  <input
                    type="number"
                    className="form-control"
                    value={searchText1}
                    onChange={(e) => setSearchText1(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_travlers}
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
                  <label>Holiday Specialty</label>
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
            <MDBCol sm="2">
              <div className="row pb-3">
                <div className="col">
                  <label>Holiday Rate Filter</label>
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
            <MDBCol sm="2">
              <div className="row pb-3">
                <div className="col">
                  <label>Holiday Price Filter</label>
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
            <MDBCol sm="2">
              <div className="row pb-3">
                <div className="col">
                  <label>Holiday Duration Filter</label>
                  <RangeSlider
                    min={0}
                    max={20}
                    tooltip="auto"
                    onChange={(changeEvent) =>
                      filterDataByDuration(changeEvent.target.value)
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
          {HolidayData ? (
            HolidayData.map((act, index) => (
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
                        <strong>Travlers:</strong> {act.participants}
                      </div>
                      <div>
                        <strong>Type:</strong> {act.specialty}
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

export default Holiday_Home;
