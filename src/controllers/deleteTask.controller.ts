import { Request, Response } from "express";
import connection from "../db";
//comment

export const deleteTask = (req: Request, res: Response) => {
  const id = req.params.id;

  connection.query("DELETE FROM tasks WHERE id = ?", [id], (err, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  });
};