import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "./button";

export function UsersComponent() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const FilteredUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API Response:', response.data.user);
        setUsers(response.data.user); 
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    FilteredUser();
  }, [filter, token]);

  function Userrender({ users }) {
    if (users.length > 0) {
      return users.map((user, index) => (
        <div key={index} className="user-item flex justify-between ">
          <div className="text-lg">
            {user.firstname} {user.lastname}
          </div>
          <div>
            <ButtonComponent
              label={"Send money"}
              onClick={() => navigate('/send', { state: { username: user.username } })}
            />
          </div>
        </div>
      ));
    } else {
      return <div>User not found</div>;
    }
  }

  return (
    <div className="mt-6 ml-2 mr-2">
      <div className="text-lg font-bold">
        Users
      </div>
      <div className="my-2">
        <input 
          type="text" 
          placeholder="Search users..." 
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        <Userrender users={users} />
      </div>
    </div>
  );
}


