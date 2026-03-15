import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

const API = "http://localhost:5000";

export default function ManageUsers(){

const [users,setUsers] = useState([]);

useEffect(()=>{
loadUsers();
},[]);

const loadUsers = async()=>{

const token = await getToken();

const res = await fetch(`${API}/api/admin/users`,{
headers:{Authorization:`Bearer ${token}`}
});

const data = await res.json();
setUsers(data);

};

const changeStatus = async(id,status)=>{

const token = await getToken();

await fetch(`${API}/api/admin/users/${id}/status`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({status})
});

loadUsers();

};

return(

<div style={page}>

<h2 style={title}>👥 Manage Users</h2>

<div style={tableWrap}>

<div style={tableContainer}>

<table style={table}>

<thead>

<tr>
<th style={th}>Name</th>
<th style={th}>Email</th>
<th style={th}>Status</th>
<th style={th}>Action</th>
</tr>

</thead>

<tbody>

{users.map(u=>(

<tr key={u._id} style={row}>

<td style={td}>{u.name}</td>

<td style={{...td,color:"#64748b"}}>
{u.email}
</td>

<td style={td}>

<span
style={{
...statusBadge,
background:
u.status==="Active"?"#dcfce7":"#fee2e2",
color:
u.status==="Active"?"#166534":"#991b1b"
}}
>
{u.status || "Active"}
</span>

</td>

<td style={td}>

<button
style={{
...btn,
background:
u.status==="Active"?"#ef4444":"#16a34a"
}}
onClick={()=>changeStatus(
u._id,
u.status==="Active"?"Blocked":"Active"
)}
>
{u.status==="Active"?"Block":"Unblock"}
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

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

const tableWrap={
background:"#ffffff",
borderRadius:12,
padding:16,
boxShadow:"0 4px 14px rgba(0,0,0,0.08)"
};

const tableContainer={
width:"100%",
overflowX:"auto"
};

const table={
width:"100%",
borderCollapse:"collapse",
minWidth:500
};

const th={
textAlign:"left",
padding:"12px",
borderBottom:"1px solid #e2e8f0",
fontSize:14
};

const td={
padding:"12px",
borderBottom:"1px solid #f1f5f9",
fontSize:14
};

const row={
background:"#fff"
};

const statusBadge={
padding:"6px 12px",
borderRadius:16,
fontSize:12,
fontWeight:600
};

const btn={
padding:"6px 12px",
borderRadius:6,
border:"none",
cursor:"pointer",
color:"#fff",
fontWeight:600
};