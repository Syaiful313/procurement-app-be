import prisma from "../../config/prisma";

export const updateProcurementNoteService = async (
  id: number,
  note: string
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
        note,
        updatedAt: new Date(),
      },
    });

    return updatedProcurement;
  } catch (error) {
    throw error;
  }
};
