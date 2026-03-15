import { useEffect,useState } from "react";

export default function Profile(){

const [form,setForm] = useState({
name:"",
phone:"",
address:"",
foodPreference:"",
deliveryTime:"",
notifications:""
});

const [loading,setLoading] = useState(true);
const [message,setMessage] = useState("");

useEffect(()=>{

const fetchProfile = async()=>{

try{

const token = localStorage.getItem("token");

const res = await fetch(
"http://localhost:5000/api/users/me",
{
headers:{Authorization:`Bearer ${token}`}
}
);

const data = await res.json();

setForm({
name:data.name||"",
phone:data.phone||"",
address:data.address||"",
foodPreference:data.foodPreference||"",
deliveryTime:data.deliveryTime||"",
notifications:data.notifications||""
});

}catch{

setMessage("❌ Failed to load profile");

}

setLoading(false);

};

fetchProfile();

},[]);

const handleChange = e=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSave = async()=>{

try{

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

}catch{

setMessage("❌ Failed to update profile");

}

};

if(loading) return <p style={{padding:40}}>Loading profile...</p>;

return(

<div style={page}>

<h1 style={title}>👤 My Profile</h1>
<p style={subtitle}>Manage your personal information</p>

{message && <p style={msg}>{message}</p>}

<div style={card}>

<div style={grid}>

<Input label="Full Name" name="name" value={form.name} onChange={handleChange}/>
<Input label="Mobile Number" name="phone" value={form.phone} onChange={handleChange}/>
<Input label="Food Preference" name="foodPreference" value={form.foodPreference} onChange={handleChange}/>
<Input label="Preferred Delivery Time" name="deliveryTime" value={form.deliveryTime} onChange={handleChange}/>

</div>

<Input label="Address" name="address" value={form.address} onChange={handleChange} textarea/>

<Input label="Notifications" name="notifications" value={form.notifications} onChange={handleChange}/>

<button style={btn} onClick={handleSave}>
💾 Save Changes
</button>

</div>

</div>

);

}

/* INPUT COMPONENT */

const Input = ({label,textarea,...props})=>(

<div style={{marginBottom:18,width:"100%"}}>

<label style={labelStyle}>{label}</label>

{textarea ?

<textarea {...props} style={textareaStyle}/>

:

<input {...props} style={inputStyle}/>

}

</div>

);

/* ================= STYLES ================= */

const page={
width:"100%",
padding:"16px"
};

const title={
marginBottom:6,
color:"#0f172a"
};

const subtitle={
marginBottom:20,
color:"#64748b"
};

const msg={
marginBottom:14,
fontWeight:600
};

const card={
maxWidth:600,
margin:"auto",
background:"#fff",
padding:"20px",
borderRadius:18,
boxShadow:"0 8px 20px rgba(0,0,0,0.08)"
};

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
gap:14
};

const labelStyle={
display:"block",
fontSize:14,
fontWeight:600,
marginBottom:6,
color:"#334155"
};

const inputStyle={
width:"100%",
padding:12,
borderRadius:10,
border:"1px solid #e2e8f0",
fontSize:14,
boxSizing:"border-box"
};

const textareaStyle={
width:"100%",
padding:12,
borderRadius:10,
border:"1px solid #e2e8f0",
minHeight:90,
resize:"vertical",
boxSizing:"border-box"
};

const btn={
marginTop:20,
width:"100%",
padding:14,
borderRadius:14,
border:"none",
cursor:"pointer",
fontSize:16,
fontWeight:700,
color:"#fff",
background:"linear-gradient(135deg,#22c55e,#16a34a)"
};