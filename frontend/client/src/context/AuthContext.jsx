import React, { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null)
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (userData) => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.post("http://localhost:8000/login", userData);

      setResponse(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.post("http://localhost:8000/register", userData);

      setResponse(res.data);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed",
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await axios.get("http://localhost:8000/profile");
        setUser(response.data.userDetails);
        return response.data.userDetails;
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Cant fetch user",
        );
      } finally {
        setLoading(false);
      }
    };
    getUser()
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        registerUser,
        response,
        user,
        error,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
