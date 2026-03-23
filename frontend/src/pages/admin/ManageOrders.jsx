import { useEffect, useState } from "react";
import API from "../../api/axios"; // ✅ NEW
import { getToken } from "../../utils/getToken";

export default function ManageOrders(){

  const [orders,setOrders] = useState([]);
  const [etaInput,setEtaInput] = useState({});

  useEffect(()=>{
    loadOrders();
  },[]);

  const loadOrders = async()=>{
    try{
      const token = await getToken();

      const res = await API.get("/api/orders",{
        headers:{ Authorization:`Bearer ${token}` }
      });

      setOrders(res.data);

    }catch(err){
      console.log(err);
    }
  };

  const setETA = async(id,status)=>{
    try{
      const token = await getToken();

      await API.put(`/api/orders/${id}/status`,
        {
          status,
          etaMinutes:Number(etaInput[id]) || 0
        },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      setEtaInput({});
      loadOrders();

    }catch(err){
      console.log(err);
    }
  };

  const remaining = (o)=>{
    if(o.status==="Delivered") return "Delivered";

    if(!o.etaMinutes || !o.etaSetAt) return "Not Set";

    const diff =
      o.etaMinutes*60000 -
      (Date.now() - new Date(o.etaSetAt).getTime());

    if(diff<=0) return "Delivered Soon";

    const m = Math.floor(diff/60000);
    const s = Math.floor((diff%60000)/1000);

    return `${m}m ${s}s`;
  };

  return(

    <div style={page}>

      <h2 style={title}>📦 Manage Orders</h2>

      <div style={grid}>

        {orders.map(o=>(

          <div key={o._id} style={card}>

            <h3 style={orderId}>
              Order #{o._id.slice(-6)}
            </h3>

            <p>
              Status: <b>{o.status}</b>
            </p>

            <select
              style={select}
              value={o.status}
              onChange={(e)=>setETA(o._id,e.target.value)}
            >
              <option>Pending</option>
              <option>Preparing</option>
              <option>Delivered</option>
            </select>

            <p style={address}>
              📍 {o.address}
            </p>

            <p style={remainingText}>
              ⏱ Remaining: {remaining(o)}
            </p>

            {o.status!=="Delivered" && (

              <div style={etaBox}>

                <input
                  style={input}
                  type="number"
                  placeholder="ETA minutes"
                  value={etaInput[o._id] || ""}
                  onChange={(e)=>
                    setEtaInput({...etaInput,[o._id]:e.target.value})
                  }
                />

                <button
                  style={btn}
                  onClick={()=>setETA(o._id,o.status)}
                >
                  Set ETA
                </button>

              </div>

            )}

            <div style={items}>

              {o.items.map((i,idx)=>(
                <div key={idx}>
                  {i.name} × {i.qty} = ₹{i.price * i.qty}
                </div>
              ))}

            </div>

            <h4 style={total}>
              Total ₹{o.total}
            </h4>

          </div>

        ))}

      </div>

    </div>

  )
}