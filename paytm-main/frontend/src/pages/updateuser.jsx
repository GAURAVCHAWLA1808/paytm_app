import { Headers } from "../components/headers"
import { InputBox } from "../components/inputBox"
import { ButtonComponent } from "../components/button"
import { useState } from "react"
import { Userupdate } from "../components/Userupdate"
import { useEffect } from "react"
import { Axios } from "axios"

export function Updateuser(){
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
      const response = await Axios.get("http://localhost:3000/api/v1/user/validation", {
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
    const [firstname,useFirstname]=useState("")
    const [lastname,useLastname]=useState("")
    const [password,usePassword]=useState("")
    const Update = ({firstname,lastname,password})=>{
       return <div>
        <Userupdate first={firstname} last={lastname}  pass={password} />
       </div>
    }
    return <div>
         <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
         <Headers label={ "Update user details"}/>
         <InputBox placeholder={"Firstname"} 
         onChange={(e)=>{
           useFirstname(e.target.value)
         }}/>
         <InputBox placeholder={"lastname"}
          onChange={(e)=>{
           useLastname(e.target.value)
         }}/>
         
         <InputBox  placeholder={"password"}
         onChange={(e)=>{
            usePassword(e.target.value)
          }}/>
         <ButtonComponent label={"Update user"} onClick={Update}/>
        </div>
        </div>
        </div>
    </div>
}