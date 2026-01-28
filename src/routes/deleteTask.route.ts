import { Router } from "express";
import { deleteTask } from "../controllers/deleteTask.controller";
import { validateParams } from "../middleware/validate";
import { idParamSchema } from "../schemas/task.schema";

const router = Router();

// Delete by ID (validate :id param only)
router.delete("/:id", validateParams(idParamSchema), deleteTask);

export default router;