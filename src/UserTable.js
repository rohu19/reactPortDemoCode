import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner, Modal, Button } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./UserTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    secondarySchool: "",
    higherSecondarySchool: "",
    graduation: "",
    profession: "",
    nativeLocation: "",
    currentLocation: "",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:9091/port/page?page=${currentPage}&size=${pageSize}`
      );
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const handleUpdate = (user) => {
    setSelectedUserId(user.id);
    setUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      age: user.age,
      secondarySchool: user.profile.secondarySchool,
      higherSecondarySchool: user.profile.higherSecondarySchool,
      graduation: user.profile.graduation,
      profession: user.profile.profession,
      nativeLocation: user.profile.nativeLocation,
      currentLocation: user.profile.currentLocation,
    });
    setShowUpdateModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9091/port/delete/${id}`);
      // After successful deletion, fetch users again to update the table
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedUserId(null);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      age: "",
      secondarySchool: "",
      higherSecondarySchool: "",
      graduation: "",
      profession: "",
      nativeLocation: "",
      currentLocation: "",
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:9091/port/update/${selectedUserId}`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        gender: userData.gender,
        age: userData.age,
        profile: {
          secondarySchool: userData.secondarySchool,
          higherSecondarySchool: userData.higherSecondarySchool,
          graduation: userData.graduation,
          profession: userData.profession,
          nativeLocation: userData.nativeLocation,
          currentLocation: userData.currentLocation,
        },
      });

      setShowUpdateModal(false);
      setSelectedUserId(null);

      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const paginationButtons = [];
  for (let i = 0; i < totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={currentPage === i ? "active" : ""}
        onClick={() => handlePageChange(i)}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className="user-table-container">
      <div className="user-table">
        <h2>All Users</h2>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Secondary School</th>
                <th>Higher Secondary School</th>
                <th>Graduation</th>
                <th>Profession</th>
                <th>Native Location</th>
                <th>Current Location</th>
                <th>Actions</th> {/* Add a new column for actions */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>{user.profile.secondarySchool}</td>
                  <td>{user.profile.higherSecondarySchool}</td>
                  <td>{user.profile.graduation}</td>
                  <td>{user.profile.profession}</td>
                  <td>{user.profile.nativeLocation}</td>
                  <td>{user.profile.currentLocation}</td>
                  <td>
                    {}
                    <FaUserEdit
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => handleUpdate(user)}
                    />
                    <RiDeleteBin6Line
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="pagination-buttons">{paginationButtons}</div>
      </div>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header>
          <Modal.Title><center>Update User</center></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                className="form-control"
                id="gender"
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                value={userData.age}
                onChange={(e) =>
                  setUserData({ ...userData, age: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="secondarySchool">Secondary School:</label>
              <input
                type="text"
                className="form-control"
                id="secondarySchool"
                value={userData.secondarySchool}
                onChange={(e) =>
                  setUserData({ ...userData, secondarySchool: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="higherSecondarySchool">
                Higher Secondary School:
              </label>
              <input
                type="text"
                className="form-control"
                id="higherSecondarySchool"
                value={userData.higherSecondarySchool}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    higherSecondarySchool: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="graduation">Graduation:</label>
              <input
                type="text"
                className="form-control"
                id="graduation"
                value={userData.graduation}
                onChange={(e) =>
                  setUserData({ ...userData, graduation: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="profession">Profession:</label>
              <input
                type="text"
                className="form-control"
                id="profession"
                value={userData.profession}
                onChange={(e) =>
                  setUserData({ ...userData, profession: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="nativeLocation">Native Location:</label>
              <input
                type="text"
                className="form-control"
                id="nativeLocation"
                value={userData.nativeLocation}
                onChange={(e) =>
                  setUserData({ ...userData, nativeLocation: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="currentLocation">Current Location:</label>
              <input
                type="text"
                className="form-control"
                id="currentLocation"
                value={userData.currentLocation}
                onChange={(e) =>
                  setUserData({ ...userData, currentLocation: e.target.value })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="close" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
