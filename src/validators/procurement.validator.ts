import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateProcurement = [
  body("username").notEmpty().withMessage("Username is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("department")
    .notEmpty()
    .withMessage("Department is required")
    .isIn(["PURCHASE", "FACTORY", "OFFICE"])
    .withMessage("Invalid department"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one item is required"),

  body("items.*.itemName").notEmpty().withMessage("Item name is required"),

  body("items.*.specification")
    .notEmpty()
    .withMessage("Specification is required"),

  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  body("items.*.unit").notEmpty().withMessage("Unit is required"),

  body("items.*.description")
    .notEmpty()
    .withMessage("Item description is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array()[0].msg });
      return;
    }
    next();
  },
];
