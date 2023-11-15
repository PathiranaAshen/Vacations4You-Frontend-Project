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


function Cruise_Home() {
  const [searchText, setSearchText] = useState("");
  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState();
  const [searchText3, setSearchText3] = useState();
  const [searchText4, setSearchText4] = useState("");
  const [CruiseData, setCruiseData] = useState([]);
  
  const [user, setUser] = useState("");
  const getData = () => {
    axios
      .get(`http://localhost:5000/agent/get/cruise`)
      .then((res) => {
        console.log(res.data.data);
        setCruiseData(res.data.data);
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


  

  async function search_Ddestination() {
    await axios
      .get(`http://localhost:5000/agent/search/cruise/departure/${searchText}`)
      .then((response) => {
        if (response.data) {
          setCruiseData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no cruise.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching cruise:", error);
      });
  }

  async function search_ADestination() {
    await axios
      .get(`http://localhost:5000/agent/search/cruise/arrival/${searchText1}`)
      .then((response) => {
        if (response.data) {
          setCruiseData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no cruise.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching cruise:", error);
      });
  }

  async function search_DDate() {
    await axios
      .get(`http://localhost:5000/agent/search/cruise/dday/${searchText2}`)
      .then((response) => {
        if (response.data) {
          setCruiseData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no cruise.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching cruise:", error);
      });
  }

  async function search_ADate() {
    await axios
      .get(`http://localhost:5000/agent/search/cruise/aday/${searchText3}`)
      .then((response) => {
        if (response.data) {
          setCruiseData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no cruise.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching cruise:", error);
      });
  }


  async function search_Class() {
    await axios
      .get(`http://localhost:5000/agent/search/cruise/cabin/${searchText4}`)
      .then((response) => {
        if (response.data) {
          setCruiseData(response.data.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "There are no cruise.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching cruise:", error);
      });
  }


  const filterDataByProvider = (provider) => {
    axios
      .get(`http://localhost:5000/agent/get/cruise`)
      .then((res) => {
        const filteredItems = res.data.data.filter(
          (item) => item.provider=== provider
        );
        setCruiseData(filteredItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterDataByPrice = (priceValue) => {
    axios
      .get(`http://localhost:5000/agent/get/cruise`)
      .then((res) => {
        const filteredItems = res.data.data.filter(
          (item) => item.price <= priceValue
        );
        setCruiseData(filteredItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const filterDataByDuration = (duration) => {
    axios
      .get(`http://localhost:5000/agent/get/cruise`)
      .then((res) => {
        const filteredItems = res.data.data.filter(
          (item) => item.duration === duration
        );
        setCruiseData(filteredItems);
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
    setSearchText4("");
    getData();
  }

  async function cart(act) {
    let data = {
      act_id: act._id,
      agent: user.userId,
      name: act.name,
      type: "cruise",
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
                  Cruise
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
                  <label>Cruise Departure Destination</label>
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
                    onClick={search_Ddestination}
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
                  <label>Cruise Departure Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={searchText2}
                    onChange={(e) => setSearchText2(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_DDate}
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
            <MDBCol sm="3">
              <div className="row pb-3">
                <div className="col">
                  <label>Cruise Arrival Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchText1}
                    onChange={(e) => setSearchText1(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_ADestination}
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
            <MDBCol sm="3">
              <div className="row pb-3">
                <div className="col">
                  <label>Cruise Arrival Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={searchText3}
                    onChange={(e) => setSearchText3(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_ADate}
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
            <MDBCol sm="3">
              <div className="row pb-3">
                <div className="col">
                  <label>Cruise Class</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchText4}
                    onChange={(e) => setSearchText4(e.target.value)}
                  />
                </div>
                <div className="col">
                  <br />
                  <button
                    className="btn btn-dark shadow-0"
                    onClick={search_Class}
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
            <MDBCol sm="3">
              <div className="row pb-3">
                <div className="col">
                  <label>Cruise Duration Filter</label>
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
            <MDBCol sm="3">
              <div className="row pb-3">
                <div className="col">
                  <label>Cruise Price Filter</label>
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
            <MDBCol sm="3">
              <div className="row pb-3">
                <div className="col">
                  <label>Cruise Provider Filter</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchText}
                    onChange={(e) => filterDataByProvider(e.target.value)}
                  />
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </section>

      <section style={{ paddingTop: "5%", paddingBottom: "20%" }}>
        <div className="container">
          {CruiseData ? (
            CruiseData.map((act, index) => (
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
                        <strong>Destination:</strong> {act.departureDestination}
                      </div>
                      <div>
                        <strong>Date:</strong> {act.departureDate}
                      </div>
                      <div>
                        <strong>Cabin:</strong> {act.cabin}
                      </div>
                      <div>
                        <strong>Price:</strong> {act.price}
                      </div>
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

export default Cruise_Home;
