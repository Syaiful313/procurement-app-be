import { Response, Request, NextFunction } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send({
      message: "Authorization failed, token is missing",
    });
    return;
  }

  req.path;

  verify(token, JWT_SECRET_KEY!, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).send({
          message: "Authorization failed, token is expired",
        });
        return;
      } else {
        res.status(401).send({
          message: "Authorization failed, token is invalid",
        });
        return;
      }
    }
    res.locals.user = payload;

    next();
  });
};


