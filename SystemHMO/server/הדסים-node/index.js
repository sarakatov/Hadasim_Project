import  express  from "express";
import cors from 'cors'
import memberRouter from './routes/member.js'
import { connectToDB } from "./config/dbConection";
import { config } from "dotenv";
import bonusRouter from './routes/bonus.js'
config()
const app=express();
app.use(express.json());
app.use(cors());

connectToDB();
app.use("/api/members",memberRouter);
app.use("/api/bonus",bonusRouter);

let port = process.env.PORT || 4500;

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})