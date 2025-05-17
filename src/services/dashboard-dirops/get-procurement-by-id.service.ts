import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const getProcurementByIdService = async (id: number) => {
  const procurement = await prisma.procurement.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          nik: true,
          username: true,
          email: true,
          role: true,
        },
      },
      procurementItems: {
        select: {
          id: true,
          itemName: true,
          specification: true,
          quantity: true,
          unit: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!procurement) {
    throw new ApiError(404, `Procurement dengan ID ${id} tidak ditemukan`);
  }

  return procurement;
};
