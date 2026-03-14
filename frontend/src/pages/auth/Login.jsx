import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {

```
e.preventDefault();

try{

  const res = await fetch("https://food-startup-1.onrender.com/api/users/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();

  if(!res.ok){
    return alert(data.message || "Login failed");
  }

  localStorage.setItem("token",data.token);

  navigate(data.role==="admin"?"/admin":"/user");

}catch(err){
  alert("Login failed");
}
```

};

return ( <div style={page}> <form style={card} onSubmit={handleLogin}>

```
    <h2 style={title}>Login</h2>

    <input
      style={input}
      type="email"
      placeholder="Email"
      value={email}
      required
      onChange={(e)=>setEmail(e.target.value)}
    />

    <input
      style={input}
      type="password"
      placeholder="Password"
      value={password}
      required
      onChange={(e)=>setPassword(e.target.value)}
    />

    <button style={btn} type="submit">
      Login
    </button>

    <p style={text}>
      New user? <Link to="/register">Register</Link>
    </p>

  </form>
</div>
```

);
}

/* ===== STYLES ===== */

const page={
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center"
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
