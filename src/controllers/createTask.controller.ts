import { Request, Response } from "express";
import connection from "../db";
import { z } from "zod";
import { taskCreateSchema } from "../schemas/task.schema";

type CreateTaskInput = z.infer<typeof taskCreateSchema>;

export const createTask = (req: Request, res: Response) => {
  const task = req.body as CreateTaskInput;

  connection.query(
    "INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)",
    [
      task.title,
      task.description || null,
      task.due_date || null
    ],
    (err, result: any) => {
      if (err) {
        console.error("SQL Insert Error:", err.message); // ← added for better debugging
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ id: result.insertId, ...task });
    }
  );
};