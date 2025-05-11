import { ProcurementStatus } from "@prisma/client";
import prisma from "../../config/prisma";

export const updateProcurementStatusService = async (
  id: number,
  status: ProcurementStatus
) => {
  try {
    const procurement = await prisma.procurement.findUnique({
      where: { id },
    });

    if (!procurement) {
      throw new Error(`Procurement dengan ID ${id} tidak ditemukan`);
    }

    const updatedProcurement = await prisma.procurement.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    return updatedProcurement;
  } catch (error) {
    console.error("Gagal mengubah status procurement:", error);
    throw error;
  }
};
