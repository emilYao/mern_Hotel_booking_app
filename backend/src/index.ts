import express, {Request, Response} from "express";
import Cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(Cors({origin: process.env.FRONTEND_URL, credentials:true}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)


console.log(process.env.DBASE_URL)
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

