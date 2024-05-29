import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";
let token = localStorage.getItem("usertoken");

console.log("geting token",token)
export const AdminLoginfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/admin/login`, data);
};


export const userVerify = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/login`, data);
};

export const adminRegfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/admin/register`, data);
};



export const getCourse = async (data) => {
  return await commonrequest ("GET", `${BACKEND_URL}/admin/getcourse`,data,token);
};

export const createCourses = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/admin/create`, data, token);
};

export const deleteCourse = async (courseId, token) => {
  return await commonrequest("DELETE", `${BACKEND_URL}/admin/delete/${courseId}`, null, token);
};


export const getsingleCourse = async (id, token) => {
  return await commonrequest("GET", `${BACKEND_URL}/admin/getcourse/${id}`, null, token);
};

export const updateCourse = async (id, courseData, token) => {
  return await commonrequest("PUT", `${BACKEND_URL}/admin/course/edit/${id}`, courseData, token);
};
export const UserLoginfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/login`, data);
};

export const userRegfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/register`, data);
};

export const getUserProfile = async (id) => {
  return await commonrequest("GET", `${BACKEND_URL}/user/profile/${id}`,token);
};


export const updateUserProfile = async (id,profile,token) => {
  return await commonrequest("PUT", `${BACKEND_URL}/user/profile/edit/${id}`,profile, token);
};

export const getAllCourse = async (token) => {
  return await commonrequest("GET", `${BACKEND_URL}/user/getcourse`,null, token);
};


export const enrollCourse= async (id,profile,token) => {
  return await commonrequest("PUT", `${BACKEND_URL}/user/course/reg/${id}`,profile, token);
};

export const getRegisteredCourse = async (id,token) => {
  return await commonrequest("GET", `${BACKEND_URL}/user/course/get/${id}`,null, token);
};

export const deleteregcourse = async (id,courseid, token) => {
  return await commonrequest("DELETE", `${BACKEND_URL}/user/course/delete/${id}/${courseid}`, null, token);
};
