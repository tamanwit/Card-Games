import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (userData) => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/login",
        userData
      );

      setResponse(res.data);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/register",
        userData
      );

      setResponse(res.data);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Registration failed"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        registerUser,
        response,
        error,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };