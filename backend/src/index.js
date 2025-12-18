import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import DBconn from "./bd/dbconn.js";
import curd from "./routes/curd.route.js"
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use("/api",curd);

// serve uploaded files
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));



app.listen(port, async () => {
  await DBconn();
  console.log(`Server is running in port ${port} || http://localhost:${port}/`);
});
