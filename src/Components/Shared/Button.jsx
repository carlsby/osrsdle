import React from "react";

function Button({ children, description }) {
  return (
    <button className="button">
      <p className="button-title">{children}</p><p className="button-desc">{description}</p>
    </button>
  );
}

export default Button;
