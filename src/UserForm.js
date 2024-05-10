import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

const UserForm = ({ onUserSaved }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondarySchool, setSecondarySchool] = useState("");
  const [higherSecondarySchool, setHigherSecondarySchool] = useState("");
  const [graduation, setGraduation] = useState("");
  const [profession, setProfession] = useState("");
  const [nativeLocation, setNativeLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !age ||
      !email ||
      !password ||
      !secondarySchool ||
      !higherSecondarySchool ||
      !graduation ||
      !profession ||
      !nativeLocation ||
      !currentLocation
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const profileFields = [
        secondarySchool,
        higherSecondarySchool,
        graduation,
        profession,
        nativeLocation,
        currentLocation,
      ];
      if (profileFields.some((field) => !field.trim())) {
        alert("Please fill in all profile fields.");
        return;
      }

      const userData = {
        firstName,
        lastName,
        gender,
        age,
        email,
        password,
        profile: {
          secondarySchool,
          higherSecondarySchool,
          graduation,
          profession,
          nativeLocation,
          currentLocation,
        },
      };

      await axios.post("http://localhost:9091/port/save", userData);
      alert("User created successfully!");
      setFirstName("");
      setLastName("");
      setGender("");
      setAge("");
      setEmail("");
      setPassword("");
      setSecondarySchool("");
      setHigherSecondarySchool("");
      setGraduation("");
      setProfession("");
      setNativeLocation("");
      setCurrentLocation("");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user");
    }
  };

  return (
    <div className="user-form-container">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Secondary School"
          value={secondarySchool}
          onChange={(e) => setSecondarySchool(e.target.value)}
        />
        <input
          type="text"
          placeholder="Higher Secondary School"
          value={higherSecondarySchool}
          onChange={(e) => setHigherSecondarySchool(e.target.value)}
        />
        <input
          type="text"
          placeholder="Graduation"
          value={graduation}
          onChange={(e) => setGraduation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />
        <input
          type="text"
          placeholder="Native Location"
          value={nativeLocation}
          onChange={(e) => setNativeLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Current Location"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
