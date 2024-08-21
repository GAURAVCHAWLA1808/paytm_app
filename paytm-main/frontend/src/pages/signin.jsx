import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Headers } from "../components/headers";
import { Subheading } from "../components/subheading";
import { InputBox } from "../components/inputBox";
import { ButtonComponent } from "../components/button";
import { BottomWarning } from "../components/bottomwarningComponent";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenValidation(token);
    }
  }, []);

  const tokenValidation = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/validation", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.valid) {
        navigate('/dashboard');
      } else {
        console.log("Token validation failed:", response.data.msg);
      }
    } catch (error) {
      console.error("Token validation error:", error.message);
    }
  };

  const fetchingAccount = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: email,
        password: password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      } else {
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error("Signin error", error);
      setErrorMessage("An error occurred during signin");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Headers label={"Sign in"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"gaurav@gmail.com"} onChange={(e) => setEmail(e.target.value)} />
          <InputBox label={"Password"} placeholder={"gaurav_1234"} onChange={(e) => setPassword(e.target.value)} />
          <ButtonComponent label={"Sign in"} onClick={fetchingAccount} />
          {errorMessage && <BottomWarning fails={errorMessage} />}
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
}
