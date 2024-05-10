import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import "./UserTable.css";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
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
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="pagination-buttons">{paginationButtons}</div>
      </div>
    </div>
  );
};

export default UserTable;
