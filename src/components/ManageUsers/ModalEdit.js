import { useEffect, useState } from "react";
import "./User.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { fetchGroup } from "../../registers/groupServices";
import { createNewUser } from "../../registers/userServices";
import * as _ from "lodash";
import { updateCurrentUser } from "../../registers/userServices";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const ModalEditUser = (props) => {
  const { show, handleClose, dataModal } = props;
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
  const location = useLocation();
  useEffect(() => {
    if (location && location.pathname !== "/login") {
      getGroup();
    }
  }, []);

  useEffect(() => {
    setDefaultUserData({
      ...dataModal,
      group: dataModal.group ? dataModal.group.id : "",
    });
    console.log(defaultUserData.group);
  }, [dataModal]);

  const getGroup = async () => {
    let response = await fetchGroup();
    if (response && response.data && response.EC === 0) {
      setUserGroup(response.DT);
      if (response.DT && response.DT.length > 0) {
        let group = response.DT;

        setDefaultUserData({
          ...defaultUserData,
          group: group[0].id,
          sex: "Male",
        });
      }
      alert(response.EM);
    }
  };
  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(defaultUserData);
    _userData[name] = value;
    setDefaultUserData(_userData);
  };

  // const vadidateInput = () => {
  //   setIsValidInput(checkValidInput);
  //   let arr = [ "group"];
  //   let check = true;
  //   for (let i = 0; i < arr.length; i++) {
  //     if (!defaultUserData[arr[i]]) {
  //       alert(`empty input ${arr[i]}`);
  //       let _validInput = _.cloneDeep(checkValidInput);
  //       _validInput[arr[i]] = false;
  //       setIsValidInput(_validInput);
  //       check = false;
  //       break;
  //     }
  //   }

  //   return check;
  // };

  const handlEditUser = async () => {
    let res = await updateCurrentUser(defaultUserData);

    if (res && res && res.EC === 0) {
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="container-modal col-12 col-sm-6"
      >
        <Modal.Header closeButton>
          <Modal.Title>EDIT</Modal.Title>
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
                defaultValue={dataModal.email}
                disabled
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
                defaultValue={dataModal.phone}
                type="text"
                disabled
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
                defaultValue={dataModal.username}
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
                defaultValue={dataModal.address}
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
                gender:<span className="red-text">(*)</span>
              </Form.Label>
              <select
                value={defaultUserData.sex}
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
                value={defaultUserData.group ? defaultUserData.group : ""}
                className={
                  isValidInput.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(e) => {
                  handleOnChangeInput(e.target.value, "group");
                }}
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
          <Button variant="primary" onClick={() => handlEditUser()}>
            EDIT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
