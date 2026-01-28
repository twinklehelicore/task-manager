// src/schemas/task.schema.ts
import { z } from 'zod';

export const taskCreateSchema = z.object({
  title: z.string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title is too long" }),
  description: z.string().optional(),
  // in taskCreateSchema & taskUpdateSchema
  due_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Due date must be YYYY-MM-DD" })
    .optional(),   // or .datetime() if you want full ISO datetime
});

export const taskUpdateSchema = z.object({
  title: z.string()
    .min(1)
    .max(255)
    .optional(),
  description: z.string().optional(),
  // in taskCreateSchema & taskUpdateSchema
  due_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
}).refine(
  data => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update" }
);

// Keep idParamSchema as is
export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});