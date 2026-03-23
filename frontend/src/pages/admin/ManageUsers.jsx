import { useEffect, useState } from "react";
import API from "../../api/axios";
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

    <div className="max-w-6xl mx-auto px-4 py-6">

      <h2 className="text-2xl font-bold mb-6">👥 Manage Users</h2>

      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map(u=>(

              <tr key={u._id} className="border-b">

                <td className="px-4 py-3 font-medium">{u.name}</td>

                <td className="px-4 py-3 text-gray-500">
                  {u.email}
                </td>

                <td className="px-4 py-3">

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    u.status==="Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {u.status || "Active"}
                  </span>

                </td>

                <td className="px-4 py-3">

                  <button
                    onClick={()=>changeStatus(
                      u._id,
                      u.status==="Active"?"Blocked":"Active"
                    )}
                    className={`px-3 py-1 rounded-lg text-white text-xs font-semibold ${
                      u.status==="Active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
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

  )
}