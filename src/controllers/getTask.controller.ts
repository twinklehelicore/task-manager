import { Request, Response } from "express";
import connection from "../db";
import { Task } from "../models/task.model";

export const getAllTasks = (req: Request, res: Response) => {
  let query = "SELECT * FROM tasks";
  const title = req.query.title as string;

  if (title) {
    query += ` WHERE LOWER(title) LIKE '%${title.toLowerCase()}%'`;
  }

  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

export const getTaskById = (req: Request, res: Response) => {
  const id = req.params.id;
  connection.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results: any[]) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Task not found" });
    res.json(results[0]);
  });
};