import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const DeleteUserService = async (userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    });

    if (!user) {
      throw new ApiError(404, "User not found or already deleted");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });

    return {
      status: "success",
      message: "User has been successfully deleted",
      data: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        deletedAt: updatedUser.deletedAt,
      },
    };
  } catch (error) {
    throw error;
  }
};
