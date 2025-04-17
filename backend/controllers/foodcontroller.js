import foodModel from "../models/foodModel.js";
import fs from "fs"

//add fooditem
const addFood = async (req , res)=>{
    let imageFilename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:imageFilename,
    })
    try{
        await food.save();
        res.json({sucess:true , message:"Food Added"})
        console.log("post req done on postman check too")
    } catch(error){
        console.log(error);
        res.json({sucess:false , message:"Error"})
    }
}

const listFood = async (req ,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({sucess:true , data:foods})
    } catch(error) {
        console.log(error);
        res.json({sucess:false , message:"error"})
    }
}

// const removeFood = async (req , res)=>{
//     try{
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}` , ()=>{});

//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({sucess:true , message:"Food Removed"});
//     }catch{
//         console.log(error);
//         res.json({sucess:false , message:"error"})
//     }
// }

const removeFood = async (req, res) => { 
    try {
      const food = await foodModel.findById(req.body.id);
  
      if (!food) {
        return res.status(404).json({ success: false, message: "Food not found" });
      }
  
      console.log("Deleting image:", `uploads/${food.image}`);
  
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.log("❌ Failed to delete image:", err.message);
        } else {
          console.log("✅ Image deleted");
        }
      });
  
      await foodModel.findByIdAndDelete(req.body.id);
      console.log("🗑️ Food deleted from DB");
  
      res.json({ success: true, message: "Food Removed" });
    } catch (error) {
      console.log("💥 Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

export {addFood , listFood , removeFood}