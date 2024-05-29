import React, { useState } from "react";
import "../../Styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRegfunction } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter your Email Id");
    } else if (!email.includes("@")) {
      toast.error("Enter valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else {
      try {
        const response = await userRegfunction({ email, password });
        if (response.status === 200) {
          toast.success("Signup Successfully");
          navigate("/user/login");
        } else {
          toast.error("Please Check your Email and password");
        }
      } catch (error) {
        toast.error(error.response);
      }
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h2>Student Sign up</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UserRegister;
