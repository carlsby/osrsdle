import React from "react";
import OSRSLogo from "../../assets/images/osrs_logo.webp";

export default function Layout({ children }) {
  return (
    <main className="main-bg">
      <div className="content">
        <div className="header">
          <img src={OSRSLogo} alt="OSRS Logo" className="osrs-logo" />
        </div>

        {children}
      </div>
    </main>
  );
}
