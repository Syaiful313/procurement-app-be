import { Department } from "@prisma/client";

const departmentTranslations: Record<Department, string> = {
  PURCHASE: "Pembelian",
  FACTORY: "Pabrik",
  OFFICE: "Kantor",
};

export const translateDepartment = (department: Department): string => {
  return departmentTranslations[department] || department;
};

const statusTranslations = {
  WAITING_CONFIRMATION: "Menunggu Konfirmasi",
  PRIORITAS: "Prioritas",
  URGENT: "Urgent",
  COMPLEMENT: "Pelengkap",
  REJECTED: "Ditolak",
};

export const translateStatus = (status: string): string => {
  return (
    statusTranslations[status as keyof typeof statusTranslations] || status
  );
};
