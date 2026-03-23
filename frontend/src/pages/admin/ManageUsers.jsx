import { useEffect, useState } from "react";
import API from "../../api/axios"; // ✅ NEW
import { getToken } from "../../utils/getToken";

export default function ManageUsers(){

  const [users,setUsers] = useState([]);

  useEffect(()=>{
    loadUsers();
  },[]);

  const loadUsers = async()=>{
    try{
      const token = await getToken();

      const res = await API.get("/api/admin/users",{
        headers:{ Authorization:`Bearer ${token}` }
      });

      setUsers(res.data);

    }catch(err){
      console.log(err);
    }
  };

  const changeStatus = async(id,status)=>{
    try{
      const token = await getToken();

      await API.put(`/api/admin/users/${id}/status`,
        { status },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      loadUsers();

    }catch(err){
      console.log(err);
    }
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