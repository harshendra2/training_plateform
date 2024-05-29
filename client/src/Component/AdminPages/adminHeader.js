import React, { useState } from "react";
import "../../Styles/header.css";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  function logoutfun() {
    localStorage.removeItem("admindbtoken");
    window.localStorage.removeItem("isLoggedIn");

    navigate("/");
  }

  return (
    <div>
      <header className="header_section innerpage_header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="index.html">
              <span>Course</span>
            </a>
            <div id="">
              <div
                className={`custom_menu-btn ${
                  isMenuOpen ? "menu_btn-style" : ""
                }`}
              >
                <button onClick={toggleMenu}>
                  <span className="s-1"></span>
                  <span className="s-2"></span>
                  <span className="s-3"></span>
                </button>
                <div className={`overlay ${isMenuOpen ? "menu_width" : ""}`}>
                  <div className="overlay-content">
                    <a onClick={() => navigate("/admin/create/course")}>
                      Create Course
                    </a>
                    <a onClick={logoutfun}>Logout</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default AdminHeader;
