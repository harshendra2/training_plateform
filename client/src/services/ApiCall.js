import axios from "axios";


export const commonrequest = async (methods, url, body, tokens, header) => {
  
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
