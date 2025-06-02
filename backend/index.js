import express from "express";
import cors from "cors";
import UserRoute from "./route/UserRoute.js";
import AdminRoute from "./route/AdminRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', UserRoute);
app.use('/admins', AdminRoute);

app.listen(5001, () => console.log('Server running on port 5001'));