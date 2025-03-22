import React from "react";
import OSRSLogo from "../../assets/images/osrs_logo.webp";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const currentYear = new Date().getFullYear();
  return (
    <main className="main-bg">
      <div className="content">
        <div className="header">
          <Link to="/">
            <img src={OSRSLogo} alt="OSRS Logo" className="osrs-logo" />
          </Link>
        </div>

        {children}
        <p className="created-by">
          <a href="https://github.com/carlsby" target="_blank">
            @Carlsby{" "}
          </a>
          - {currentYear}
        </p>
      </div>
    </main>
  );
}
