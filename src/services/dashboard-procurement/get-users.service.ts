import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination";
import prisma from "../../config/prisma";

interface GetUsersQuery extends PaginationQueryParams {
  role?: string;
}

export const getUsersService = async (query: GetUsersQuery) => {
  const { page, sortBy, sortOrder, take, role } = query;

  const whereClause: Prisma.UserWhereInput = {};

  whereClause.deletedAt = null;

  if (role) {
    whereClause.role = role as any;
  }

  const users = await prisma.user.findMany({
    where: whereClause,
    skip: (page - 1) * take,
    take: take,
    orderBy: {
      [sortBy]: sortOrder,
    },
    select: {
      id: true,
      nik: true,
      username: true,
      email: true,
      password: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const count = await prisma.user.count({ where: whereClause });

  return {
    data: users,
    meta: { page, take, total: count },
  };
};
