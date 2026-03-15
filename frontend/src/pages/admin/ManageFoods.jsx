import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

const API = "http://localhost:5000";

export default function ManageFoods(){

const [foods,setFoods] = useState([]);

const [form,setForm] = useState({
name:"",
price:"",
description:"",
image:null
});

useEffect(()=>{
loadFoods();
},[]);

const loadFoods = async()=>{

const res = await fetch(`${API}/api/foods`);
const data = await res.json();

setFoods(data);

};

const handleChange = (e)=>{

const {name,value,files} = e.target;

if(name==="image"){
setForm({...form,image:files[0]});
}else{
setForm({...form,[name]:value});
}

};

const addFood = async(e)=>{

e.preventDefault();

if(!form.name || !form.price || !form.description || !form.image){
alert("All fields required");
return;
}

const token = await getToken();

const fd = new FormData();

fd.append("name",form.name);
fd.append("price",form.price);
fd.append("description",form.description);
fd.append("image",form.image);

await fetch(`${API}/api/foods`,{
method:"POST",
headers:{Authorization:`Bearer ${token}`},
body:fd
});

setForm({
name:"",
price:"",
description:"",
image:null
});

loadFoods();

};

const deleteFood = async(id)=>{

const token = await getToken();

if(!window.confirm("Delete this food?")) return;

await fetch(`${API}/api/foods/${id}`,{
method:"DELETE",
headers:{Authorization:`Bearer ${token}`}
});

loadFoods();

};

return(

<div style={page}>

<h2 style={title}>🍔 Manage Foods</h2>

{/* ADD FOOD FORM */}

<form style={formBox} onSubmit={addFood}>

<input
style={input}
name="name"
placeholder="Food name"
value={form.name}
onChange={handleChange}
/>

<input
style={input}
name="price"
type="number"
placeholder="Price"
value={form.price}
onChange={handleChange}
/>

<textarea
style={textarea}
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
/>

<input
style={file}
name="image"
type="file"
onChange={handleChange}
/>

<button style={btn} type="submit">
Add Food
</button>

</form>

{/* FOOD LIST */}

<div style={grid}>

{foods.map(f=>(

<div key={f._id} style={card}>

<img
src={`${API}/uploads/${f.image}`}
style={image}
/>

<h3>{f.name}</h3>

<p style={desc}>{f.description}</p>

<p style={price}>₹{f.price}</p>

<button
style={deleteBtn}
onClick={()=>deleteFood(f._id)}
>
Delete
</button>

</div>

))}

</div>

</div>

)

}

/* styles */

const page={
maxWidth:1200,
margin:"0 auto"
}

const title={
marginBottom:20,
fontSize:24,
fontWeight:800
}

const formBox={
background:"#fff",
padding:20,
borderRadius:14,
boxShadow:"0 6px 20px rgba(0,0,0,0.08)",
display:"flex",
flexDirection:"column",
gap:12,
marginBottom:30
}

const input={
padding:10,
borderRadius:8,
border:"1px solid #cbd5e1"
}

const textarea={
padding:10,
borderRadius:8,
border:"1px solid #cbd5e1"
}

const file={
padding:6
}

const btn={
background:"#16a34a",
color:"#fff",
padding:"10px",
border:"none",
borderRadius:8,
cursor:"pointer",
fontWeight:600
}

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:20
}

const card={
background:"#fff",
padding:16,
borderRadius:14,
boxShadow:"0 6px 20px rgba(0,0,0,0.08)",
textAlign:"center"
}

const image={
width:"100%",
height:150,
objectFit:"cover",
borderRadius:10
}

const desc={
fontSize:14,
color:"#64748b"
}

const price={
fontWeight:700,
margin:"6px 0"
}

const deleteBtn={
background:"#ef4444",
color:"#fff",
border:"none",
padding:"8px 12px",
borderRadius:8,
cursor:"pointer"
}