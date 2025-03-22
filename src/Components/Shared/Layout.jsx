import React from "react";
import OSRSLogo from "../../assets/images/osrs_logo.webp";
import GitHubLogo from "../../assets/images/github-logo.png";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <main className="main-bg">
      <div className="content">
        <div className="header">
          <Link to="/">
            <img src={OSRSLogo} alt="OSRS Logo" className="osrs-logo" />
          </Link>
        </div>

        {children}
      </div>
      <div className="created-by">
          <a href="https://github.com/carlsby/osrsdle" className="created-by-link" target="_blank">
            <img src={GitHubLogo} width={25}/> Carlsby
          </a>
        </div>
    </main>
  );
}
