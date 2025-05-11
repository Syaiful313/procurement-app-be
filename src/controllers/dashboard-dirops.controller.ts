import { NextFunction, Request, Response } from "express";
import { getProcurementsService } from "../services/dashboard-dirops/get-procurements.service";
import { updateProcurementStatusService } from "../services/dashboard-dirops/update-procurement-status.service";
import { getProcurementByIdService } from "../services/dashboard-dirops/get-procurement-by-id.service";

export const getProcurementsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      take: parseInt(req.query.take as string) || 6,
      page: parseInt(req.query.page as string) || 1,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as string) || "desc",
      search: (req.query.search as string) || "",
      status: (req.query.status as string) || "",
    };
    const result = await getProcurementsService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateProcurementStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const result = await updateProcurementStatusService(id, status);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getProcurementByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await getProcurementByIdService(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
