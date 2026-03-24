import { useEffect, useState } from "react";
import API from "../../api/axios";
import { getToken } from "../../utils/getToken";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [replyText, setReplyText] = useState({});

  useEffect(() => { loadContacts(); }, []);

  const loadContacts = async () => {
    try {
      const token = await getToken();
      const res = await API.get("/api/admin/contacts", { headers: { Authorization: `Bearer ${token}` } });
      setContacts(res.data);
    } catch (err) { console.log(err); }
  };

  const sendReply = async (id) => {
    try {
      const token = await getToken();
      await API.post(`/api/admin/contacts/${id}/reply`,
        { reply: replyText[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyText(p => ({ ...p, [id]: "" }));
      loadContacts();
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">User Contacts</h1>
            <p className="text-sm text-gray-500 mt-0.5">View and reply to user messages</p>
          </div>
        </div>

        {contacts.length === 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 px-8 py-12 text-center shadow-xl shadow-emerald-100">
            <p className="text-gray-400 font-medium">No contact messages found</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contacts.map(c => (
            <div key={c._id} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-emerald-100 border border-white/60 p-6 space-y-4">

              {/* User Info */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-800">{c.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.email}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Message */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message</p>
                <p className="text-sm text-gray-700 leading-relaxed">{c.message}</p>
              </div>

              {/* Reply */}
              {c.reply ? (
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1.5">Admin Reply</p>
                  <p className="text-sm text-emerald-700 leading-relaxed">{c.reply}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    placeholder="Type your reply..."
                    value={replyText[c._id] || ""}
                    onChange={(e) => setReplyText({ ...replyText, [c._id]: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none"
                  />
                  <button onClick={() => sendReply(c._id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all">
                    Send Reply →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}