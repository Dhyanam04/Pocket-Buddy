import express from "express"
import multer from "multer"
import { addFood , listFood , removeFood} from "../controllers/foodcontroller.js";

const foodRouter = express.Router();

//image storage engine
const store = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:store})

foodRouter.post('/add' ,upload.single("image") , addFood)
foodRouter.get('/list' ,listFood)
foodRouter.post('/remove' ,removeFood)

foodRouter.get('/' , (req , res)=>{
    res.send("hiiie i am get request");
})



export default foodRouter