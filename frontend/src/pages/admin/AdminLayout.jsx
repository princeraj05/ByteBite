import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function AdminLayout(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [open,setOpen] = useState(false);

useEffect(()=>{
loadAdmin();
},[]);

const loadAdmin = async()=>{

const token = await getToken();
if(!token) return;

const res = await fetch("http://localhost:5000/api/users/me",{
headers:{Authorization:`Bearer ${token}`}
});

const data = await res.json();
setName(data.name);

};

return(

<div style={layout}>

{/* OVERLAY */}

{open && (
<div
style={overlay}
onClick={()=>setOpen(false)}
></div>
)}

{/* SIDEBAR */}

<div
style={{
...sidebar,
transform: open ? "translateX(0)" : "translateX(-100%)"
}}
>

<h2 style={brand}>🍔 FoodStartup</h2>

<p style={admin}>👨‍💼 {name || "Admin"}</p>

<nav style={nav}>

<NavItem to="/admin" end close={()=>setOpen(false)}>Dashboard</NavItem>
<NavItem to="/admin/foods" close={()=>setOpen(false)}>Foods</NavItem>
<NavItem to="/admin/orders" close={()=>setOpen(false)}>Orders</NavItem>
<NavItem to="/admin/users" close={()=>setOpen(false)}>Users</NavItem>
<NavItem to="/admin/contacts" close={()=>setOpen(false)}>Contacts</NavItem>

</nav>

<button
style={logout}
onClick={()=>navigate("/login")}
>
Logout
</button>

</div>

{/* MAIN */}

<div style={main}>

{/* TOPBAR */}

<div style={topbar}>

<button
style={menuBtn}
onClick={()=>setOpen(!open)}
>
☰
</button>

<h3 style={{margin:0}}>Admin Panel</h3>

</div>

<div style={content}>
<Outlet/>
</div>

</div>

</div>

)

}

/* NAV ITEM */

function NavItem({to,end,children,close}){

return(

<NavLink
to={to}
end={end}
onClick={close}
style={({isActive})=>({
padding:"12px 16px",
borderRadius:8,
textDecoration:"none",
color:isActive ? "#fff" : "#d1d5db",
background:isActive ? "#16a34a" : "transparent"
})}
>
{children}
</NavLink>

)

}

/* styles */

const layout={
display:"flex",
minHeight:"100vh"
}

const overlay={
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.4)",
zIndex:900
}

const sidebar={
position:"fixed",
top:0,
left:0,
bottom:0,
width:260,
background:"#111827",
padding:20,
color:"#fff",
display:"flex",
flexDirection:"column",
gap:20,
transition:"transform 0.3s ease",
zIndex:1000
}

const brand={
fontSize:20,
fontWeight:700
}

const admin={
fontSize:14,
color:"#9ca3af"
}

const nav={
display:"flex",
flexDirection:"column",
gap:10
}

const logout={
marginTop:"auto",
padding:12,
borderRadius:8,
border:"none",
background:"#ef4444",
color:"#fff",
cursor:"pointer"
}

const main={
flex:1,
display:"flex",
flexDirection:"column",
width:"100%"
}

const topbar={
height:60,
display:"flex",
alignItems:"center",
gap:15,
padding:"0 20px",
borderBottom:"1px solid #e5e7eb",
background:"#ffffff"
}

const menuBtn={
fontSize:22,
border:"none",
background:"transparent",
cursor:"pointer"
}

const content={
padding:30,
background:"#f9fafb",
minHeight:"calc(100vh - 60px)"
}