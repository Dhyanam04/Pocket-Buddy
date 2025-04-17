import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import connectDB from './config/DB.js';
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";

//.env config
dotenv.config();

//app config
// const PORT = process.env.PORT || 8000
const PORT = process.env.PORT
const app = express()

//middlewares
app.use(express.json())
app.use(cors())

//database connection
connectDB()


//api endpoints
app.use('/api/food' , foodRouter)
app.use("/images" , express.static('uploads'))
app.use("/api/user" , userRouter)
app.use("/api/cart" , cartRouter)
app.use("/api/order" , orderRouter)



//app - methods
app.get('/' , (req , res)=>{
    res.send("api working");
})




//app start
app.listen(PORT , ()=>{
    console.log(`Server Started on http://localhost:${PORT}`);
})