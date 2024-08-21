import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Sendmoney } from "./pages/sendMoney";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Updateuser } from "./pages/updateuser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Sendmoney />} />
          <Route path="/updateuser" element={<Updateuser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/signup');
  }, [navigate]);
}

export default App;

