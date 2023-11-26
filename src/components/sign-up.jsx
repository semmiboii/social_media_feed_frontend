import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import axios from "axios";

import "./sign-up.scss";

export default function SignUp({ mode }) {
  const signUpMode = "signup";
  const loginMode = "login";

  const userEmailRef = useRef();

  const [userInfo, setUserInfo] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));

    console.log(userInfo);
  };

  const addUser = (userInfo) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/new`, userInfo);
  };

  const findUser = () => {
    axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/${userEmailRef.current.value}`
    );
  };

  const userMutation = useMutation({
    mutationFn: addUser,
  });

  const userQuery = useQuery({
    queryFn: findUser,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === signUpMode) {
      userMutation.mutate(userInfo);
      if (userMutation.data) {
        console.log(userMutation.data);
        toast.success("Succesfully Created");
      } else {
        console.log(userMutation.error);
      }
    }

    if (mode === loginMode) {
      console.log(userQuery.data);
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
          <input
            type="email"
            name="mail"
            ref={userEmailRef}
            onChange={handleChange}
          />
        </div>
        <div className="user_password">
          <h4>Password</h4>
          <input type="password" name="password" onChange={handleChange} />
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
