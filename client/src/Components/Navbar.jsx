import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">instagram</Link>
      <input type="text" placeholder="Search" />
      <Link to="/">
        <AiFillHome />
      </Link>
    </div>
  );
}

export default Navbar;
