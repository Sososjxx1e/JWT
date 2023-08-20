import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function Nav(props) {
  return (
    <>
      <div className="topnav">
        <NavLink to="/" exact>
          home
        </NavLink>
        <NavLink to="/news">news12</NavLink>
        <NavLink to="/contract">contract</NavLink>
        <NavLink to="/about">about</NavLink>
      </div>
    </>
  );
}
