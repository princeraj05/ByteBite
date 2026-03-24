import { useEffect, useState } from "react";
import API from "../../api/axios";
import { getToken } from "../../utils/getToken";

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: null });

  useEffect(() => { loadFoods(); }, []);

  const loadFoods = async () => {
    try {
      const res = await API.get("/api/foods");
      setFoods(res.data);
    } catch (err) { console.log(err); }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const addFood = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description || !form.image) {
      alert("All fields required"); return;
    }
    try {
      const token = await getToken();
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("description", form.description);
      fd.append("image", form.image);
      await API.post("/api/foods", fd, { headers: { Authorization: `Bearer ${token}` } });
      setForm({ name: "", price: "", description: "", image: null });
      loadFoods();
    } catch (err) { console.log(err); }
  };

  const deleteFood = async (id) => {
    try {
      const token = await getToken();
      if (!window.confirm("Delete this food?")) return;
      await API.delete(`/api/foods/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      loadFoods();
    } catch (err) { console.log(err); }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 px-4 py-10">
      {/* Blobs */}
      <div className="fixed top-0 left-0 w-72 h-72 bg-emerald-300 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-teal-400 opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Manage Foods</h1>
            <p className="text-sm text-gray-500 mt-0.5">Add, view or remove food items</p>
          </div>
        </div>

        {/* Add Food Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-100 border border-white/60 px-8 py-8 mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Add New Food</h2>
          <form onSubmit={addFood} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Food Name</label>
              <input name="name" placeholder="e.g. Paneer Burger" value={form.name} onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Price (₹)</label>
              <input name="price" type="number" placeholder="e.g. 199" value={form.price} onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
              <textarea name="description" placeholder="Short description..." value={form.description} onChange={handleChange} rows={3}
                className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Food Image</label>
              <input name="image" type="file" onChange={handleChange}
                className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700" />
            </div>
            <div className="flex items-end">
              <button type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all">
                + Add Food
              </button>
            </div>
          </form>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {foods.map(f => (
            <div key={f._id} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-emerald-100 border border-white/60 overflow-hidden hover:shadow-xl transition-all">
              <img src={`${import.meta.env.VITE_API_URL}/uploads/${f.image}`}
                className="w-full h-40 object-cover" alt={f.name} />
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800 text-base">{f.name}</h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{f.description}</p>
                <p className="font-extrabold text-emerald-600 mt-2 text-lg">₹{f.price}</p>
                <button onClick={() => deleteFood(f._id)}
                  className="mt-3 w-full py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs border border-red-100 transition-all">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}