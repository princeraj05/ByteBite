import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = "http://localhost:5000";

export default function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleRegister = async(e)=>{

e.preventDefault();

try{

const res = await fetch(`${API}/api/users/register`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({ name,email,password })
});

const data = await res.json();

if(!res.ok){
return alert(data.message || "Registration failed");
}

alert("Registration successful!");
navigate("/login");

}catch(err){
alert("Server error");
}

};

return(

<div style={page}>

<form style={card} onSubmit={handleRegister}>

<h2 style={title}>Register</h2>

<input
style={input}
placeholder="Full Name"
value={name}
required
onChange={(e)=>setName(e.target.value)}
/>

<input
style={input}
type="email"
placeholder="Email address"
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
Create Account
</button>

<p style={text}>
Already have an account? <Link to="/login">Login</Link>
</p>

</form>

</div>

)

}

/* same styles */

const page={
width:"100%",
minHeight:"calc(100vh - 120px)",
display:"flex",
alignItems:"center",
justifyContent:"center",
padding:"20px",
background:"#f9fafb",
boxSizing:"border-box"
};

const card={
width:"100%",
maxWidth:380,
background:"#ffffff",
padding:"30px 24px",
borderRadius:14,
boxShadow:"0 8px 25px rgba(0,0,0,0.08)"
};

const title={
textAlign:"center",
marginBottom:22,
fontSize:24
};

const input={
width:"100%",
padding:12,
marginBottom:14,
borderRadius:8,
border:"1px solid #d1d5db",
fontSize:14,
boxSizing:"border-box"
};

const btn={
width:"100%",
padding:12,
borderRadius:8,
border:"none",
cursor:"pointer",
fontWeight:600,
background:"#16a34a",
color:"#fff",
fontSize:15
};

const text={
marginTop:14,
textAlign:"center",
fontSize:14
};