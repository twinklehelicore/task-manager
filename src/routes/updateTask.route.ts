import { Router } from "express";
import { updateTask } from "../controllers/updateTask.controller";
import { validateBody } from "../middleware/validate";
import { taskUpdateSchema } from "../schemas/task.schema";
import { validateParams } from "../middleware/validate";
import { idParamSchema } from "../schemas/task.schema";

const router = Router();

router.put(
  "/update/:id",
  validateParams(idParamSchema),
  validateBody(taskUpdateSchema),
  updateTask
);

export default router;