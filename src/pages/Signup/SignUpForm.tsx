import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/form/FormInput";

function SignUpForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include a special character",
      label: "Username",
      pattern: `^[a-zA-Z0-9]{3,16}$`,
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Enter email",
      errorMessage: "It should be a valid email adress",
      label: "email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      errorMessage:
        "Password should be 8-20 characters and should include 1 letter, 1 number and 1 special character",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      label: "confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios({
      method: "POST",
      data: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
      withCredentials: true,
      url: `${import.meta.env.VITE_API_BASE_URL}/signup`,
      validateStatus: function (status) {
        return status === 200 || status === 409;
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // If signup is successful, redirect to the login page
          toast.success("Sign up successful");
          navigate("/login");
        } else if (
          res.status === 409 &&
          res.data.message === "Email and Username are in use"
        ) {
          setValues({
            ...values,
            email: "",
            username: "",
          });
          toast.error("Username and email are already in use");
        } else if (
          res.status === 409 &&
          res.data.message === "Email is already in use"
        ) {
          setValues({
            ...values,
            email: "",
          });
          toast.error("Email already in use");
        } else if (
          res.status === 409 &&
          res.data.message === "Username is already in use"
        ) {
          setValues(() => ({
            ...values,
            username: "",
          }));
          toast.error("username already in use");
        }
      })
      .catch((error) => {
        // Handle network errors or unexpected server responses
        console.log(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            value={values[input.name as keyof typeof values]}
            {...input}
            onChange={onChange}
          />
        ))}
        <button className="FormButton">
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
