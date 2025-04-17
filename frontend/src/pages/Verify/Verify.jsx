import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from "axios"

const Verify = () => {
    
    const [searchParams , setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext) 
    const navigate = useNavigate();

    console.log(success , orderId);

    const verifyPayment = async ()=> {
        console.log(url + "/api/order/verify")
        const response = await axios.post(url + "/api/order/verify" , {orderId , success});
        console.log(response.data);
        if(response.data.success){
            console.log(response.data.success);
            
            navigate("/myorders");
        }
        else{
            navigate("/");
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <div className="verify">
        <div className="spinner"></div>
    </div>
  )
}

export default Verify