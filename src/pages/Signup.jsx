import { useState } from "react";
import { createUser } from "../api/api";

export default function Signup() {

  const [form, setForm] = useState({});

  const handleSignup = async () => {

    if (!form.name || !form.email || !form.phone || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {

      await createUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role || "STUDENT"
      });

      alert("✅ Account Created");

      window.location.href = "/";

    } catch (err) {

      alert(err.response?.data?.message || "Signup Failed");

    }
  };

  return (
    <div className="login">
      <div className="card">

        <h2>Sign Up</h2>

        <input placeholder="Name"
          onChange={e => setForm({...form, name:e.target.value})} />

        <input placeholder="Email"
          onChange={e => setForm({...form, email:e.target.value})} />

        <input placeholder="Phone"
          onChange={e => setForm({...form, phone:e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={e => setForm({...form, password:e.target.value})} />

        <select onChange={e => setForm({...form, role:e.target.value})}>
          <option value="">Select Role</option>
          <option value="STUDENT">Student</option>
          <option value="STAFF">Staff</option>
        </select>

        <button onClick={handleSignup}>
          Create Account
        </button>

        <p className="auth-switch">
          Already have account?
          <span onClick={() => window.location.href="/"}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
