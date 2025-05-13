import { TrackingStatus } from "@prisma/client";
import prisma from "../../config/prisma";
import { sendTrackingUpdateEmail } from "../../lib/handlebars";
import { ApiError } from "../../utils/api-error";

export const updateTrackingStatusService = async (
  id: number,
  trackingStatus: TrackingStatus
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

    const oldTrackingStatus = procurement.trackingStatus;

    const updatedProcurement = await prisma.procurement.update({
      where: { id },
      data: {
        trackingStatus,
        updatedAt: new Date(),
      },
    });

    if (oldTrackingStatus !== trackingStatus) {
      try {
        await sendTrackingUpdateEmail({
          procurementId: procurement.id,
          procurementOwnerEmail: procurement.user.email,
          procurementOwnerName: procurement.user.username,
          itemName: procurement.itemName,
          oldTrackingStatus: oldTrackingStatus,
          newTrackingStatus: trackingStatus,
          department: procurement.department,
          updatedBy: "Admin Procurement",
        });
      } catch (emailError) {
        console.error("Gagal mengirim email tracking update:", emailError);
      }
    }

    return updatedProcurement;
  } catch (error) {
    throw error;
  }
};