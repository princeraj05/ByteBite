import { useNavigate } from "react-router-dom";

export default function Home(){

const navigate = useNavigate();

return(

<div style={page}>

<div style={container}>

<h1 style={title}>
Welcome to <span style={brand}>FoodStartup</span> 🍕
</h1>

<p style={subtitle}>
Fresh food • Fast delivery • Trusted by customers
</p>

<p style={desc}>
FoodStartup is a modern food ordering platform where you can explore menus, place orders and track delivery easily.
</p>

<div style={features}>

<div style={card}>
<h3>🍔 Quality Food</h3>
<p>Fresh & hygienic meals</p>
</div>

<div style={card}>
<h3>⚡ Fast Delivery</h3>
<p>On-time delivery</p>
</div>

<div style={card}>
<h3>📦 Easy Ordering</h3>
<p>Simple checkout</p>
</div>

</div>

<div style={buttons}>

<button
style={primary}
onClick={()=>navigate("/about")}
>
About Us
</button>

<button
style={secondary}
onClick={()=>navigate("/contact")}
>
Contact
</button>

</div>

<div
style={loginBox}
onClick={()=>navigate("/login")}
>

<h3>🚀 Get Started</h3>

<p>Login to explore menu and order food</p>

</div>

</div>

</div>

)

}

/* styles */

const page={
width:"100%",
display:"flex",
justifyContent:"center",
padding:"20px",
boxSizing:"border-box"
};

const container={
width:"100%",
maxWidth:900,
textAlign:"center"
};

const title={
fontSize:32,
marginBottom:10
};

const brand={
color:"#16a34a",
fontWeight:800
};

const subtitle={
color:"#16a34a",
marginBottom:20
};

const desc={
fontSize:14,
color:"#6b7280",
marginBottom:30
};

const features={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:16,
marginBottom:30
};

const card={
padding:20,
background:"#ffffff",
borderRadius:10,
boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
};

const buttons={
display:"flex",
justifyContent:"center",
flexWrap:"wrap",
gap:10,
marginBottom:30
};

const primary={
padding:"10px 20px",
borderRadius:20,
border:"none",
background:"#16a34a",
color:"#fff",
cursor:"pointer"
};

const secondary={
padding:"10px 20px",
borderRadius:"20px",
border:"2px solid #16a34a",
background:"transparent",
color:"#16a34a",
cursor:"pointer"
};

const loginBox={
padding:20,
borderRadius:10,
background:"#ecfdf5",
cursor:"pointer"
};