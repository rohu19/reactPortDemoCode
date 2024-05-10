import React, { useState } from "react";
import "./SearchByCriteria.css";
const SearchByCriteria = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    firstName: "",
    gender: "",
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9091/port/findbycriteria?firstName=${searchCriteria.firstName}&gender=${searchCriteria.gender}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={searchCriteria.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={searchCriteria.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
      <h2>Search Results:</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email</th>
            <th>Secondary School</th>
            <th>Higher Secondary School</th>
            <th>Graduation</th>
            <th>Profession</th>
            <th>Native Location</th>
            <th>Current Location</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.firstName}</td>
              <td>{result.lastName}</td>
              <td>{result.gender}</td>
              <td>{result.age}</td>
              <td>{result.email}</td>
              <td>{result.profile.secondarySchool}</td>
              <td>{result.profile.higherSecondarySchool}</td>
              <td>{result.profile.graduation}</td>
              <td>{result.profile.profession}</td>
              <td>{result.profile.nativeLocation}</td>
              <td>{result.profile.currentLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchByCriteria;
