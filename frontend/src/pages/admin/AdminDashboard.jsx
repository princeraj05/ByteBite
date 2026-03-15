import { useEffect, useState } from "react";

export default function AdminDashboard(){

const [stats,setStats] = useState({
users:0,
orders:0,
foods:0,
revenue:0
});

useEffect(()=>{
loadStats();
},[]);

const loadStats = async()=>{

try{

const res = await fetch("http://localhost:5000/api/admin/stats");
const data = await res.json();

setStats(data);

}catch(err){
console.log(err);
}

};

return(

<div>

<h1 style={title}>📊 Admin Dashboard</h1>

<div style={grid}>

<div style={card}>
<h3>👥 Users</h3>
<p style={number}>{stats.users}</p>
</div>

<div style={card}>
<h3>📦 Orders</h3>
<p style={number}>{stats.orders}</p>
</div>

<div style={card}>
<h3>🍔 Foods</h3>
<p style={number}>{stats.foods}</p>
</div>

<div style={card}>
<h3>💰 Revenue</h3>
<p style={number}>₹{stats.revenue}</p>
</div>

</div>

</div>

)

}

/* styles */

const title={
marginBottom:30,
fontSize:28,
fontWeight:700
}

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:20
}

const card={
background:"#ffffff",
padding:24,
borderRadius:14,
boxShadow:"0 6px 20px rgba(0,0,0,0.08)"
}

const number={
fontSize:28,
fontWeight:700,
marginTop:10,
color:"#16a34a"
}