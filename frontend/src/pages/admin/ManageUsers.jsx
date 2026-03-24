import { useEffect, useState } from "react";
import API from "../../api/axios";
import { getToken } from "../../utils/getToken";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const token = await getToken();
      const res = await API.get("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data);
    } catch (err) { console.log(err); }
  };

  const changeStatus = async (id, status) => {
    try {
      const token = await getToken();
      await API.put(`/api/admin/users/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      loadUsers();
    } catch (err) { console.log(err); }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 px-4 py-10">
      <div className="fixed top-0 left-0 w-72 h-72 bg-emerald-300 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-teal-400 opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Manage Users</h1>
            <p className="text-sm text-gray-500 mt-0.5">View and manage all registered users</p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-100 border border-white/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{u.name}</td>
                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                        u.status === "Active" || !u.status
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-red-100 text-red-600 border-red-200"
                      }`}>
                        {u.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => changeStatus(u._id, u.status === "Active" ? "Blocked" : "Active")}
                        className={`px-4 py-1.5 rounded-xl text-white text-xs font-bold shadow-sm transition-all ${
                          u.status === "Active" || !u.status
                            ? "bg-gradient-to-r from-red-400 to-red-500 hover:shadow-md"
                            : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-md"
                        }`}>
                        {u.status === "Active" || !u.status ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}