import Sidebar from "./Sidebar";
import { getUser, logout } from "../utils/auth";

export default function Layout({ children }) {
  const user = getUser();

  return (
    <div className="app">
      <Sidebar role={user?.role} />

      <div className="content">
        <div className="topbar">
          <div>{user?.name} ({user?.role})</div>
          <button onClick={logout}>Logout</button>
        </div>

        {children}
      </div>
    </div>
  );
}
