import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';
import type { ZodRawShape } from 'zod';

export const validateBody = (schema: ZodObject<ZodRawShape>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return res.status(400).json({ errors: formattedErrors });
      }
      next(error);
    }
  };
};

export const validateParams = (schema: ZodObject<ZodRawShape>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return res.status(400).json({ errors: formattedErrors });
      }
      next(error);
    }
  };
};