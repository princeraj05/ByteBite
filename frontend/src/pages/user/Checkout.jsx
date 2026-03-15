// ================= FRONTEND =================
// ✅ src/pages/user/Checkout.jsx (RESPONSIVE + CLEAN UI)

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/getToken";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    if (data.length === 0) navigate("/user/cart");
    setCart(data);
  }, [navigate]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryCharge = 40;
  const total = subtotal + deliveryCharge;

  const placeOrder = async () => {
    if (!address || !phone) {
      alert("Fill address & phone");
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        alert("Login again");
        return;
      }

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          address,
          phone,
          subtotal,
          deliveryCharge,
          total,
        }),
      });

      if (!res.ok) {
        alert("Order failed");
        return;
      }

      localStorage.removeItem("cart");
      navigate("/user/orders");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Server error");
    }
  };

  return (
    <div style={page}>
      <h1 style={title}>🧾 Checkout</h1>

      <div style={card}>
        <label style={label}>Delivery Address</label>

        <textarea
          placeholder="Enter your full delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ ...input, height: 90 }}
        />

        <label style={label}>Phone Number</label>

        <input
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={input}
        />

        <div style={summary}>
          <p style={row}>
            <span>Subtotal</span>
            <b>₹{subtotal}</b>
          </p>

          <p style={row}>
            <span>Delivery</span>
            <b>₹{deliveryCharge}</b>
          </p>

          <p style={totalRow}>
            <span>Total</span>
            <span>₹{total}</span>
          </p>
        </div>

        <button style={btn} onClick={placeOrder}>
          Place Order (Cash on Delivery)
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "30px 20px",
  maxWidth: 900,
  margin: "auto",
  minHeight: "100vh",
  background: "#f8fafc",
};

const title = {
  marginBottom: 25,
  color: "#0f172a",
};

const card = {
  background: "#ffffff",
  padding: 26,
  borderRadius: 18,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const label = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
  color: "#334155",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 16,
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 14,
};

const summary = {
  marginTop: 10,
  marginBottom: 20,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 8,
  color: "#475569",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 10,
  fontSize: 18,
  fontWeight: 700,
  color: "#166534",
};

const btn = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 16,
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#ffffff",
};