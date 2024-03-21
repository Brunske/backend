import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.scss";

function LoginForm() {
  const navigate = useNavigate();

  type ValuesType = {
    [key: string]: string;
  };

  const [values, setValues] = useState<ValuesType>({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    axios({
      method: "POST",
      data: {
        username: values.username,
        password: values.password,
      },
      withCredentials: true,
      url: `${import.meta.env.VITE_API_BASE_URL}/login`,
      validateStatus: function (status) {
        return status === 200 || status === 401;
      },
    })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Login successful") {
          // If signup is successful, redirect to the login page
          toast.success("Login successful");
          navigate("/level-selector");
        } else if (res.status === 401 && res.data.message === "Unauthorized") {
          // If login fails, display an error message
          toast.error("Username or password is incorect");
        } else if (
          res.status === 401 &&
          res.data.message === "An error occurred during login"
        ) {
          toast.error("An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        // Handle network errors or unexpected server responses
        console.error(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const getUser = () => {
    navigate("/level-selector");
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            value={values[input.name]}
            {...input}
            onChange={onChange}
          />
        ))}
        <button type="submit" className="FormButton">
          <span>Login</span>
        </button>
      </form>

      <button onClick={getUser}> Get User </button>
    </div>
  );
}

export default LoginForm;
