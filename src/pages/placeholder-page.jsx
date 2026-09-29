import React from "react";

import "./placeholder-page.css";


function PagePlaceholder({ pageName, onHomeClick }) {
  return (
    <div className="page-placeholder">
      <p className="page-placeholder-label">
        You are currently on
      </p>

      <h1>{pageName}</h1>

      <p className="page-placeholder-message">
        Content for this page is coming soon.
      </p>

      <button
        type="button"
        className="page-placeholder-link"
        onClick={onHomeClick}
      >
        Explore Home →
      </button>
    </div>
  );
}

export default PagePlaceholder;