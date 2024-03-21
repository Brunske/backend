import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const validateToken = async (endpoint) => {
  axios({
    method: "GET",
    withCredentials: true,
    url: `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
    validateStatus: function (status) {
      return status === 401 || status === 403;
    },
  })
    .then((response) => {
      console.log(response.data);
      if (response.status === 401 || response.status === 403) {
        toast.error("Please renew your session");
        history.push("/login");
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default validateToken;
