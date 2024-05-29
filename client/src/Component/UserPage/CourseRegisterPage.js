import React, { useEffect, useState } from "react";
import "../../Styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { getAllCourse, enrollCourse } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

function CourseRegisterPage() {
  const [id, SetId] = useState("");
  const [courselist, setCoursList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [name, setName] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      const userObject = jwtDecode(token);
      SetId(userObject._id);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourse();
        if (data) {
          setCoursList(data.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  const handleReg = async (e) => {
    e.preventDefault();
    const enrollmentData = {
      name,
      session,
      courseId: selectedCourse,
      semester,
      phone,
    };

    try {
      const response = await enrollCourse(id, enrollmentData);
      if (response.status === 200) {
        toast.success("Registration successful!");
        // Optionally, reset form fields here
        setName("");
        setSession("");
        setSelectedCourse("");
        setSemester("");
        setPhone("");

        navigate("/user/profile");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h2>Course Registration</h2>
        <form onSubmit={handleReg}>
          <div className="input-container">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="input-container">
            <label>Session</label>
            <input
              type="number"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="input-container">
            <label>Course</label>
            {courselist.length > 0 && (
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
                className="course-select"
                style={{ width: "300px", height: "40px" }}
              >
                <option value="" disabled>
                  Select a course
                </option>
                {courselist.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="input-container">
            <label>Semester</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="input-container">
            <label>Phone No:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CourseRegisterPage;
