import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getResources, createResource, deleteResource } from "../../api/api";

export default function Resources() {

  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({});

  const loadResources = async () => {
    const res = await getResources();
    setResources(res.data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleCreate = async () => {

    if (!form.name || !form.type) {
      alert("Fill required fields");
      return;
    }

    await createResource({
      ...form,
      status: "AVAILABLE"
    });

    alert("Resource Added ✅");
    setForm({});
    loadResources();
  };

  const handleDelete = async (id) => {
    await deleteResource(id);
    loadResources();
  };

  return (
    <Layout>

      <div className="card">
        <h2>Add Resource</h2>

        <input placeholder="Name"
          onChange={e => setForm({...form, name:e.target.value})} />

        <select onChange={e => setForm({...form, type:e.target.value})}>
          <option value="">Select Type</option>
          <option value="LAB">Lab</option>
          <option value="CLASSROOM">Classroom</option>
          <option value="HALL">Hall</option>
        </select>

        <input placeholder="Capacity"
          onChange={e => setForm({...form, capacity:e.target.value})} />

        <button onClick={handleCreate}>Create Resource</button>
      </div>

      <div className="card">
        <h2>All Resources</h2>

        {resources.map(r => (
          <div key={r.id} className="list-item">
            {r.name} – {r.type} – {r.status}

            <button onClick={() => handleDelete(r.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

    </Layout>
  );
}
