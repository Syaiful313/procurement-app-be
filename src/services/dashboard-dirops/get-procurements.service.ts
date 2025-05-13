import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination";
import prisma from "../../config/prisma";

interface GetProcurementsQuery extends PaginationQueryParams {
  status?: string;
  department?: string;
}

export const getProcurementsService = async (query: GetProcurementsQuery) => {
  const { page, sortBy, sortOrder, take, status , department } = query;

  const whereClause: Prisma.ProcurementWhereInput = {};

  if (status) {
    whereClause.status = status as any;
  }
  if (department) {
    whereClause.department = department as any;
  }

  const procurements = await prisma.procurement.findMany({
    where: whereClause,
    skip: (page - 1) * take,
    take: take,
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
