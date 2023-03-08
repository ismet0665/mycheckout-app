import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/favicon.png";
// a ları NavLink formatına çevirdik. href yerine to ekledik.
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-highlight border-bottom  border-5 border-dark fw-bolder">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new-product">
                New Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product-list">
                Product List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
