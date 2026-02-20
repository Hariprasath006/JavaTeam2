import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../../api/api";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ✅ CREATE USER */
  const handleCreate = async () => {

    if (!form.name || !form.email || !form.password) {
      alert("Fill required fields ❌");
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

  /* ✅ DELETE USER */
  const handleDelete = async (id) => {

    if (!window.confirm("Delete user?")) return;

    try {
      await deleteUser(id);

      alert("User Deleted ✅");
      loadUsers();

    } catch {
      alert("Delete failed ❌");
    }
  };

  /* ✅ START EDIT */
  const startEdit = (user) => {
    setEditingUser({ ...user });
  };

  /* ✅ UPDATE USER */
  const handleUpdate = async () => {

    try {
      await updateUser(editingUser.id, editingUser);

      alert("User Updated ✅");
      setEditingUser(null);
      loadUsers();

    } catch {
      alert("Update failed ❌");
    }
  };

  return (
    <Layout>

      {/* ✅ CREATE FORM */}
      <div className="card">
        <h2>Add User</h2>

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

        <button onClick={handleCreate}>
          Create User
        </button>
      </div>

      {/* ✅ USER LIST */}
      <div className="card">
        <h2>All Users</h2>

        {users.map(u => (
          <div key={u.id} className="list-item">

            <div>
              {u.name} – {u.email} – {u.role}
            </div>

            <div>
              <button onClick={() => startEdit(u)}>
                Edit
              </button>

              <button onClick={() => handleDelete(u.id)}>
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ✅ EDIT PANEL */}
      {editingUser && (
        <div className="card">
          <h2>Edit User ✏</h2>

          <input
            placeholder="Name"
            value={editingUser.name}
            onChange={e =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={editingUser.email}
            onChange={e =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            value={editingUser.phone}
            onChange={e =>
              setEditingUser({ ...editingUser, phone: e.target.value })
            }
          />

          <select
            value={editingUser.role}
            onChange={e =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
          >
            <option value="STUDENT">Student</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>

          <select
            value={editingUser.status}
            onChange={e =>
              setEditingUser({ ...editingUser, status: e.target.value })
            }
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <button onClick={handleUpdate}>
            Update User
          </button>

          <button onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        </div>
      )}

    </Layout>
  );
}
