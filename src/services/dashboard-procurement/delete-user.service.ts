import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const DeleteUserService = async (
  userId: number,
  currentUserId: number,
  currentUserRole: string
) => {
  try {
    if (currentUserRole !== "PROCUREMENT") {
      throw new ApiError(403, "Only PROCUREMENT can delete users");
    }

    if (userId === currentUserId) {
      throw new ApiError(400, "Cannot delete your own account");
    }

    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userToDelete || userToDelete.deletedAt) {
      throw new ApiError(404, "User not found or already deleted");
    }

    if (userToDelete.role === "PROCUREMENT") {
      const procurementCount = await prisma.user.count({
        where: {
          role: "PROCUREMENT",
          deletedAt: null,
          id: { not: userId },
        },
      });

      if (procurementCount === 0) {
        throw new ApiError(400, "Cannot delete the last PROCUREMENT admin");
      }
    }

    const deletedUser = await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });

    return {
      status: "success",
      message: "User has been successfully deleted",
      data: deletedUser,
    };
  } catch (error) {
    throw error;
  }
};
