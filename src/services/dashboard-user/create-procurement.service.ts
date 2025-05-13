import prisma from "../../config/prisma";
import { sendProcurementNotificationEmail } from "../../lib/handlebars";
import { ApiError } from "../../utils/api-error";
import { Department } from "@prisma/client";

interface ProcurementBody {
  username: string;
  description: string;
  date: Date;
  department: Department;
  itemName: string;
  specification: string;
  quantity: number;
  unit: string;
  
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
        itemName: body.itemName,
        specification: body.specification,
        quantity: body.quantity,
        unit: body.unit,
        status: "WAITING_CONFIRMATION",
      },
    });

    try {
      await sendProcurementNotificationEmail({
        procurementId: result.id,
        username: result.username,
        description: result.description,
        status: result.status,
        department: result.department,
        date: result.date,
        itemName: result.itemName,
        specification: result.specification,
        quantity: result.quantity,
        unit: result.unit,
        createdBy: user.username,
      });
    } catch (emailError) {
      console.error("Gagal mengirim email notifikasi:", emailError);
    }

    return result;
  } catch (error) {
    throw error;
  }
};
