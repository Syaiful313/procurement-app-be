import { Request, Response, NextFunction } from "express";
import { updateProcurementNoteService } from "../services/dashboard-procurement/update-procurement-note.service";
import { getUsersService } from "../services/dashboard-procurement/get-users.service";
import { DeleteUserService } from "../services/dashboard-procurement/delete-user.service";

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

export const DeleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await DeleteUserService(userId);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
