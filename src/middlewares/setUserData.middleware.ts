import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { ApiError } from "../utils/api-error";

export const setUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    res.locals.userId = user.id;
    res.locals.userRole = user.role;

    next();
  } catch (error) {
    next(error);
  }
};
