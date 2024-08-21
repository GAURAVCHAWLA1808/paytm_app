import axios from "axios";
import { useState } from "react";

export function Userupdate({ first, last, pass }) {
  const [statusMessage, setStatusMessage] = useState('');

  async function updateUser() {
    const token = localStorage.getItem('token');
    try {
      const updateduser = await axios.post("http://localhost:3000/api/v1/user/update", {
        lastname: last,
        firstname: first,
        password: pass
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (updateduser) {
        setStatusMessage('User updated successfully');
      } else {
        setStatusMessage('There is something up with your inputs');
      }
    } catch (error) {
      setStatusMessage('An error occurred during the update');
    }
  }

  return (
    <div>
      <button onClick={updateUser}>Update User</button>
      {statusMessage && <div>{statusMessage}</div>}
    </div>
  );
}
