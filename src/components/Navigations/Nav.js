import React, { useEffect, useState } from "react";
import "./Nav.scss";

import {
  NavLink,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import { UserContext } from "../../context/Usercontext";

export default function Nav(props) {
  const { user } = useContext(UserContext);
  const location = useLocation();
  if ((user && user.isauthentication === true) || location.pathname === "/") {
    return (
      <>
        <div className="topnav">
          <NavLink to="/" exact>
            home
          </NavLink>
          <NavLink to="/news">news</NavLink>
          <NavLink to="/users">user</NavLink>
          <NavLink to="/project">project</NavLink>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
