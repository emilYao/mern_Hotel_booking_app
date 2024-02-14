import express, {Request, Response} from "express";
import Cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from 'cloudinary'
import myHotelRoutes from "./routes/my-hotels";

const app = express();

app.use(Cors({origin: process.env.FRONTEND_URL, credentials:true}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/my-hotels", myHotelRoutes);

app.get("*", (req:Request, res:Response)=>{
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
})

cloudinary.config({ 
    cloud_name: process.env.ClOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

mongoose.connect(process.env.DBASE_URL as string)
.then(()=>{
    console.log("Connected to database" )
})
.catch((e:any)=>{
    console.log(e);
    process.exit(1);
})



app.listen(8000, ()=>{
    console.log("server running now")
})

