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
  URGENT: "Mendesak",
  COMPLEMENT: "Pelengkap",
  REJECTED: "Ditolak",
};

export const translateStatus = (status: string): string => {
  return (
    statusTranslations[status as keyof typeof statusTranslations] || status
  );
};

export const translateTrackingStatus = (status: string): string => {
  const statusTranslations: { [key: string]: string } = {
    DRAFT: "Draft",
    MEMO_DIAJUKAN_ADMIN_PR: "Memo Diajukan Admin PR",
    APPROVAL_ATASAN_PERTAMA: "Menunggu Persetujuan Atasan Pertama",
    APPROVAL_ATASAN_KEDUA: "Menunggu Persetujuan Atasan Kedua",
    PENGADAAN_CARI_HARGA: "Pengadaan Sedang Mencari Harga",
    APPROVAL_MANAGER_KANTOR: "Menunggu Persetujuan Manager Kantor",
    APPROVAL_DIROPS: "Menunggu Persetujuan Direktur Operasional",
    PENCETAKAN_PO: "Purchase Order Sedang Dicetak",
    PO_DIKIRIM_KE_VENDOR: "PO Telah Dikirim ke Vendor",
    VENDOR_PROSES_PENGIRIMAN: "Vendor Sedang Proses Pengiriman",
    BARANG_DIKIRIM_VENDOR: "Barang Telah Dikirim Vendor",
    BARANG_DI_GUDANG: "Barang Sudah Diterima di Gudang",
  };

  return statusTranslations[status] || status;
};