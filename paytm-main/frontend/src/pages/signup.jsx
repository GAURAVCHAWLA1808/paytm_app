import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Headers } from "../components/headers";
import { InputBox } from "../components/inputBox";
import { Subheading } from "../components/subheading";
import { ButtonComponent } from "../components/button";
import { BottomWarning } from "../components/bottomwarningComponent";

export function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstname,
        lastname,
        password,
      });

      const token = response.data.token;
      if (!token) {
        setErrorMessage(response.data.message || "Signup failed");
      } else {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup error", error);
      setErrorMessage("An error occurred during signup");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Headers label={"Sign up"} />
          <Subheading label={"Enter your information to create an account"} />
          <InputBox
            label={"First Name"}
            placeholder={"gaurav"}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Chawla"}
            onChange={(e) => setLastname(e.target.value)}
          />
          <InputBox
            label={"Email"}
            placeholder={"gaurav@example.com"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"gaurav_1234"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonComponent label={"Sign up"} onClick={handleSignup} />
          {errorMessage && <BottomWarning fails={errorMessage} />}
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}

