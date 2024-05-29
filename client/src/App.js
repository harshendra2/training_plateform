import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AdminLoginPage from './Component/AdminPages/adminLogin'
import MainPage from './Pages/MainPage';
import Protect from './services/ProtectedRoute';
import UserProtect from './services/UserProtectRoute'
import CreateCourse from './Component/AdminPages/CourseCratePage';
import EditCourse  from './Component/AdminPages/CourseEdit';
import UserLoginPage from './Component/UserPage/Login';
import UserRegister from './Component/UserPage/RegisterPage';
import Profile from './Component/UserPage/ProfilePage';
import CourseRegisterPage from './Component/UserPage/CourseRegisterPage';
import Registrationhistory from './Component/UserPage/RegistrationHistory';
import AdminRegister from './Component/AdminPages/adminRegister';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/signup" element={< AdminRegister/>} />
      
        <Route element={<Protect />}>
        <Route path="/admin/homepage" element={<MainPage/>}/>
        <Route path="/admin/create/course" element={<CreateCourse/>}/>
        <Route path="/admin/editcourse/:id" element={<EditCourse/>}/>
        </Route>

        <Route path="/user/login" element={<UserLoginPage/>} />
        <Route path="/user/register" element={<UserRegister/>} />

        <Route element={<UserProtect />}>
        <Route path="/user/profile" element={<Profile/>}/>
        <Route path="/user/course/reg" element={<CourseRegisterPage/>}/>
        <Route path="/user/reghistory" element={<Registrationhistory/>}/>
        </Route>


      </Routes>
    </Router>
  );
}

export default App;

