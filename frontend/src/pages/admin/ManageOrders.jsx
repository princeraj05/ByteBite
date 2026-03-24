import { useEffect, useState } from "react";
import API from "../../api/axios";
import { getToken } from "../../utils/getToken";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [etaInput, setEtaInput] = useState({});

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    try {
      const token = await getToken();
      const res = await API.get("/api/orders", { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch (err) { console.log(err); }
  };

  const setETA = async (id, status) => {
    try {
      const token = await getToken();
      await API.put(`/api/orders/${id}/status`,
        { status, etaMinutes: Number(etaInput[id]) || 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEtaInput({});
      loadOrders();
    } catch (err) { console.log(err); }
  };

  const remaining = (o) => {
    if (o.status === "Delivered") return "Delivered";
    if (!o.etaMinutes || !o.etaSetAt) return "Not Set";
    const diff = o.etaMinutes * 60000 - (Date.now() - new Date(o.etaSetAt).getTime());
    if (diff <= 0) return "Delivered Soon";
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${m}m ${s}s`;
  };

  const statusStyle = (status) => {
    if (status === "Delivered") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (status === "Preparing") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-gray-100 text-gray-600 border-gray-200";
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Manage Orders</h1>
            <p className="text-sm text-gray-500 mt-0.5">Track and update all customer orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {orders.map(o => (
            <div key={o._id} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-emerald-100 border border-white/60 p-6 space-y-4">

              {/* Order ID + Status */}
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-gray-800">#{o._id.slice(-6)}</p>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyle(o.status)}`}>
                  {o.status}
                </span>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Update Status</label>
                <select value={o.status} onChange={(e) => setETA(o._id, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300">
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Delivered</option>
                </select>
              </div>

              {/* Address & ETA */}
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 space-y-1.5">
                <p className="text-xs text-gray-600 flex items-center gap-1.5">
                  <span>📍</span> {o.address}
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1.5">
                  <span>⏱</span> Remaining: <span className="font-semibold text-emerald-600">{remaining(o)}</span>
                </p>
              </div>

              {/* ETA Input */}
              {o.status !== "Delivered" && (
                <div className="flex gap-2">
                  <input type="number" placeholder="ETA (min)"
                    value={etaInput[o._id] || ""}
                    onChange={(e) => setEtaInput({ ...etaInput, [o._id]: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  <button onClick={() => setETA(o._id, o.status)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all">
                    Set
                  </button>
                </div>
              )}

              {/* Items */}
              <div className="space-y-1.5">
                {o.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-gray-600">
                    <span>{i.name} × {i.qty}</span>
                    <span className="font-semibold text-gray-800">₹{i.price * i.qty}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</span>
                <span className="text-lg font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ₹{o.total}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}