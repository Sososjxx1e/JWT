import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/login/login";
import Register from "../components/register/Register";
import Users from "../components/ManageUsers/User";
import PrivateRoute from "./PrivateRoute";
const Approute = (props) => {
  const Project = () => {
    return <div>project</div>;
  };
  return (
    <>
      <Switch>
        <Route path="/about">about</Route>
        <Route path="/news">news</Route>
        <Route path="/contract">contract</Route>
        <Route path="/Register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/Users" component={Users} />
        <PrivateRoute path="/Project" component={Project} />
        {/* <Route path="/Project">project</Route>
        <Route path="/Users">
          <Users />
        </Route> */}
        <Route path="/" exact>
          home
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};
export default Approute;
