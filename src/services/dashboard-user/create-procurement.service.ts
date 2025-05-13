import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { Department } from "@prisma/client";

interface ProcurementBody {
  username: string;
  description: string;
  date: Date;
  department: Department;
}

export const createProcurementService = async (
  body: ProcurementBody,
  userId: number
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ApiError(404, "User tidak ditemukan");
    }

    if (!body.username) {
      throw new ApiError(400, "Username tidak boleh kosong");
    }

    if (!body.description) {
      throw new ApiError(400, "Deskripsi tidak boleh kosong");
    }

    if (!body.department) {
      throw new ApiError(400, "Department tidak boleh kosong");
    }

    const validDepartments = ["PURCHASE", "FACTORY", "OFFICE"];
    
    if (!validDepartments.includes(body.department)) {
      throw new ApiError(400, "Department tidak valid");
    }

    const result = await prisma.procurement.create({
      data: {
        userId: user.id,
        username: body.username,
        description: body.description,
        date: body.date,
        department: body.department,
        status: "WAITING_CONFIRMATION",
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};