import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

import "./sign-up.scss";

export default function SignUp({ mode }) {
  const signUpMode = "signup";
  const loginMode = "login";

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const userMutate = useMutation({
    mutationFn: async (userInfo) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      const data = await response.json();
      return data;
    },
  });

  const userCreds = useMutation({
    mutationFn: async (userInfo) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      const data = await response.json();
      return data;
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === signUpMode) {
      const data = await userMutate.mutateAsync(userInfo);
      if (!data.error) {
        toast.success("Succesfully Created ", data);
      } else if (data.error) {
        toast.error(data.error);
      }
    }

    if (mode === loginMode) {
      const data = await userCreds.mutateAsync(userInfo);
      if (data.userId) {
        toast.success(`Hi ${data.userName}`);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("isAuthenticated", true);
        navigate("/");
      } else {
        toast.error("SOMETHING_WENT_WRONG");
      }
    }
  };

  return (
    <div className="sign_up_wrapper">
      <h1>{mode === signUpMode ? "REGISTER" : "LOGIN"}</h1>
      <form className="sign_up_form" onSubmit={handleSubmit}>
        {mode === signUpMode && (
          <div className="user_username">
            <h4>username</h4>
            <input type="text" name="username" onChange={handleChange} />
          </div>
        )}
        {mode === signUpMode && (
          <div className="user_name">
            <h4>Name</h4>
            <input type="text" name="name" onChange={handleChange} />
          </div>
        )}
        <div className="user_email">
          <h4>Email</h4>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="user_password">
          <h4>Password</h4>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button>{mode === signUpMode ? "Sign Up" : "Login"}</button>
        {mode === signUpMode && (
          <span>
            Already Registered ? <NavLink to="/login">Login</NavLink>
          </span>
        )}
        {mode === loginMode && (
          <span>
            Not Registered ? <NavLink to="/signup">Signup</NavLink>
          </span>
        )}
      </form>
    </div>
  );
}
