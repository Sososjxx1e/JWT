import "./login.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();

  const handleCreateNewAccount = () => {
    history.push("/register");
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
                className="form-control input-height "
                placeholder="Email address or phone number"
                type="text"
              ></input>
              <input
                className="form-control input-height "
                placeholder="Password"
                type="password"
              ></input>
              <button className="btn btn-primary" type="submit">
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
