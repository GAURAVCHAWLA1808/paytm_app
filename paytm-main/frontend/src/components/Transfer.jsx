import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "./button";
import { Subheading } from "./subheading";

export function Transfer({ tousername, amount }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem('token')
  const handleTransfer = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/account/transfer', {
        tousername: tousername,
        amount: amount
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
       });

      setMessage(res.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div>
        <ButtonComponent label={"Send"} onClick={handleTransfer} />
      <Subheading label={message}/>
      {message === "transfered successfully" || message==="" ? 
        <ButtonComponent label={"Go to Dashboard"} onClick={() => navigate('/dashboard')} />: <ButtonComponent label={"Go to Signup"} onClick={() => navigate('/signup')}/>
      }
    </div>
  );
}

