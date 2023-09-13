import { useEffect, useState } from "react";
import "./User.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { fetchGroup } from "../../registers/groupServices";
import { createNewUser } from "../../registers/userServices";

import * as _ from "lodash";

const ModalUser = (props) => {
  const { showModalUser, handleClose, action, dataModal } = props;
  const [userGroup, setUserGroup] = useState([]);

  const data = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const checkValidInput = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const ErrorMessage = {
    email: "",
    phone: "",
  };
  const [defaultUserData, setDefaultUserData] = useState(data);
  const [isValidInput, setIsValidInput] = useState(checkValidInput);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage);

  useEffect(() => {
    getGroup();
    console.log("check:", userGroup);
  }, []);

  const getGroup = async () => {
    let response = await fetchGroup();

    if (response && response.EC === 0) {
      setUserGroup(response.DT);
      if (response.DT && response.DT.length > 0) {
        let group = response.DT;

        setDefaultUserData((prevUserData) => ({
          ...prevUserData,
          group: group[0].id,
          sex: "Male",
        }));
      }
    }
  };
  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(defaultUserData);
    _userData[name] = value;
    setDefaultUserData(_userData);
  };

  const vadidateInput = () => {
    setIsValidInput(checkValidInput);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!defaultUserData[arr[i]]) {
        alert(`empty input ${arr[i]}`);
        let _validInput = _.cloneDeep(checkValidInput);
        _validInput[arr[i]] = false;
        setIsValidInput(_validInput);
        check = false;
        break;
      }
    }

    return check;
  };

  const handlConfirmUser = async () => {
    let check = vadidateInput();
    if (check === true) {
      let res = await createNewUser(defaultUserData);
      if (res && res.EC === 0) {
        handleClose();
      }

      if (res && (res.DT === "email" || res.DT === "phone")) {
        let _errorInput = _.cloneDeep(isValidInput);
        _errorInput[res.DT] = false;

        setErrorMessage({
          ...errorMessage,
          [res.DT]: res.EM,
        });

        setIsValidInput(_errorInput);
        alert(res.EM);
      }
    }
  };
  return (
    <>
      <Modal
        show={showModalUser}
        onHide={handleClose}
        className="container-modal col-12 col-sm-6"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 ">
              <Form.Label>
                Email address<span className="red-text">(*)</span>
              </Form.Label>
              <Form.Control
                className={
                  isValidInput.email
                    ? "form-control"
                    : "form control is-invalid"
                }
                defaultValue={data.email}
                onChange={(e) => {
                  handleOnChangeInput(e.target.value, "email");
                }}
                type="email"
                placeholder="email"
                autoFocus
              />
              {errorMessage.email && (
                <div className="text-danger">{errorMessage.email}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                phone number:<span className="red-text">(*)</span>
              </Form.Label>
              <Form.Control
                className={
                  isValidInput.phone
                    ? "form-control"
                    : "form control is-invalid"
                }
                defaultValue={data.phone}
                type="text"
                onChange={(e) => {
                  handleOnChangeInput(e.target.value, "phone");
                }}
                placeholder="phone"
                autoFocus
              />
              {errorMessage.phone && (
                <div className="text-danger">{errorMessage.phone}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Username :<span className="red-text">(*)</span>
              </Form.Label>
              <Form.Control
                defaultValue={data.username}
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  handleOnChangeInput(e.target.value, "username");
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                address:<span className="red-text">(*)</span>
              </Form.Label>
              <Form.Control
                defaultValue={data.address}
                type="text"
                onChange={(e) => {
                  handleOnChangeInput(e.target.value, "address");
                }}
                placeholder="address"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                password:<span className="red-text">(*)</span>
              </Form.Label>
              <Form.Control
                className={
                  isValidInput.password
                    ? "form-control"
                    : "form control is-invalid"
                }
                defaultValue={data.password}
                type="password"
                onChange={(e) => {
                  handleOnChangeInput(e.target.value, "password");
                }}
                placeholder="password"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                gender:<span className="red-text">(*)</span>
              </Form.Label>
              <select
                className="form-select"
                onChange={(e) => {
                  handleOnChangeInput(e.target.value, "sex");
                }}
              >
                <option defaultValue="Male">Male</option>
                <option value="Fe-Male">Fe-Male</option>
                <option value="Other">Other</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                group:<span className="red-text">(*)</span>
              </Form.Label>
              <select
                className={
                  isValidInput.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(e) => {
                  handleOnChangeInput(e.target.value, "group");
                }}
                value={defaultUserData.group} // Đặt giá trị mặc định từ defaultUserData
              >
                {userGroup &&
                  userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlConfirmUser()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
