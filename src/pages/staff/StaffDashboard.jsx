import Layout from "../../components/Layout";
import { getUser } from "../../utils/auth";

export default function StaffDashboard() {

  const user = getUser();

  return (
    <Layout>
      <h2>Welcome, {user.name} 👨‍🏫</h2>
      <p>Approve student bookings and monitor resources</p>
    </Layout>
  );
}
