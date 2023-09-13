import "./App.scss";
import Nav from "./components/Navigations/Nav";

import { useEffect, useState } from "react";
import * as _ from "lodash";
import Approute from "./routes/AppRoutes";
import { useContext } from "react";
import { UserContext } from "./context/Usercontext";

function App() {
  const [account, setAccount] = useState({});
  const { user } = useContext(UserContext);

  return (
    <div className="App-Container">
      {user && user.isloading ? (
        <div>loading</div>
      ) : (
        <div>
          <Nav />
          <Approute />
        </div>
      )}
    </div>
  );
}

export default App;
