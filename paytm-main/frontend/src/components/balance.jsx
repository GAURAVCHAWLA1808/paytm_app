import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
export function Balance(){
  const [balance,setBalance]=useState("")
useEffect( () => {
  const userbalance = async ()=> {
    try {
   const token = localStorage.getItem('token')
   const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
    headers:{
      Authorization:`Bearer ${token}`
    }
   })

  const balance = await response
   setBalance(balance.data.balance)
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
    
   
}
userbalance()
},[])
if (balance === "") {
  return <div>Loading...</div>;
}
  

return <div className="flex pt-6 m-2">
    <div className="text-lg font-bold ">
      Your balance
    </div>
    <div className="text-lg font-semibold ml-4 ">
      Rs {balance}
    </div>
</div>
}