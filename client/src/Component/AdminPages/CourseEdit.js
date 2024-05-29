import React, { useState, useEffect } from "react";
import "../../Styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { getsingleCourse, updateCourse } from "../../services/Apis";

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log("get start data", startDate);

  const fetchData = async () => {
    try {
      const response = await getsingleCourse(id);
      console.log("Getting single data", response);
      if (response.status === 200) {
        const courseData = response.data.data;
        setTitle(courseData.title);
        setDescription(courseData.description);
        setStartDate(courseData.start_date.split("T")[0]);
        setEndDate(courseData.end_date.split("T")[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        const response = await updateCourse(id, {
          title,
          description,
          startDate: startDate,
          endDate: endDate,
        });
        if (response.status === 200) {
          toast.success("Course Updated Successfully");
          navigate("/admin/homepage");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h2>Edit Course</h2>
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
              type="date"
              id="startdate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="enddate">End Date</label>
            <input
              type="date"
              id="enddate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Update Course
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditCourse;
