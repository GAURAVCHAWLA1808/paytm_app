import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/balance";
import { UsersComponent } from "../components/Users";

export function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenValidation(token);
    } else {
      navigate('/signup');
    }
  }, []);

  const tokenValidation = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/validation", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data.valid) {
        navigate('/signup');
      }
    } catch (error) {
      console.error("Token validation error:", error.message);
      navigate('/signup');
    }
  };

  return (
    <div>
      <AppBar />
      <Balance />
      <UsersComponent />
    </div>
  );
}
