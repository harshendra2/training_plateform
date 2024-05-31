import AdminHeader from "../Component/AdminPages/adminHeader";
import "../Styles/table.css";
import { getCourse, deleteCourse } from "../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const [Course, setCorse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCourse();
        setCorse(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  async function handleDelete(courseId) {
    try {
      const response = await deleteCourse(courseId);
      if (response.status == 200) {
        toast.success("Course deleted successfully");
        const updatedCourses = await getCourse();
        setCorse(updatedCourses.data.data);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div>
      <AdminHeader />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Course &&
              Course.map((temp, index) => (
                <tr key={index}>
                  <td>{temp.title}</td>
                  <td>{temp.description}</td>
                  <td>{new Date(
                     temp.start_date
                    ).toLocaleDateString()}</td>
                  <td>{new Date(
                    temp.end_date
                    ).toLocaleDateString()}</td>
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
                    <button
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        padding: "10px 20px",
                        margin: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => navigate(`/admin/editcourse/${temp._id}`)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "darkgreen")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "green")
                      }
                    >
                      Edit
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

export default MainPage;
