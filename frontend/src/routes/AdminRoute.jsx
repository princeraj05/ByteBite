import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {

  const [allowed, setAllowed] = useState(null);

  useEffect(() => {

    const checkAdmin = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        setAllowed(false);
        return;
      }

      try {

        const res = await fetch(
          "http://localhost:5000/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setAllowed(data.role === "admin");

      } catch {
        setAllowed(false);
      }

    };

    checkAdmin();

  }, []);

  if (allowed === null) return null;

  return allowed ? children : <Navigate to="/user" />;
}