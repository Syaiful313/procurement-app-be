import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination";
import prisma from "../../config/prisma";

interface GetProcurementsQuery extends PaginationQueryParams {
  search: string;
  status: string;
}

export const getProcurementsService = async (query: GetProcurementsQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search, status } = query;

    const whereClause: Prisma.ProcurementWhereInput = {};

    if (search) {
      whereClause.OR = [
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (status) {
      whereClause.status = status as any;
    }

    const blogs = await prisma.procurement.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const count = await prisma.procurement.count({ where: whereClause });

    return {
      data: blogs,
      meta: {
        page,
        take,
        total: count,
      },
    };
  } catch (error) {
    throw error;
  }
};
