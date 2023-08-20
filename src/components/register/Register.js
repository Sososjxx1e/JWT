import "./Register.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
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
                  className="form-control input-height "
                  placeholder="Username"
                  type="text"
                ></input>
              </div>
              <div className="form-group">
                <label>email:</label>
                <input
                  className="form-control input-height "
                  placeholder="Email address or phone number"
                  type="email"
                ></input>
              </div>
              <div className="form-group">
                <label>PhoneNumber:</label>
                <input
                  className="form-control input-height "
                  placeholder=" phone number"
                  type="text"
                ></input>
              </div>
              <div className="form-group">
                <label>password:</label>
                <input
                  className="form-control input-height "
                  placeholder="Password"
                  type="password"
                ></input>
              </div>
              <div className="form-group">
                <label>Re-enter password:</label>
                <input
                  className="form-control input-height "
                  placeholder="Re-enter Password"
                  type="password"
                ></input>
              </div>
              <button className="btn btn-primary" type="submit">
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
