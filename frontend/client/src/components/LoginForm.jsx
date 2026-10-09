import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const LoginForm = () => {
  const { loginUser, error, response, loading } = useContext(AuthContext);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await loginUser({
      email: loginDetails.email,
      password: loginDetails.password,
    });
    if (result) {
      navigate("/");
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/register")}>Register Page</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          value={loginDetails.email}
          onChange={(e) =>
            setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          placeholder="Enter password"
          value={loginDetails.password}
          onChange={(e) =>
            setLoginDetails((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
