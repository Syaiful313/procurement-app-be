import { Request, Response, NextFunction } from "express";
import { getUserProcurementsService } from "../services/dashboard-user/get-user-procurements.service";
import { createProcurementService } from "../services/dashboard-user/create-procurement.service";

export const getUserProcurementsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id;
    const query = {
      page: parseInt(req.query.page as string) || 1,
      take: parseInt(req.query.take as string) || 10,
      sortOrder: (req.query.sortOrder as string) || "desc",
      sortBy: (req.query.sortBy as string) || "createdAt",
      search: (req.query.search as string) || "",
      status: (req.query.status as string) || "",
    };

    const result = await getUserProcurementsService(userId, query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const createProcurementController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id;

    const result = await createProcurementService(req.body, userId);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};
