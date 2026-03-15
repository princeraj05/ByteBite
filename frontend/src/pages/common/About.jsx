import { useEffect,useState } from "react";

export default function About(){

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

<h1 style={title}>
About <span style={brand}>FoodStartup</span> 🍔
</h1>

<p style={subtitle}>
Delivering happiness through food
</p>

<p style={desc}>
FoodStartup connects customers with delicious meals and fast delivery services.
</p>

<div style={grid}>

<div style={card}>
<h3>🥗 Quality First</h3>
<p>Fresh ingredients & hygienic preparation</p>
</div>

<div style={card}>
<h3>🚀 Fast Service</h3>
<p>Quick delivery with tracking</p>
</div>

<div style={card}>
<h3>❤️ Customer Trust</h3>
<p>Thousands of happy customers</p>
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