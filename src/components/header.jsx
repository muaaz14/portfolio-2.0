import React from "react";
import "./header.css";


function Header({ activePage, setActivePage }) {

  const pageNames = {
    home: "Home",
    work: "Work",
    about: "About",
    contact: "Contact",
    playground: "Playground",
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* <a href="./App1.jsx" className="breadcrumb">Muaaaz / Product Designer + Engineer</a> */}
        <button type="button" className="breadcrumb" onClick={() => setActivePage("home")} aria-label="Go to Home">
          <span className="breadcrumb-root">Muaaaz</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            {pageNames[activePage]}
          </span>
        </button>
      </div>

      <div className="header-right">
        <span className="availability">
          <span className="availability-dot"></span>
          Available for work
        </span>
      </div>
    </header>
  );
}

export default Header;