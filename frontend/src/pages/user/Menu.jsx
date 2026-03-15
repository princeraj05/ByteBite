import { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function Menu(){

const [foods,setFoods] = useState([]);
const [search,setSearch] = useState("");

useEffect(()=>{
loadFoods();
},[]);

const loadFoods = async()=>{

const res = await fetch(`${API}/api/foods`);
const data = await res.json();

setFoods(data);

};

const filteredFoods = foods.filter(food =>
food.name.toLowerCase().includes(search.toLowerCase()) ||
(food.description || "").toLowerCase().includes(search.toLowerCase())
);

const addToCart = (food)=>{

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const existing = cart.find(i=>i._id===food._id);

if(existing){
existing.qty += 1;
}else{
cart.push({
_id:food._id,
name:food.name,
price:food.price,
image:food.image,
qty:1
});
}

localStorage.setItem("cart",JSON.stringify(cart));

alert("Added to cart");

};

return(

<div style={page}>

<h1 style={title}>🍽 Our Menu</h1>

<input
type="text"
placeholder="🔍 Search food..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={searchBox}
/>

<div style={grid}>

{filteredFoods.length===0 ? (

<p>No food found</p>

) : (

filteredFoods.map(food=>(

<div key={food._id} style={card}>

<img
src={`${API}/uploads/${food.image}`}
alt={food.name}
style={img}
/>

<div style={content}>

<h3 style={name}>{food.name}</h3>

<p style={desc}>{food.description}</p>

<div style={bottom}>

<span style={price}>₹{food.price}</span>

<button
style={btn}
onClick={()=>addToCart(food)}
>
Add to Cart
</button>

</div>

</div>

</div>

))

)}

</div>

</div>

);

}

/* ================= STYLES ================= */

const page={
padding:"30px 20px",
background:"#f8fafc",
minHeight:"100vh",
maxWidth:1000,
margin:"auto"
};

const title={
marginBottom:24,
color:"#0f172a"
};

const searchBox={
width:"100%",
maxWidth:400,
padding:"12px 14px",
borderRadius:12,
border:"1px solid #e2e8f0",
marginBottom:26,
boxSizing:"border-box"
};

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:20
};

const card={
background:"#fff",
borderRadius:18,
overflow:"hidden",
boxShadow:"0 10px 25px rgba(0,0,0,0.08)"
};

const img={
width:"100%",
height:170,
objectFit:"cover"
};

const content={
padding:16
};

const name={
margin:"0 0 6px"
};

const desc={
fontSize:14,
color:"#64748b",
minHeight:36
};

const bottom={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginTop:12,
flexWrap:"wrap",
gap:8
};

const price={
fontWeight:700,
color:"#166534"
};

const btn={
padding:"8px 14px",
borderRadius:10,
border:"none",
cursor:"pointer",
background:"#16a34a",
color:"#fff",
fontSize:13
};