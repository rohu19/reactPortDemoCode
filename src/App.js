import React, { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import SearchByCriteria from "./SearchByCriteria";

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <center>
          {" "}
          <h1 className="app-title"></h1>
        </center>
      </header>
      <main className="app-main">
        <section className="user-section">
          <h2 className="section-title"></h2>
          <UserForm />
        </section>
        <section className="user-section">
          <h2 className="section-title">Search By Criteria</h2>
          <SearchByCriteria /> {}
        </section>
        <section className="user-section">
          <UserTable />
        </section>
      </main>
    </div>
  );
};
export default App;
