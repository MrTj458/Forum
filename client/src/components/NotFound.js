import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Oh No!</h1>
      <h3>This page does not exist!</h3>
      <Link as="h3" to="/">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
