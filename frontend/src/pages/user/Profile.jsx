// ================= FRONTEND =================
// ✅ src/pages/user/Profile.jsx (Firebase removed – MongoDB API used)

import { useEffect, useState } from "react";

export default function Profile() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    foodPreference: "",
    deliveryTime: "",
    notifications: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/users/me",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if(data){

          setForm({
            name: data.name || "",
            phone: data.phone || "",
            address: data.address || "",
            foodPreference: data.foodPreference || "",
            deliveryTime: data.deliveryTime || "",
            notifications: data.notifications || "",
          });

        }

      } catch {
        setMessage("❌ Failed to load profile");
      }

      setLoading(false);

    };

    fetchProfile();

  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {

    try {

      const token = localStorage.getItem("token");

      await fetch(
        "http://localhost:5000/api/users/profile",
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify(form)
        }
      );

      setMessage("✅ Profile updated successfully");

    } catch {

      setMessage("❌ Failed to update profile");

    }

  };

  if (loading) return <p style={{ padding: 40 }}>Loading profile...</p>;

  return (
    <div style={page}>
      <h1 style={title}>👤 My Profile</h1>
      <p style={subtitle}>Manage your personal information</p>

      {message && <p style={messageStyle}>{message}</p>}

      <div style={card}>
        <div style={grid}>
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Mobile Number" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Food Preference" name="foodPreference" value={form.foodPreference} onChange={handleChange} />
          <Input label="Preferred Delivery Time" name="deliveryTime" value={form.deliveryTime} onChange={handleChange} />
        </div>

        <Input
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          textarea
        />

        <Input
          label="Notifications"
          name="notifications"
          value={form.notifications}
          onChange={handleChange}
        />

        <button style={btn} onClick={handleSave}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

const Input = ({ label, textarea, ...props }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={labelStyle}>{label}</label>
    {textarea ? (
      <textarea {...props} style={textareaStyle} />
    ) : (
      <input {...props} style={inputStyle} />
    )}
  </div>
);

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  padding: 40,
  background: "#f1f5f9",
};

const title = {
  color: "#0f172a",
  marginBottom: 6,
};

const subtitle = {
  color: "#64748b",
  marginBottom: 20,
};

const messageStyle = {
  marginBottom: 16,
  fontWeight: 600,
};

const card = {
  maxWidth: 900,
  background: "#ffffff",
  padding: 32,
  borderRadius: 20,
  boxShadow:
    "rgba(0,0,0,0.12) 0px 20px 30px, rgba(0,0,0,0.08) 0px 8px 12px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const labelStyle = {
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  color: "#334155",
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  fontSize: 14,
  outline: "none",
};

const textareaStyle = {
  width: "100%",
  minHeight: 90,
  padding: 12,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  fontSize: 14,
  resize: "vertical",
};

const btn = {
  marginTop: 24,
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 700,
  color: "#fff",
  background: "linear-gradient(90deg,#22c55e,#16a34a)",
};