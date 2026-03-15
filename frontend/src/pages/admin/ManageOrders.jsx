import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

const API = "http://localhost:5000";

export default function ManageOrders(){

const [orders,setOrders] = useState([]);
const [etaInput,setEtaInput] = useState({});

useEffect(()=>{
loadOrders();
},[]);

const loadOrders = async()=>{

const token = await getToken();

const res = await fetch(`${API}/api/orders`,{
headers:{ Authorization:`Bearer ${token}` }
});

const data = await res.json();
setOrders(data);

};

const setETA = async(id,status)=>{

const token = await getToken();

await fetch(`${API}/api/orders/${id}/status`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
status,
etaMinutes:Number(etaInput[id]) || 0
})
});

setEtaInput({});
loadOrders();

};

const remaining = (o)=>{

if(o.status==="Delivered") return "Delivered";

if(!o.etaMinutes || !o.etaSetAt) return "Not Set";

const diff =
o.etaMinutes*60000 -
(Date.now() - new Date(o.etaSetAt).getTime());

if(diff<=0) return "Delivered Soon";

const m = Math.floor(diff/60000);
const s = Math.floor((diff%60000)/1000);

return `${m}m ${s}s`;

};

return(

<div style={page}>

<h2 style={title}>📦 Manage Orders</h2>

<div style={grid}>

{orders.map(o=>(

<div key={o._id} style={card}>

<h3 style={orderId}>
Order #{o._id.slice(-6)}
</h3>

<p>
Status: <b>{o.status}</b>
</p>

<select
style={select}
value={o.status}
onChange={(e)=>setETA(o._id,e.target.value)}
>
<option>Pending</option>
<option>Preparing</option>
<option>Delivered</option>
</select>

<p style={address}>
📍 {o.address}
</p>

<p style={remainingText}>
⏱ Remaining: {remaining(o)}
</p>

{o.status!=="Delivered" && (

<div style={etaBox}>

<input
style={input}
type="number"
placeholder="ETA minutes"
value={etaInput[o._id] || ""}
onChange={(e)=>
setEtaInput({...etaInput,[o._id]:e.target.value})
}
/>

<button
style={btn}
onClick={()=>setETA(o._id,o.status)}
>
Set ETA
</button>

</div>

)}

<div style={items}>

{o.items.map((i,idx)=>(
<div key={idx}>
{i.name} × {i.qty} = ₹{i.price * i.qty}
</div>
))}

</div>

<h4 style={total}>
Total ₹{o.total}
</h4>

</div>

))}

</div>

</div>

)

}

/* ================= STYLES ================= */

const page = {
width:"100%",
maxWidth:1100,
margin:"0 auto",
padding:"10px"
};

const title = {
marginBottom:20,
fontSize:22,
fontWeight:700
};

const grid = {
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:16
};

const card = {
background:"#fff",
padding:16,
borderRadius:12,
boxShadow:"0 4px 14px rgba(0,0,0,0.08)",
display:"flex",
flexDirection:"column",
gap:8
};

const orderId = {
fontSize:16,
fontWeight:700
};

const select = {
padding:6,
borderRadius:6,
border:"1px solid #cbd5e1"
};

const address = {
fontSize:14,
color:"#475569"
};

const remainingText = {
fontSize:14
};

const etaBox = {
display:"flex",
gap:8,
marginTop:6
};

const input = {
flex:1,
padding:8,
borderRadius:6,
border:"1px solid #cbd5e1"
};

const btn = {
background:"#16a34a",
color:"#fff",
border:"none",
padding:"8px 12px",
borderRadius:6,
cursor:"pointer"
};

const items = {
fontSize:14,
marginTop:6,
color:"#334155"
};

const total = {
marginTop:6,
fontWeight:700
};