import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("email").notEmpty().withMessage("Email is not valid").isEmail(),
  body("username").notEmpty().withMessage("Username is required"),
  body("nik").notEmpty().withMessage("NIK is required"),
  body("password").notEmpty().withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()[0].msg });
      return;
    }
    next();
  },
];

export const validateLogin = [
  body("nik").notEmpty().withMessage("NIK is required"),
  body("password").notEmpty().withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()[0].msg });
      return;
    }
    next();
  },
];

