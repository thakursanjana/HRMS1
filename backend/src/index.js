import express from "express";
import "dotenv/config";
import cors from "cors";                    
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./lib/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());                            
app.use(express.json());                    


app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/departments", departmentRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
