import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { InputBox } from "../components/inputBox";
import { Headers } from "../components/headers"; 
import { BottomWarning } from "../components/bottomwarningComponent";
import { Transfer } from "../components/Transfer";

export function Sendmoney() {
  
  const location = useLocation();
  const { username } = location.state || { username: "" };
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Headers label={"Send money"} />
          <InputBox label={"Username"} value={username} readOnly />
          <InputBox label={"Amount"} placeholder={"Ex. Rs 500"} onChange={e => setAmount(e.target.value)} />
          <Transfer tousername={username} amount={amount} />
          <BottomWarning />
        </div>
      </div>
    </div>
  );
}


