import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const updateProcurementNoteService = async (
  id: number,
  note: string
) => {
  try {
    const procurement = await prisma.procurement.findUnique({
      where: { id },
    });

    if (!procurement) {
      throw new ApiError(404, `Procurement dengan ID ${id} tidak ditemukan`);
    }

    const updatedProcurement = await prisma.procurement.update({
      where: { id },
      data: {
        note,
        updatedAt: new Date(),
      },
    });

    return updatedProcurement;
  } catch (error) {
    throw error;
  }
};
