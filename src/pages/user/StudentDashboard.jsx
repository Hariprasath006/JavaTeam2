import Layout from "../../components/Layout";
import { getUser } from "../../utils/auth";

export default function StudentDashboard() {

  const user = getUser();

  return (
    <Layout>
      <div className="card">
        <h2>Student Dashboard 🎓</h2>
        <p>Welcome, {user?.name}</p>
      </div>
    </Layout>
  );
}
