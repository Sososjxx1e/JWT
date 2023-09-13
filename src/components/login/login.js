import { useEffect, useLayoutEffect, useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../registers/userServices";
import { useContext } from "react";
import { UserContext } from "../../context/Usercontext";

const Login = (props) => {
  const [valueLogin, setValueLogin] = useState("");
  const [valuePassword, setvaluePassword] = useState("");
  const { login } = useContext(UserContext);

  const [objCheckinput, setObjcheckinput] = useState({
    validEmail: true,
    validPassword: true,
  });
  const history = useHistory();

  const handleValidation = () => {
    const errors = {
      validEmail: valueLogin.trim() !== "",
      validPassword: valuePassword.trim() !== "",
    };
    setObjcheckinput(errors);
    return Object.values(errors).every(Boolean);
  };
  const handleOnclick = async () => {
    if (!handleValidation()) {
      alert("chua nhạp thông tin đay dủ");
      return;
    }
    let res = await loginUser(valueLogin, valuePassword);
    if (res && +res.EC === 0) {
      alert("dăng nhập thành công");
      let data = {
        isauthentication: true,
        token: res.DT.access_token,
        account: {
          groupwithrole: res.DT.groupwithrole,
          email: res.DT.email,
          username: res.DT.username,
        },
      };

      login(data);
      localStorage.setItem("jwt", res.DT.access_token);

      history.push("/users");
      // window.location.reload();
    }
    if (res && +res.EC !== 0) {
      alert(res.EM);
    }
    console.log(res);
  };
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  const handlePressenter = (e) => {
    if (e.keyCode === 13 && e.key === "Enter") {
      handleOnclick();
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="container">
          <div className="row px-3 px-sm-0">
            <div className="content-left col-sm-5 col-md-7 ">
              <div className="brand text-center text-sm-start mb-2 mb-sm-0">
                Viet Tran
              </div>
              <div className="detail d-none d-sm-block">
                VietTran help you collect and share with people in your life.
              </div>
            </div>
            <div className="content-right col-sm-7 col-md-5 col-12 d-flex flex-column gap-3 py-3 shadow p-3 mb-5 bg-body rounded">
              <input
                className={
                  objCheckinput.validEmail
                    ? "form-control input-height"
                    : " form-control is-invalid"
                }
                placeholder="Email address or phone number"
                type="text"
                value={valueLogin}
                required
                onChange={(event) => {
                  setValueLogin(event.target.value);
                }}
              ></input>
              {!objCheckinput.validEmail && (
                <div className="invalid-feedback">
                  Please enter email or phone
                </div>
              )}
              <input
                className={
                  objCheckinput.validPassword
                    ? "form-control input-height"
                    : " form-control is-invalid"
                }
                placeholder="Password"
                type="password"
                value={valuePassword}
                required
                onChange={(event) => {
                  setvaluePassword(event.target.value);
                }}
                onKeyDown={(e) => handlePressenter(e)}
              ></input>
              {!objCheckinput.validPassword && (
                <div className="invalid-feedback">Please enter password</div>
              )}
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  handleOnclick();
                }}
              >
                Login
              </button>
              <div className="w-100 d-flex justify-content-center">
                <span>
                  <a href="adasd" className=" forgot-pass">
                    forgotten password?
                  </a>
                </span>
              </div>
              <hr className="my-3 "></hr>
              <div className="d-flex justify-content-center mb-2">
                <button
                  className="btn btn-success  button-green"
                  onClick={() => handleCreateNewAccount()}
                >
                  Create a new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
