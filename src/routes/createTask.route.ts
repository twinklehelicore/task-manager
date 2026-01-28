import { Router } from "express";
import { createTask } from "../controllers/createTask.controller";
import { validateBody } from "../middleware/validate";
import { taskCreateSchema } from "../schemas/task.schema";

const router = Router();

router.post("/create",
  validateBody(taskCreateSchema),
  createTask
);

export default router;