import axios from "axios";
let tokens = localStorage.getItem("usertoken");


export const commonrequest = async (methods, url, body, token, header) => {
  
  let config = {
    method: methods,
    url,
    headers: {
      ...header,
      authorization: `Bearer ${tokens}`,
    },
    data: body,
  };

  // axios instance
  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
