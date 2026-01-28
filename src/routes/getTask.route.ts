import { Router } from "express";
import { getAllTasks, getTaskById } from "../controllers/getTask.controller";
import { validateParams } from "../middleware/validate";
import { idParamSchema } from "../schemas/task.schema";

const router = Router();

// List all (no body validation needed; query params are optional)
router.get("/", getAllTasks);

// Get one by ID (validate :id param)
router.get("/:id", validateParams(idParamSchema), getTaskById);

export default router;