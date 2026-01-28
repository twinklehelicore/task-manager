import { Request, Response } from "express";
import connection from "../db";
import { z } from "zod";
import { taskUpdateSchema } from "../schemas/task.schema";

type UpdateTaskInput = z.infer<typeof taskUpdateSchema>;

export const updateTask = (req: Request, res: Response) => {
  const id = req.params.id;
  const updates = req.body as UpdateTaskInput;

  // No need for manual "at least one field" check — Zod .refine already enforced it

  // Build dynamic SET clause (only update fields that were sent)
  const fields: string[] = [];
  const values: any[] = [];

  if (updates.title !== undefined) {
    fields.push("title = ?");
    values.push(updates.title);
  }
  if (updates.description !== undefined) {
    fields.push("description = ?");
    values.push(updates.description);
  }
  if (updates.due_date !== undefined) {
    fields.push("due_date = ?");
    values.push(updates.due_date);
  }

  if (fields.length === 0) {
    // This should not happen because of Zod refine, but as safety net
    return res.status(400).json({ message: "No fields to update" });
  }

  values.push(id);

  connection.query(
    `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
    values,
    (err, result: any) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });
      res.json({ message: "Task updated successfully" });
    }
  );
};