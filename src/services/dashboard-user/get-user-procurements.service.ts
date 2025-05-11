import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { PaginationQueryParams } from "../../types/pagination";
import { ApiError } from "../../utils/api-error";

interface GetUserProcurementsQueries extends PaginationQueryParams {
  search?: string;
  status?: string;
}

export const getUserProcurementsService = async (
  userId: number,
  queries: GetUserProcurementsQueries
) => {
  const user = await prisma.user.findFirst({
    where: { id: userId, deletedAt: null },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { page, take, sortBy, sortOrder, search, status } = queries;

  const whereClause: Prisma.ProcurementWhereInput = {
    userId,
  };

  if (search) {
    whereClause.description = { contains: search, mode: "insensitive" };
  }

  if (status) {
    whereClause.status = status as any;
  }

  const procurements = await prisma.procurement.findMany({
    where: whereClause,
    skip: (page - 1) * take,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
    
  });

  const count = await prisma.procurement.count({ where: whereClause });

  return {
    data: procurements,
    meta: { page, take, total: count },
  };
};