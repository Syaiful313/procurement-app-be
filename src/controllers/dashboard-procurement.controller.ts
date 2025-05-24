import { NextFunction, Request, Response } from "express";
import { DeleteProcurementService } from "../services/dashboard-procurement/delete-procurement-service.service";
import { DeleteUserService } from "../services/dashboard-procurement/delete-user.service";
import { getUsersService } from "../services/dashboard-procurement/get-users.service";
import { updateProcurementNoteService } from "../services/dashboard-procurement/update-procurement-note.service";
import { updateTrackingStatusService } from "../services/dashboard-procurement/update-tracking-status.service";
import { ApiError } from "../utils/api-error";

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      page: parseInt(req.query.page as string) || 1,
      take: parseInt(req.query.take as string) || 10,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as string) || "desc",
      role: (req.query.role as string) || "",
    };
    const result = await getUsersService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateProcurementNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { note } = req.body;
    const result = await updateProcurementNoteService(id, note);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateTrackingStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { trackingStatus } = req.body;
    const result = await updateTrackingStatusService(id, trackingStatus);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const DeleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const currentUserId = res.locals.userId;
    const currentUserRole = res.locals.userRole;

    if (!currentUserId || !currentUserRole) {
      throw new ApiError(401, "Unauthorized - User not authenticated");
    }

    const result = await DeleteUserService(
      userId,
      currentUserId,
      currentUserRole
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const DeleteProcurementController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const procurementId = parseInt(req.params.id);
    const currentUserId = res.locals.userId;
    const currentUserRole = res.locals.userRole;

    if (!currentUserId || !currentUserRole) {
      throw new ApiError(401, "Unauthorized");
    }

    if (isNaN(procurementId)) {
      throw new ApiError(400, "Invalid procurement ID");
    }

    const result = await DeleteProcurementService(
      procurementId,
      currentUserId,
      currentUserRole
    );
    
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
