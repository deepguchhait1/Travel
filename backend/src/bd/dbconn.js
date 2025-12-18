import mongoose from "mongoose";

const DBconn=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        if(conn){
        console.log("DB is Connected ✅");
        }
    } catch (error) {
        console.log("DB is Not Connected || Dbconn Error :",error.message);
    }
}

export default DBconn;
