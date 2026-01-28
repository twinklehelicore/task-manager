import express, { Application } from "express";
import dotenv from "dotenv";

// Import all route modules
import getTasksRoutes from "./routes/getTask.route";
import createTaskRoutes from "./routes/createTask.route";
import updateTaskRoutes from "./routes/updateTask.route";
import deleteTaskRoutes from "./routes/deleteTask.route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running!" });
});

// Mount all feature routes under the same base path
app.use("/api/tasks", getTasksRoutes);
app.use("/api/tasks", createTaskRoutes);
app.use("/api/tasks", updateTaskRoutes);
app.use("/api/tasks", deleteTaskRoutes);

// Optional: global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});