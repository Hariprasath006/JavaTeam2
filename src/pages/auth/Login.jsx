import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../api/api";

export default function Login() {
  const {login}  = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const loginData = {
        email,
        password,
        role
      };

      const response = await loginApi(loginData);
      
      if (response === "Login Success ✅") {
        // Get user details to set in context
        const usersResponse = await fetch(`http://localhost:8080/api/users`);
        const users = await usersResponse.json();
        const currentUser = users.find(user => user.email === email && user.role === role);
        
        if (currentUser) {
          const userData = {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role,
          };

          login(userData);

          if (role === "ADMIN") navigate("/admin");
          else navigate("/user");
        } else {
          alert("User not found");
        }
      } else {
        alert(response || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          KS Rangasamy College of Technology
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account? 
          <a href="/register" className="text-blue-600 hover:underline ml-1">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
