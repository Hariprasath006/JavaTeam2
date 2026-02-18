import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getUsers, createUser, deleteUser, updateUser } from "../../api/api";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);   // ✅ TRACK EDIT

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ✅ CREATE */
  const handleCreate = async () => {

    if (!form.name || !form.email || !form.password) {
      alert("Fill required fields");
      return;
    }

    try {
      await createUser(form);

      alert("User Created ✅");
      setForm({});
      loadUsers();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  /* ✅ EDIT */
  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user.id);
  };

  /* ✅ UPDATE */
  const handleUpdate = async () => {

    await updateUser(editingId, form);

    alert("User Updated ✅");

    setForm({});
    setEditingId(null);
    loadUsers();
  };

  /* ✅ DELETE */
  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <Layout>

      <div className="card">
        <h2>{editingId ? "Edit User" : "Add User"}</h2>

        <input
          placeholder="Name"
          value={form.name || ""}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email || ""}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone || ""}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Password"
          value={form.password || ""}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <select
          value={form.role || ""}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="STUDENT">Student</option>
          <option value="STAFF">Staff</option>
          <option value="ADMIN">Admin</option>
        </select>

        {editingId ? (
          <button onClick={handleUpdate}>Update User</button>
        ) : (
          <button onClick={handleCreate}>Create User</button>
        )}
      </div>

      <div className="card">
        <h2>All Users</h2>

        {users.map(u => (
          <div key={u.id} className="list-item">

            {u.name} – {u.email} – {u.role}

            <div>
              <button onClick={() => handleEdit(u)}>Edit</button>

              <button onClick={() => handleDelete(u.id)}>
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </Layout>
  );
}
