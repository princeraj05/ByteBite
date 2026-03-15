// ================= FRONTEND =================
// ✅ src/pages/user/Cart.jsx (RESPONSIVE + IMPROVED UI)

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateQty = (id, type) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={page}>
      <h1 style={title}>🛒 My Cart</h1>

      {cart.length === 0 && <p style={empty}>No items in cart</p>}

      {cart.map((item) => (
        <div key={item._id} style={card}>
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
            style={img}
          />

          <div style={info}>
            <h3 style={name}>{item.name}</h3>
            <p style={price}>₹{item.price}</p>

            <div style={qtyBox}>
              <button style={qtyBtn} onClick={() => updateQty(item._id, "dec")}>
                −
              </button>

              <span style={qty}>{item.qty}</span>

              <button style={qtyBtn} onClick={() => updateQty(item._id, "inc")}>
                +
              </button>
            </div>
          </div>

          <button onClick={() => removeItem(item._id)} style={removeBtn}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={summary}>
          <h2 style={total}>Total: ₹{subtotal}</h2>

          <button
            onClick={() => navigate("/user/checkout")}
            style={checkoutBtn}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "30px 20px",
  maxWidth: 1000,
  margin: "auto",
  minHeight: "100vh",
  background: "#f8fafc",
};

const title = {
  marginBottom: 25,
  color: "#0f172a",
};

const empty = {
  color: "#64748b",
};

const card = {
  display: "flex",
  alignItems: "center",
  gap: 20,
  flexWrap: "wrap",
  background: "#ffffff",
  padding: 18,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  marginBottom: 16,
};

const img = {
  width: 90,
  height: 90,
  objectFit: "cover",
  borderRadius: 12,
};

const info = {
  flex: 1,
  minWidth: 180,
};

const name = {
  margin: 0,
  fontSize: 18,
};

const price = {
  margin: "6px 0",
  color: "#475569",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const qtyBtn = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  background: "#f1f5f9",
  cursor: "pointer",
  fontWeight: 700,
};

const qty = {
  minWidth: 20,
  textAlign: "center",
  fontWeight: 600,
};

const removeBtn = {
  border: "none",
  background: "#fee2e2",
  color: "#dc2626",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};

const summary = {
  marginTop: 30,
  padding: 20,
  background: "#ffffff",
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const total = {
  marginBottom: 16,
  color: "#166534",
};

const checkoutBtn = {
  width: "100%",
  padding: 14,
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#ffffff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};