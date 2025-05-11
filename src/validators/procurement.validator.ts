import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateProcurement = [
  body("username").notEmpty().withMessage("Username is required"),
  body("description").notEmpty().withMessage("Description is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()[0].msg });
      return;
    }
    next();
  },
];
