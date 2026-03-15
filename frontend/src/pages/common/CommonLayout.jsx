import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CommonLayout(){

return(

<div style={layout}>

<Navbar/>

<main style={content}>
<Outlet/>
</main>

<Footer/>

</div>

);

}

const layout={
minHeight:"100vh",
display:"flex",
flexDirection:"column",
background:"#f9fafb",
width:"100%",
overflowX:"hidden"   // ⭐ horizontal scroll remove
};

const content={
flex:1,
width:"100%",
maxWidth:"1200px",
margin:"0 auto",
padding:"20px",
boxSizing:"border-box"   // ⭐ padding width ke andar count hogi
};