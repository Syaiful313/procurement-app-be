import { ProcurementStatus } from "@prisma/client";
import prisma from "../../config/prisma";
import { sendStatusUpdateEmail } from "../../lib/handlebars";
import { ApiError } from "../../utils/api-error";

export const updateProcurementStatusService = async (
  id: number,
  status: ProcurementStatus
) => {
  try {
    const procurement = await prisma.procurement.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!procurement) {
      throw new ApiError(404, `Procurement dengan ID ${id} tidak ditemukan`);
    }

    const oldStatus = procurement.status;

    const updatedProcurement = await prisma.procurement.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    if (oldStatus !== status) {
      try {
        await sendStatusUpdateEmail({
          procurementId: procurement.id,
          procurementOwnerEmail: procurement.user.email,
          procurementOwnerName: procurement.user.username,
          itemName: procurement.itemName,
          newStatus: status,
          department: procurement.department,
          updatedBy: "Admin Procurement",
        });
      } catch (emailError) {
        console.error("Gagal mengirim email:", emailError);
      }
    }

    return updatedProcurement;
  } catch (error) {
    throw error;
  }
};
