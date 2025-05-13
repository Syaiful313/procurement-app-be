import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const getProcurementByIdService = async (id: number) => {
  const procurement = await prisma.procurement.findUnique({
    where: { id },
  });

  if (!procurement) {
    throw new ApiError(404, `Procurement dengan ID ${id} tidak ditemukan`);
  }

  return procurement;
};
