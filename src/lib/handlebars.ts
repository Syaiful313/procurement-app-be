import handlebars from "handlebars";
import prisma from "../config/prisma";
import { notificationProcurementTemplate } from "../templates/NotificationProcurement";
import { statusUpdateTemplate } from "../templates/statusUpdateTemplate";
import {
  translateDepartment,
  translateStatus,
  translateTrackingStatus,
} from "../utils/translation";
import { transporter } from "./nodemailer";
import { trackingUpdateTemplate } from "../templates/TrackingUpdateTemplate";

export const sendProcurementNotificationEmail = async (data: {
  procurementId: number;
  username: string;
  description: string;
  department: string;
  date: Date;
  itemName: string;
  specification: string;
  quantity: number;
  unit: string;
  createdBy: string;
}) => {
  const {
    procurementId,
    username,
    description,
    department,
    date,
    itemName,
    specification,
    quantity,
    unit,
    createdBy,
  } = data;

  try {
    const procurementUsers = await prisma.user.findMany({
      where: {
        role: "PROCUREMENT",
        deletedAt: null,
      },
      select: {
        email: true,
        username: true,
      },
    });

    if (procurementUsers.length === 0) {
      console.warn(
        "Tidak ada user dengan role PROCUREMENT untuk menerima notifikasi"
      );
      return;
    }

    const template = handlebars.compile(notificationProcurementTemplate);

    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    const departmentIndonesia = translateDepartment(department as any);

    const emailPromises = procurementUsers.map(async (procurementUser) => {
      const html = template({
        recipientName: procurementUser.username,
        procurementId,
        username,
        description,
        department: departmentIndonesia,
        date: formattedDate,
        itemName,
        specification,
        quantity,
        unit,
        createdBy,
      });

      const mailOptions = {
        from: `"Sistem Pengadaan Barang" <${process.env.GMAIL_EMAIL}>`,
        to: procurementUser.email,
        subject: `Pengajuan Barang Baru - Departemen ${departmentIndonesia}`,
        html,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        throw error;
      }
    });

    await Promise.all(emailPromises);
  } catch (error) {
    throw error;
  }
};

export const sendStatusUpdateEmail = async (data: {
  procurementId: number;
  procurementOwnerEmail: string;
  procurementOwnerName: string;
  items: any[]; // Array item lengkap
  newStatus: string;
  department: string;
  updatedBy: string;
  note?: string;
}) => {
  const {
    procurementId,
    procurementOwnerEmail,
    procurementOwnerName,
    items,
    newStatus,
    department,
    updatedBy,
    note,
  } = data;

  try {
    const template = handlebars.compile(statusUpdateTemplate);

    const newStatusIndonesia = translateStatus(newStatus);
    const departmentIndonesia = translateDepartment(department as any);

    const updateDate = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    // Tambahkan nomor urut ke setiap item
    const itemsWithNumber = items.map((item, index) => ({
      ...item,
      number: index + 1
    }));

    const html = template({
      recipientName: procurementOwnerName,
      procurementId,
      items: itemsWithNumber, // Kirim items dengan nomor
      newStatus: newStatusIndonesia,
      department: departmentIndonesia,
      updatedBy,
      updateDate,
      note,
    });

    const mailOptions = {
      from: `"Sistem Pengadaan Barang" <${process.env.GMAIL_EMAIL}>`,
      to: procurementOwnerEmail,
      subject: `Update Status Pengadaan - Departemen ${departmentIndonesia}`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export const sendTrackingUpdateEmail = async (data: {
  procurementId: number;
  procurementOwnerEmail: string;
  procurementOwnerName: string;
  items: any[]; // Ubah menjadi array items
  oldTrackingStatus: string;
  newTrackingStatus: string;
  department: string;
  updatedBy: string;
}) => {
  const {
    procurementId,
    procurementOwnerEmail,
    procurementOwnerName,
    items,
    oldTrackingStatus,
    newTrackingStatus,
    department,
    updatedBy,
  } = data;

  try {
    const template = handlebars.compile(trackingUpdateTemplate);

    const oldTrackingStatusIndonesia =
      translateTrackingStatus(oldTrackingStatus);
    const newTrackingStatusIndonesia =
      translateTrackingStatus(newTrackingStatus);
    const departmentIndonesia = translateDepartment(department as any);

    const updateDate = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    // Tambahkan nomor urut ke setiap item
    const itemsWithNumber = items.map((item, index) => ({
      ...item,
      number: index + 1
    }));

    const html = template({
      recipientName: procurementOwnerName,
      procurementId,
      items: itemsWithNumber, // Kirim items dengan nomor
      oldTrackingStatus: oldTrackingStatusIndonesia,
      newTrackingStatus: newTrackingStatusIndonesia,
      department: departmentIndonesia,
      updatedBy,
      updateDate,
    });

    const mailOptions = {
      from: `"Sistem Pengadaan Barang" <${process.env.GMAIL_EMAIL}>`,
      to: procurementOwnerEmail,
      subject: `Update Tracking Pengadaan - Departemen ${departmentIndonesia}`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
