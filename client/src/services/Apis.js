import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";
let token = localStorage.getItem("usertoken");

let admintoken = localStorage.getItem("admindbtoken");


export const AdminLoginfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/admin/login`,data);
};


export const userVerify = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/login`, data);
};

export const adminRegfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/admin/register`, data);
};



export const getCourse = async (data) => {
  return await commonrequest ("GET", `${BACKEND_URL}/admin/getcourse`,data,admintoken);
};

export const createCourses = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/admin/create`, data, admintoken);
};

export const deleteCourse = async (courseId) => {
  return await commonrequest("DELETE", `${BACKEND_URL}/admin/delete/${courseId}`,null,admintoken);
};


export const getsingleCourse = async (id) => {
  return await commonrequest("GET", `${BACKEND_URL}/admin/getcourse/${id}`,null,admintoken);
};

export const updateCourse = async (id, courseData) => {
  return await commonrequest("PUT", `${BACKEND_URL}/admin/course/edit/${id}`, courseData, admintoken);
};
export const UserLoginfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/login`,data);
};

export const userRegfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/register`, data);
};

export const getUserProfile = async (id) => {
  return await commonrequest("GET", `${BACKEND_URL}/user/profile/${id}`,null,token);
};


export const updateUserProfile = async (id,profile) => {
  console.log("update user profile",profile)
  return await commonrequest("PUT", `${BACKEND_URL}/user/profile/edit/${id}`,profile, token);
};

export const getAllCourse = async () => {
  return await commonrequest("GET", `${BACKEND_URL}/user/getcourse`,null,token);
};


export const enrollCourse= async (id,profile) => {
  return await commonrequest("PUT", `${BACKEND_URL}/user/course/reg/${id}`,profile, token);
};

export const getRegisteredCourse = async (id) => {
  return await commonrequest("GET", `${BACKEND_URL}/user/course/get/${id}`,null,token);
};

export const deleteregcourse = async (id,courseid) => {
  return await commonrequest("DELETE", `${BACKEND_URL}/user/course/delete/${id}/${courseid}`,null, token);
};
