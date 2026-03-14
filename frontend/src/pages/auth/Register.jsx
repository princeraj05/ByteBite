import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
<<<<<<< HEAD
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
=======

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

>>>>>>> cea51bc (Initial commit)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCred.user);

    await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: userCred.user.uid,
        name,
        email,
        role,
      }),
    });

    navigate("/login");
=======
    try{

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCred.user);

      await fetch("http://localhost:5000/api/users/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          uid:userCred.user.uid,
          name,
          email
        })
      });

      alert(
`✅ Registration Successful!

A verification email has been sent to:

${email}

📩 Please check:
• Inbox
• Spam folder
• Promotions tab

Click the verification link in the email to activate your account.

After verification you can login.`);

      navigate("/login");

    }catch(err){

      alert("Registration failed: "+err.message);

    }

>>>>>>> cea51bc (Initial commit)
  };

  return (
    <div style={page}>
      <form style={card} onSubmit={handleRegister}>
<<<<<<< HEAD
=======

>>>>>>> cea51bc (Initial commit)
        <h2 style={title}>Register</h2>

        <input
          style={input}
          placeholder="Full Name"
          value={name}
          required
<<<<<<< HEAD
          onChange={(e) => setName(e.target.value)}
=======
          onChange={(e)=>setName(e.target.value)}
>>>>>>> cea51bc (Initial commit)
        />

        <input
          style={input}
<<<<<<< HEAD
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
=======
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e)=>setEmail(e.target.value)}
>>>>>>> cea51bc (Initial commit)
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          required
<<<<<<< HEAD
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          style={input}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button style={btn} type="submit">Register</button>
=======
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button style={btn} type="submit">
          Register
        </button>
>>>>>>> cea51bc (Initial commit)

        <p style={text}>
          Already registered? <Link to="/login">Login</Link>
        </p>
<<<<<<< HEAD
=======

>>>>>>> cea51bc (Initial commit)
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

<<<<<<< HEAD
const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
};

const card = {
  width: 360,
  padding: 32,
  borderRadius: 14,
  background: "#ffffff",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
};

const title = {
  textAlign: "center",
  marginBottom: 20,
  color: "#111827",
  fontWeight: 600,
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 14,
};

const btn = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  background: "#111827",
  color: "#ffffff",
};

const text = {
  marginTop: 12,
  textAlign: "center",
  color: "#374151",
};
=======
const page={
  minHeight:"100vh",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
};

const card={
  width:360,
  padding:32,
  borderRadius:14,
  background:"#ffffff",
  boxShadow:"0 12px 30px rgba(0,0,0,0.15)"
};

const title={
  textAlign:"center",
  marginBottom:20,
  color:"#111827",
  fontWeight:600
};

const input={
  width:"100%",
  padding:12,
  marginBottom:12,
  borderRadius:8,
  border:"1px solid #d1d5db",
  fontSize:14
};

const btn={
  width:"100%",
  padding:12,
  borderRadius:8,
  border:"none",
  cursor:"pointer",
  fontWeight:"bold",
  background:"#111827",
  color:"#ffffff"
};

const text={
  marginTop:12,
  textAlign:"center",
  color:"#374151"
};
>>>>>>> cea51bc (Initial commit)
