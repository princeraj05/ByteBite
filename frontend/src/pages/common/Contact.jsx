import { useEffect,useState } from "react";

export default function Contact(){

const [show,setShow] = useState(false);

useEffect(()=>{
setTimeout(()=>setShow(true),100)
},[])

return(

<div style={page}>

<div
style={{
...container,
opacity: show ? 1 : 0,
transform: show ? "translateY(0)" : "translateY(20px)",
transition:"all 0.5s"
}}
>

<h1 style={title}>📞 Contact FoodStartup</h1>

<p style={subtitle}>
We're here to help you anytime
</p>

<div style={grid}>

<div style={card}>
<div style={icon}>📧</div>
<h3>Email Support</h3>
<p>support@foodstartup.com</p>
</div>

<div style={card}>
<div style={icon}>📞</div>
<h3>Phone Support</h3>
<p>+91 98765 43210</p>
</div>

<div style={card}>
<div style={icon}>📍</div>
<h3>Office Location</h3>
<p>India · Serving Nationwide</p>
</div>

</div>

</div>

</div>

)

}

const page={
width:"100%",
display:"flex",
justifyContent:"center",
padding:"20px"
};

const container={
width:"100%",
maxWidth:850,
textAlign:"center"
};

const title={
fontSize:30,
marginBottom:10
};

const subtitle={
color:"#16a34a",
marginBottom:30
};

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:16
};

const card={
background:"#fff",
padding:20,
borderRadius:10,
boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
};

const icon={
fontSize:28,
marginBottom:8
};