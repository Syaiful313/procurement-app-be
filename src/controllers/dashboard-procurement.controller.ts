import { Request, Response, NextFunction } from "express";
import { updateProcurementNoteService } from "../services/dashboard-procurement/update-procurement-note.service";

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
