import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar(){

const [open,setOpen] = useState(false);

return(

<nav style={nav}>

<div style={logo}>
🍔 FoodStartup
</div>

<button
style={menuBtn}
onClick={()=>setOpen(!open)}
>
☰
</button>

<div
style={{
...links,
display: open ? "flex" : ""
}}
>

<NavLink to="/" style={link} onClick={()=>setOpen(false)}>Home</NavLink>

<NavLink to="/about" style={link} onClick={()=>setOpen(false)}>About</NavLink>

<NavLink to="/contact" style={link} onClick={()=>setOpen(false)}>Contact</NavLink>

<NavLink to="/login" style={link} onClick={()=>setOpen(false)}>Login</NavLink>

</div>

</nav>

)

}

/* styles */

const nav={
width:"100%",
height:60,
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 20px",
background:"#ffffff",
borderBottom:"1px solid #e5e7eb",
boxSizing:"border-box",
position:"sticky",
top:0,
zIndex:1000
}

const logo={
fontSize:20,
fontWeight:700,
whiteSpace:"nowrap"
}

const links={
display:"flex",
gap:20,
alignItems:"center"
}

const menuBtn={
display:"none",
fontSize:24,
border:"none",
background:"transparent",
cursor:"pointer"
}

const link=({isActive})=>({

textDecoration:"none",
color:isActive ? "#16a34a" : "#374151",
fontWeight:600,
padding:"6px 10px",
borderRadius:6,
background:isActive ? "#f0fdf4" : "transparent"

})

/* MOBILE */

if(window.innerWidth < 768){

links.flexDirection="column"
links.position="absolute"
links.top=60
links.left=0
links.right=0
links.background="#ffffff"
links.padding=20
links.display="none"

menuBtn.display="block"

}