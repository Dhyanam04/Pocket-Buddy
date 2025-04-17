import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets/frontend_assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = `http://localhost:8000`;//this is backend url and we need to put this in .env
    
    const [cartItems , setCartItems] = useState({});

    const [token , setToken] = useState("");
    const [food_list , setFoodList] = useState([])

    useEffect(()=>{
        async function loadData(){
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
            await fetchFoodList()
            await loadcartData(localStorage.getItem("token"))
        }
        loadData()
    },[])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev , [itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }

        if(token){
            const response = await axios.post(url + "/api/cart/add" , {itemId} , {headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev , [itemId]:prev[itemId]-1}))
        //no need of worrying about the negative values because fooditems.jsx has that resolved see !cartId on ternary operator

        if(token){
            const response = await axios.post(url + "/api/cart/remove" , {itemId} , {headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async ()=>{
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data.data)
    }

    const loadcartData = async (token)=>{
        const response = await axios.post(url + "/api/cart/get" , {} , {headers:{token}})
        setCartItems(response.data.cartData || {});
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider