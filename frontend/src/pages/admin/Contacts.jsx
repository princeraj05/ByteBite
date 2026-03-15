import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

const API = "http://localhost:5000";

export default function Contacts(){

const [contacts,setContacts] = useState([]);
const [replyText,setReplyText] = useState({});

useEffect(()=>{
loadContacts();
},[]);

const loadContacts = async()=>{

const token = await getToken();

const res = await fetch(`${API}/api/admin/contacts`,{
headers:{ Authorization:`Bearer ${token}` }
});

const data = await res.json();

setContacts(data);

};

const sendReply = async(id)=>{

const token = await getToken();

await fetch(`${API}/api/admin/contacts/${id}/reply`,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
reply:replyText[id]
})
});

setReplyText(p=>({...p,[id]:""}));

loadContacts();

};

return(

<div style={page}>

<h2 style={title}>📩 User Contacts</h2>

{contacts.length===0 && (
<p style={empty}>No contact messages found</p>
)}

<div style={grid}>

{contacts.map(c=>(

<div key={c._id} style={card}>

{/* USER INFO */}

<div style={userRow}>

<div>
<p style={name}>{c.name}</p>
<p style={email}>{c.email}</p>
</div>

<span style={date}>
{new Date(c.createdAt).toLocaleDateString()}
</span>

</div>

{/* MESSAGE */}

<div style={messageBox}>
<p style={label}>User Message</p>
<p style={message}>{c.message}</p>
</div>

{/* ADMIN REPLY */}

{c.reply ? (

<div style={replyBox}>
<p style={label}>Admin Reply</p>
<p style={reply}>{c.reply}</p>
</div>

) : (

<div style={replyArea}>

<textarea
style={textarea}
placeholder="Type your reply..."
value={replyText[c._id] || ""}
onChange={(e)=>
setReplyText({...replyText,[c._id]:e.target.value})
}
/>

<button
style={btn}
onClick={()=>sendReply(c._id)}
>
Send Reply
</button>

</div>

)}

</div>

))}

</div>

</div>

)

}

/* ================= STYLES ================= */

const page={
width:"100%",
maxWidth:1100,
margin:"0 auto",
padding:"10px"
};

const title={
marginBottom:20,
fontSize:22,
fontWeight:700
};

const empty={
color:"#64748b"
};

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:16
};

const card={
background:"#ffffff",
borderRadius:12,
padding:16,
boxShadow:"0 4px 14px rgba(0,0,0,0.08)",
display:"flex",
flexDirection:"column",
gap:10
};

const userRow={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap",
gap:6
};

const name={
fontWeight:700,
fontSize:15
};

const email={
fontSize:13,
color:"#64748b"
};

const date={
fontSize:12,
color:"#94a3b8"
};

const messageBox={
background:"#f8fafc",
padding:12,
borderRadius:8
};

const message={
fontSize:14,
color:"#334155"
};

const replyBox={
background:"#ecfdf5",
padding:12,
borderRadius:8
};

const reply={
fontSize:14,
color:"#166534"
};

const label={
fontSize:12,
fontWeight:700,
marginBottom:4
};

const replyArea={
display:"flex",
flexDirection:"column",
gap:8
};

const textarea={
width:"100%",
minHeight:80,
padding:10,
borderRadius:6,
border:"1px solid #cbd5e1",
fontSize:14
};

const btn={
alignSelf:"flex-end",
padding:"8px 14px",
borderRadius:6,
border:"none",
cursor:"pointer",
background:"#16a34a",
color:"#fff",
fontWeight:600
};