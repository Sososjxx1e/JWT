import "./Register.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { registerNewUser } from "../../registers/userServices";

const Register = (props) => {
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Repass, setRepass] = useState("");
  const defaultObj = {
    isvalidUser: true,
    isValidEmail: true,
    isEmptyEmail: false,
    isValidPhone: true,
    isValidPassword: true,
    isPasswordEmpty: false,
    isRepasswordEmpty: false,
    isValidConfirmPassword: true,
  };
  const [objCheckinput, setObjcheckinput] = useState(defaultObj);

  const handleLogin = () => {
    history.push("/login");
  };

  const checkVadidate = () => {
    let re = /^\S+@\S+\.\S+$/;
    setObjcheckinput(defaultObj);
    if (!Username) {
      alert("CHUA NHẬP USER");
      setObjcheckinput({ ...defaultObj, isvalidUser: false });
    }

    if (!Email) {
      alert("CHƯA NHẬP EMAIL");
      setObjcheckinput({ ...defaultObj, isEmptyEmail: true });
    } else {
      if (!re.test(Email)) {
        setObjcheckinput({ ...defaultObj, isValidEmail: false });
      }
    }
    if (!Phone) {
      alert("CHƯA NHẬP Phone");
      setObjcheckinput({ ...defaultObj, isValidPhone: false });
    }

    if (!Password && !Repass) {
      setObjcheckinput({
        ...defaultObj,
        isPasswordEmpty: true,
        isRepasswordEmpty: true,
      });
    } else if (!Password) {
      setObjcheckinput({
        ...defaultObj,
        isPasswordEmpty: true,
        isRepasswordEmpty: false,
      });
    } else if (!Repass) {
      setObjcheckinput({
        ...defaultObj,
        isPasswordEmpty: false,
        isRepasswordEmpty: true,
      });
    } else if (Password !== Repass) {
      setObjcheckinput({
        ...defaultObj,
        isValidConfirmPassword: false,
      });
    }
    return true;
  };

  const handleRegister = async () => {
    let checkVadidateform = checkVadidate();
    if (checkVadidateform) {
      let response = await registerNewUser(Email, Username, Phone, Password);
      let responsedata = response;
      if (+responsedata.EC === 0) {
        alert(responsedata.EM);
        history.push("/login");
      } else {
        alert(responsedata.EM);
      }
      console.log("check 1;", response);
    }
  };
  return (
    <>
      <div className="Register-container">
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
              <div className="form-group">
                <label>Username:</label>
                <input
                  className={
                    objCheckinput.isvalidUser
                      ? "form-control input-height "
                      : "form-control is-invalid "
                  }
                  placeholder="Username"
                  type="text"
                  value={Username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                ></input>
                {!objCheckinput.isvalidUser && (
                  <div className="invalid-feedback">user empty</div>
                )}
              </div>

              <div className="form-group">
                <label>email:</label>
                <input
                  className={
                    !objCheckinput.isEmptyEmail && objCheckinput.isValidEmail
                      ? "form-control input-height "
                      : "form-control is-invalid"
                  }
                  placeholder="Email address or phone number"
                  type="email"
                  value={Email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                ></input>
                {objCheckinput.isEmptyEmail ? (
                  <div class="invalid-feedback">Email empty</div>
                ) : (
                  <div class="invalid-feedback">email is not valid</div>
                )}
              </div>
              <div className="form-group">
                <label>PhoneNumber:</label>
                <input
                  className={
                    objCheckinput.isValidPhone
                      ? "form-control input-height "
                      : "form-control is-invalid"
                  }
                  placeholder=" phone number"
                  type="text"
                  value={Phone}
                  onChange={(event) => setPhone(event.target.value)}
                ></input>
                {!objCheckinput.isValidPhone && (
                  <div class="invalid-feedback">phone empty</div>
                )}
              </div>
              <div className="form-group">
                <label>password:</label>
                <input
                  className={
                    !objCheckinput.isPasswordEmpty &&
                    objCheckinput.isValidPassword
                      ? "form-control input-height "
                      : "form-control is-invalid"
                  }
                  placeholder="Password"
                  type="password"
                  value={Password}
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
                {objCheckinput.isPasswordEmpty && (
                  <div class="invalid-feedback">password empty</div>
                )}
              </div>
              <div className="form-group">
                <label>Re-enter password:</label>
                <input
                  className={
                    !objCheckinput.isRepasswordEmpty &&
                    objCheckinput.isValidConfirmPassword
                      ? "form-control input-height "
                      : "form-control is-invalid"
                  }
                  placeholder="Re-enter Password"
                  type="password"
                  value={Repass}
                  onChange={(event) => setRepass(event.target.value)}
                ></input>
                {objCheckinput.isRepasswordEmpty ? (
                  <div className="invalid-feedback">confirm password empty</div>
                ) : (
                  <div className="invalid-feedback">
                    password does not math{" "}
                  </div>
                )}
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => handleRegister()}
              >
                Register
              </button>

              <hr className="my-3 "></hr>
              <div className="d-flex justify-content-center mb-2">
                <button
                  className="btn btn-success  button-green"
                  onClick={() => handleLogin()}
                >
                  already have account.Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
