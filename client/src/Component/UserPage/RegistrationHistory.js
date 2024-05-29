import "../../Styles/table.css";
import { jwtDecode } from "jwt-decode";
import { getRegisteredCourse, deleteregcourse } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import UserHeader from "./UserHeader";

function Registrationhistory() {
  const [history, SetHistory] = useState([]);
  const [course, SetCourse] = useState([]);
  console.log("course all", course);
  const [id, SetId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      const userObject = jwtDecode(token);
      fetchCours(userObject._id);
      SetId(userObject._id);
    }
  }, []);

  const fetchCours = async (id) => {
    console.log("user id for profile", id);
    try {
      const response = await getRegisteredCourse(id);
      if (response.status === 200) {
        SetHistory(response.data.data.Coursereg);
        SetCourse(response.data.course);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleDelete(courseid) {
    const res = await deleteregcourse(id, courseid);
    if (res.status == 200) {
      fetchCours(id);
    }
  }

  return (
    <div>
      <UserHeader />
      <div className="table-container">
        <table style={{ color: "white" }}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Description</th>
              <th>Start Data</th>
              <th>End Date</th>
              <th>Reg No:</th>
              <th>Student Name</th>
              <th>Phone No:</th>
              <th>Session</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((temp, index) => (
                <tr key={index}>
                  {course.map((t, ind) => (
                    <td>
                      {course.find((c) => c._id === temp.courseId)?.title}
                    </td>
                  ))}

                  <td>
                    {course.map((t, ind) => (
                      <td>
                        {
                          course.find((c) => c._id === temp.courseId)
                            ?.description
                        }
                      </td>
                    ))}
                  </td>
                  <td>
                    {new Date(
                      course.find((c) => c._id === temp.courseId)?.start_date
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(
                      course.find((c) => c._id === temp.courseId)?.end_date
                    ).toLocaleDateString()}
                  </td>

                  <td>{temp.studentId}</td>
                  <td>{temp.name}</td>
                  <td>{temp.phone}</td>
                  <td>{temp.session}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        padding: "10px 20px",
                        margin: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => handleDelete(temp._id)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "darkred")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "red")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Registrationhistory;
