import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const registerService = async (body: User) => {
  const { email, password, username, nik, role = "USER" } = body;

  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [
        {
          OR: [{ email }, { username }, { nik }],
        },
        {
          deletedAt: null,
        },
      ],
    },
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  return await prisma.user.create({
    data: {
      email,
      username,
      nik,
      password,
      role,
    },
    select: {
      id: true,
      email: true,
      username: true,
      nik: true,
      password: true,
      role: true,
      createdAt: true,
    },
  });
};
