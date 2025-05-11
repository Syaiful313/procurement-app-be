import prisma from "../../config/prisma";

export const getProcurementByIdService = async (id: number) => {
  try {
    const procurement = await prisma.procurement.findUnique({
      where: { id },
    });

    if (!procurement) {
      throw new Error(`Procurement dengan ID ${id} tidak ditemukan`);
    }

    return procurement;
  } catch (error) {
    throw error;
  }
};
