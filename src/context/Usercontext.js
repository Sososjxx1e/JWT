import React, { useEffect } from "react";
import { useState, createContext } from "react";
import { getUserAccount } from "../registers/userServices";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const UserContext = createContext(null);
const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const location = useLocation();
  const userDefault = {
    isauthentication: false,
    isloading: true,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(userDefault);

  // Login updates the user data with a name parameter
  const login = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };
  const fetchUser = async () => {
    let res = await getUserAccount();
    if (res && res.EC === 0) {
      let data = {
        isauthentication: true,
        isloading: false,
        token: res.DT.access_token,
        account: {
          groupwithrole: res.DT.groupwithrole,
          email: res.DT.email,
          username: res.DT.username,
        },
      };
      setTimeout(() => {
        setUser(data);
      }, 3 * 1000);
    } else {
      setUser({ ...userDefault, isloading: false });
    }
  };
  useEffect(() => {
    if (
      (location && location.pathname !== "/") ||
      location.pathname !== "/login"
    ) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
