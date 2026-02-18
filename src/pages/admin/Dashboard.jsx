import Layout from "../../components/Layout";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <div className="card">
        <h2>Admin Dashboard 👑</h2>
        <p>Welcome, {user.name}</p>
        <p>Role: {user.role}</p>
        <p>Manage entire system</p>
      </div>
    </Layout>
  );
}
