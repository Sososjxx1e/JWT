import { useEffect, useState, useRef } from "react";
import "./User.scss";
import { fetchAllUser } from "../../registers/userServices";
import ReactPaginate from "react-paginate";
import { deleteUser } from "../../registers/userServices";
import * as _ from "lodash";
import ModalDelete from "./ModalDelete";
import ModalUser from "./Modaluser";
import ModalEditUser from "./ModalEdit";
import { useContext } from "react";
import { UserContext } from "../../context/Usercontext";
const Users = (props) => {
  const [listUser, setListUser] = useState([]);
  const [Currentpage, setCurrentPage] = useState(1);
  const [Currentlimit, setCurrentLimit] = useState(3);
  const [totalPage, setTotalPage] = useState(0);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalCreate, setisShowModalCreate] = useState(false);
  const [isShowModalEdit, setisShowModalEdit] = useState(false);
  const [userGroup, setUserGroup] = useState([]);

  const [dataModal, SetDataModal] = useState({});

  const [dataModalEdit, SetDataModalEdit] = useState({});
  

  useEffect(() => {
    fetchUser();
    console.log();
  }, [Currentpage]);
  const fetchUser = async () => {
    let response = await fetchAllUser(Currentpage, Currentlimit);
    if (response && +response.EC === 0) {
      setTotalPage(response.DT.totalPage);
      setListUser(response.DT.user);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  const handleDeleteUser = async (item) => {
    SetDataModal(item);
    setIsShowModalDelete(true);
  };
  const handleClose = () => {
    fetchUser();
    setIsShowModalDelete(false);
    setisShowModalCreate(false);
    setisShowModalEdit(false);
  };
  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    console.log("check:", res);
    if (res && res.EC === 0) {
      await fetchUser();
      alert(res.EM);
    }
    handleClose();
  };
  const handleShowCreate = () => {
    setisShowModalCreate(true);
  };
  const handleEditUser = (item) => {
    setisShowModalEdit(true);
    SetDataModalEdit(item);
    console.log("check user", item);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="Managers-user-container">
            <div className="user-header">
              <div className="title">
                <h3>table user</h3>
              </div>
              <div className="actions">
                <button className="btn btn-success">refresh</button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowCreate()}
                >
                  add new user
                </button>
              </div>
            </div>
            <div className="users-body">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Username</th>
                    <th scope="col">phone</th>

                    <th scope="col">Group</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {listUser && listUser.length > 0 ? (
                    <>
                      {listUser.map((item, index) => {
                        return (
                          <tr key={`row-${index}`}>
                            <td>
                              {(Currentpage - 1) * Currentlimit + index + 1}
                            </td>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.username}</td>
                            <td>{item.phone}</td>

                            <td>{item.group ? item.group.name : ""}</td>
                            <td>
                              <button
                                className="btn btn-warning mx-3"
                                onClick={() => {
                                  handleEditUser(item);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteUser(item)}
                              >
                                delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="6">none</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="user-footer">
              {totalPage > 0 && (
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={totalPage}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              )}
            </div>
          </div>
          <ModalDelete
            show={isShowModalDelete}
            handleClose={handleClose}
            dataModal={dataModal}
            confirmDeleteUser={confirmDeleteUser}
          />
          <ModalUser
            showModalUser={isShowModalCreate}
            handleClose={handleClose}
          />
          <ModalEditUser
            show={isShowModalEdit}
            handleClose={handleClose}
            dataModal={dataModalEdit}
          />
        </div>
      </div>
    </>
  );
};
export default Users;
