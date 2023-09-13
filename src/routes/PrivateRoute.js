import { useDeferredValue, useEffect, useLayoutEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

import { Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/Usercontext";

const PrivateRoute = (props) => {
  
  const { user } = useContext(UserContext);

  if (user && user.isauthentication === true) {
    return (
      <>
        <Route path={props.path} component={props.component}></Route>
      </>
    );
  } else {
    return (
      <>
        <Redirect to="/login"></Redirect>
      </>
    );
  }
};

export default PrivateRoute;
