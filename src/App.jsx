import { useState, useEffect } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import Home from "./pages/home/home";
import About from "./pages/home/about";
import Contact from "./pages/home/contact";
import Terms from "./pages/home/terms";
import Login from "./pages/home/login";
import Admin_Home from "./pages/admin/admin_home";
import Employee from "./pages/admin/employee";

import Office_Home from "./pages/office/office_home";
import Cruise from "./pages/office/cruise";
import Holiday from "./pages/office/holiday";
import Activity from "./pages/office/activity";

import Activity_Home from "./pages/agent/activity";
import Holiday_Home from "./pages/agent/holiday";
import Cruise_Home from "./pages/agent/cruise";
import Cart from "./pages/agent/cart";
import Book from "./pages/agent/booking";
import View from "./pages/agent/view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, roles }) => {
  let user;
  const storedObject = localStorage.getItem("profile");
  if (storedObject) {
    user = JSON.parse(storedObject);
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute element={<Admin_Home />} roles={["Admin"]} />
          }
        />
        <Route
          path="/admin/employee"
          element={<ProtectedRoute element={<Employee />} roles={["Admin"]} />}
        />

        <Route
          path="/office/dashboard"
          element={
            <ProtectedRoute element={<Office_Home />} roles={["Office"]} />
          }
        />
        <Route
          path="/office/cruise"
          element={<ProtectedRoute element={<Cruise />} roles={["Office"]} />}
        />
        <Route
          path="/office/holiday"
          element={<ProtectedRoute element={<Holiday />} roles={["Office"]} />}
        />
        <Route
          path="/office/activity"
          element={<ProtectedRoute element={<Activity />} roles={["Office"]} />}
        />

        <Route
          path="/agent/activity"
          element={
            <ProtectedRoute element={<Activity_Home />} roles={["Agent"]} />
          }
        />
        <Route
          path="/agent/holiday"
          element={
            <ProtectedRoute element={<Holiday_Home />} roles={["Agent"]} />
          }
        />
        <Route
          path="/agent/cruise"
          element={
            <ProtectedRoute element={<Cruise_Home />} roles={["Agent"]} />
          }
        />
        <Route
          path="/agent/cart"
          element={<ProtectedRoute element={<Cart />} roles={["Agent"]} />}
        />
        <Route
          path="/agent/booking"
          element={<ProtectedRoute element={<Book />} roles={["Agent"]} />}
        />
        <Route
          path="/agent/view"
          element={<ProtectedRoute element={<View />} roles={["Agent"]} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
