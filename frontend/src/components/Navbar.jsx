import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold text-gray-800 tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-base shadow">
            🍔
          </span>
          <span>FoodStartup</span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {["/ Home", "/about About", "/contact Contact"].map((item) => {
            const [path, label] = item.split(" ");
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}

          {/* Login CTA */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `ml-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm ${
                isActive
                  ? "bg-emerald-600 text-white shadow-emerald-200 shadow-md"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-200 hover:shadow-md"
              }`
            }
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1 shadow-lg">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/login"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl text-sm font-bold text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all shadow-sm"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}