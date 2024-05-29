import React, { useState } from "react";
import "../../Styles/header.css";
import { useNavigate } from "react-router-dom";

function UserHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  function logoutfun() {
    localStorage.removeItem("usertoken");
    window.localStorage.removeItem("isLoggedIn");

    navigate("/");
  }

  return (
    <div>
      <header className="header_section innerpage_header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="index.html">
              <span></span>
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
                    <a onClick={() => navigate("/user/course/reg")}>
                      Course Registration
                    </a>
                    <a onClick={() => navigate("/user/reghistory")}>
                      Registration History
                    </a>
                    <a onClick={logoutfun}>Log out</a>
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

export default UserHeader;
