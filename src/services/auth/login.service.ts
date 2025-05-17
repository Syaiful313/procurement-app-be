import { User } from "@prisma/client";
import { JWT_SECRET_KEY } from "../../config/env";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { sign } from "jsonwebtoken";

interface Body extends Pick<User, "nik" | "password"> {}

export const loginService = async (body: Body) => {
  try {
    const { nik, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        nik,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found or has been deactivated");
    }

    if (user.password !== password) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { password: pw, ...userWithoutPassword } = user;

    const token = sign({ id: user.id, role: user.role }, JWT_SECRET_KEY!, {
      expiresIn: "2h",
    });

    return {
      ...userWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
};
