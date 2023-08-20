import "./App.scss";
import Nav from "./components/Navigations/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/Register";
function App() {
  return (
    <div className="App-Container">
      {/* <Nav /> */}
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
        <Route path="/" exact>
          home
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </div>
  );
}

export default App;
