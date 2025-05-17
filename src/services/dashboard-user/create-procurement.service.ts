import prisma from "../../config/prisma";
import { sendProcurementNotificationEmail } from "../../lib/handlebars";
import { ApiError } from "../../utils/api-error";
import { Department } from "@prisma/client";

interface ProcurementItemInput {
  itemName: string;
  specification: string;
  quantity: number;
  unit: string;
  description: string;
}

interface ProcurementBody {
  username: string;
  date: Date;
  department: Department;
  items: ProcurementItemInput[];
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

    if (!body.department) {
      throw new ApiError(400, "Department tidak boleh kosong");
    }

    if (!body.items || body.items.length === 0) {
      throw new ApiError(400, "Minimal harus ada satu item procurement");
    }

    const validDepartments = ["PURCHASE", "FACTORY", "OFFICE"];

    if (!validDepartments.includes(body.department)) {
      throw new ApiError(400, "Department tidak valid");
    }

    for (const item of body.items) {
      if (!item.itemName) {
        throw new ApiError(400, "Nama item tidak boleh kosong");
      }
      if (!item.specification) {
        throw new ApiError(400, "Spesifikasi tidak boleh kosong");
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new ApiError(400, "Quantity harus lebih dari 0");
      }
      if (!item.unit) {
        throw new ApiError(400, "Unit tidak boleh kosong");
      }
      if (!item.description) {
        throw new ApiError(400, "Description item tidak boleh kosong");
      }
    }

    const result = await prisma.procurement.create({
      data: {
        userId: user.id,
        username: body.username,
        date: body.date,
        department: body.department,
        status: "WAITING_CONFIRMATION",
        procurementItems: {
          create: body.items.map((item) => ({
            itemName: item.itemName,
            specification: item.specification,
            quantity: item.quantity,
            unit: item.unit,
            description: item.description,
          })),
        },
      },
      include: {
        procurementItems: true,
      },
    });

    try {
      const itemsDescription = result.procurementItems
        .map(
          (item, index) =>
            `No. ${index + 1}: ${item.itemName} - ${item.specification} (${
              item.quantity
            } ${item.unit})\nKeterangan: ${item.description}`
        )
        .join("\n\n");

      const firstItem = result.procurementItems[0];
      await sendProcurementNotificationEmail({
        procurementId: result.id,
        username: result.username,
        description: `${itemsDescription}`,
        department: result.department,
        date: result.date,
        itemName: firstItem.itemName,
        specification: firstItem.specification,
        quantity: firstItem.quantity,
        unit: firstItem.unit,
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
