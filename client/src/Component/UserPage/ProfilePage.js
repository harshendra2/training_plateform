import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/profle.css";
import { jwtDecode } from "jwt-decode";
import { getUserProfile, updateUserProfile } from "../../services/Apis";
import UserHeader from "./UserHeader";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  console.log("profile data", profile);
  const [id, SetId] = useState("");

  const fetchProfile = async (id) => {
    console.log("user id for profile", id);
    try {
      const response = await getUserProfile(id);
      if (response.status === 200) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      const userObject = jwtDecode(token);

      fetchProfile(userObject._id);
      SetId(userObject._id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(id, profile);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        const token = localStorage.getItem("usertoken");
        if (token) {
          const userObject = jwtDecode(token);

          fetchProfile(userObject._id);
          SetId(userObject._id);
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="profiles-page">
      <UserHeader />
      <div className="profile-container">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="profile-button">
            Update Profile
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Profile;
