import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const DeleteProcurementService = async (
  procurementId: number,
  currentUserId: number,
  currentUserRole: string
) => {
  try {
    const procurement = await prisma.procurement.findUnique({
      where: { id: procurementId },
    });

    if (!procurement || procurement.deletedAt) {
      throw new ApiError(404, "Procurement not found");
    }

    if (currentUserRole !== "PROCUREMENT") {
      throw new ApiError(403, "Only PROCUREMENT role can delete procurements");
    }

    const deletedProcurement = await prisma.procurement.update({
      where: { id: procurementId },
      data: { deletedAt: new Date() },
    });

    return {
      status: "success",
      message: "Procurement deleted successfully",
      data: deletedProcurement,
    };
  } catch (error) {
    throw error;
  }
};
