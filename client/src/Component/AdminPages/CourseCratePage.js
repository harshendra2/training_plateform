import React, { useState } from "react";
import "../../Styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createCourses } from "../../services/Apis";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      toast.error("Enter Course Title");
    } else if (description.trim() === "") {
      toast.error("Enter Course Description");
    } else if (startDate.trim() === "") {
      toast.error("Enter Start Date");
    } else if (endDate.trim() === "") {
      toast.error("Enter End Date");
    } else {
      try {
        const response = await createCourses({
          title,
          description,
          startDate,
          endDate,
        });
        if (response.status === 200) {
          toast.success("Course Created Successfully");
          navigate("/admin/homepage");
        } else {
          toast.error("Some thing went wrong");
        }
      } catch (error) {
        toast.error(error.response);
      }
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h2>Create Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="startdate">Start Date</label>
            <input
              type="text"
              id="startdate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="enddata">End Date</label>
            <input
              type="text"
              id="enddata"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Create Course
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreateCourse;
