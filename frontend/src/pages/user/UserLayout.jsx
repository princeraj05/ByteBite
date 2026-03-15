import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function UserLayout(){

const [name,setName] = useState("");
const [open,setOpen] = useState(false);
const [mobile,setMobile] = useState(false);

useEffect(()=>{
loadUser();
checkScreen();

window.addEventListener("resize",checkScreen);
return ()=> window.removeEventListener("resize",checkScreen);

},[]);

const checkScreen=()=>{

if(window.innerWidth < 900){
setMobile(true);
setOpen(false);
}else{
setMobile(false);
setOpen(true);
}

};

const loadUser = async()=>{

const token = await getToken();
if(!token) return;

const res = await fetch(
"http://localhost:5000/api/users/me",
{
headers:{Authorization:`Bearer ${token}`}
}
);

const data = await res.json();
setName(data.name);

};

const closeSidebar=()=>{
if(mobile) setOpen(false);
};

return(

<div style={layout}>

{/* OVERLAY */}

{mobile && open && (
<div
style={overlay}
onClick={()=>setOpen(false)}
/>
)}

{/* SIDEBAR */}

<aside
style={{
...sidebar,
transform: open ? "translateX(0)" : "translateX(-100%)"
}}
>

<h2 style={brand}>🍔 Food Startup</h2>

<nav style={nav}>

<NavItem to="/user" close={closeSidebar}>🏠 Dashboard</NavItem>
<NavItem to="/user/menu" close={closeSidebar}>🍽 Menu</NavItem>
<NavItem to="/user/cart" close={closeSidebar}>🛒 Cart</NavItem>
<NavItem to="/user/orders" close={closeSidebar}>📦 My Orders</NavItem>
<NavItem to="/user/profile" close={closeSidebar}>👤 Profile</NavItem>
<NavItem to="/user/contact" close={closeSidebar}>📞 Contact</NavItem>
<LogoutItem to="/login">🚪 Logout</LogoutItem>

</nav>

</aside>

{/* MAIN */}

<main
style={{
...main,
marginLeft: mobile ? 0 : 260
}}
>

{/* MENU BUTTON */}

{mobile && (
<button
style={menuBtn}
onClick={()=>setOpen(!open)}
>
☰
</button>
)}

<div style={pageCard}>

<h2 style={welcome}>
Welcome, <span style={nameStyle}>{name}</span> 👋
</h2>

<Outlet/>

</div>

</main>

</div>

);

}

/* COMPONENTS */

function NavItem({to,children,close}){

const [hover,setHover] = useState(false);

return(

<Link
to={to}
onClick={close}
style={{
...navLink,
background:hover
? "linear-gradient(135deg,#22c55e,#16a34a)"
: "transparent",
color:hover ? "#fff" : "#e5e7eb"
}}
onMouseEnter={()=>setHover(true)}
onMouseLeave={()=>setHover(false)}
>
{children}
</Link>

);

}

function LogoutItem({to,children}){

const [hover,setHover] = useState(false);

return(

<Link
to={to}
style={{
...logout,
background:hover
? "linear-gradient(135deg,#ef4444,#b91c1c)"
: "transparent",
color:hover ? "#fff" : "#fecaca"
}}
onMouseEnter={()=>setHover(true)}
onMouseLeave={()=>setHover(false)}
>
{children}
</Link>

);

}

/* STYLES */

const layout={
display:"flex",
minHeight:"100vh",
background:"linear-gradient(135deg,#f0fdf4,#ecfeff,#eef2ff)"
};

const overlay={
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.45)",
zIndex:999
};

const sidebar={
position:"fixed",
top:0,
left:0,
bottom:0,
width:260,
padding:"26px 22px",
background:"linear-gradient(180deg,#020617,#0f172a)",
color:"#fff",
transition:"transform 0.3s ease",
zIndex:1000
};

const brand={
marginBottom:40,
fontSize:22,
fontWeight:800,
background:"linear-gradient(90deg,#22c55e,#38bdf8)",
WebkitBackgroundClip:"text",
WebkitTextFillColor:"transparent"
};

const nav={
display:"flex",
flexDirection:"column",
gap:14
};

const navLink={
textDecoration:"none",
padding:"12px 16px",
borderRadius:12,
fontSize:15,
transition:"0.25s"
};

const logout={
marginTop:20,
padding:"12px 16px",
borderRadius:12,
textDecoration:"none",
fontWeight:700,
transition:"0.25s"
};

const main={
flex:1,
padding:"20px",
width:"100%"
};

const menuBtn={
position:"fixed",
top:15,
left:15,
fontSize:22,
background:"white",
border:"none",
borderRadius:10,
padding:"8px 12px",
cursor:"pointer",
boxShadow:"0 4px 10px rgba(0,0,0,0.15)",
zIndex:1100
};

const pageCard={
background:"linear-gradient(180deg,#ffffff,#f8fafc)",
borderRadius:20,
padding:30
};

const welcome={
marginBottom:20,
color:"#0f172a"
};

const nameStyle={
color:"#16a34a",
fontWeight:700
};