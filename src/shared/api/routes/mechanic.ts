import { CompleteRentDto } from "@/shared/models/dto/rent.dto";
import axiosInstance from "../axios";

export const mechanicRoutes = {
  getAllVehicles: "/mechanic/all_vehicles",
  getPendingVehicles: "/mechanic/get_pending_vehicles",
  getInUseVehicles: "/mechanic/get_in_use_vehicles",
  searchVehicles: "/mechanic/search",

  reserveCheckCar: (id: number) => `/mechanic/check-car/${id}`,
  startDeliveryCar: `mechanic/start-delivery`,

  startCheckCar: "/mechanic/start",
  cancelCheckCar: "/mechanic/cancel",

  uploadBeforeCheckCar: "/mechanic/upload-photos-before",
  uploadAfterCheckCar: "/mechanic/upload-photos-after",

  completeCheckCar: "/mechanic/complete",

  getDeliveryVehicles: "/mechanic/get-delivery-vehicles",

  acceptDelivery: (id: number) => `/mechanic/accept-delivery/${id}`,
  completeDelivery: "/mechanic/complete-delivery",

  getCurrentDelivery: "/mechanic/current-delivery",

  uploadBeforeDelivery: "/mechanic/upload-delivery-photos-before",
  uploadAfterDelivery: "/mechanic/upload-delivery-photos-after",
};

export const mechanicActionsRoutes = {
  openVehicle: "/mechanic/open",
  closeVehicle: "/mechanic/close",
  giveKey: "/mechanic/give-key",
  takeKey: "/mechanic/take-key",
};

export const mechanicApi = {
  getAllVehicles: async () => {
    const response = await axiosInstance.get(mechanicRoutes.getAllVehicles);
    return response;
  },
  getPendingVehicles: async () => {
    const response = await axiosInstance.get(mechanicRoutes.getPendingVehicles);
    return response;
  },
  getInUseVehicles: async () => {
    const response = await axiosInstance.get(mechanicRoutes.getInUseVehicles);
    return response;
  },
  searchVehicles: async (search: string) => {
    const response = await axiosInstance.get(mechanicRoutes.searchVehicles, {
      params: { query: search },
    });
    return response.data;
  },
  reserveCheckCar: async (id: number) => {
    const response = await axiosInstance.post(
      mechanicRoutes.reserveCheckCar(id)
    );
    return response;
  },
  startDeliveryCar: async () => {
    const response = await axiosInstance.post(mechanicRoutes.startDeliveryCar);
    return response;
  },
  startCheckCar: async () => {
    const response = await axiosInstance.post(mechanicRoutes.startCheckCar);
    return response;
  },
  cancelCheckCar: async () => {
    const response = await axiosInstance.post(mechanicRoutes.cancelCheckCar);
    return response;
  },
  uploadBeforeCheckCar: async (formData: FormData) => {
    const response = await axiosInstance.post(
      mechanicRoutes.uploadBeforeCheckCar,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },

  uploadAfterCheckCar: async (formData: FormData) => {
    const response = await axiosInstance.post(
      mechanicRoutes.uploadAfterCheckCar,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },
  completeCheckCar: async (rentData: CompleteRentDto) => {
    const response = await axiosInstance.post(
      mechanicRoutes.completeCheckCar,
      rentData
    );
    return response;
  },
  getDeliveryVehicles: async () => {
    const response = await axiosInstance.get(
      mechanicRoutes.getDeliveryVehicles
    );
    return response;
  },
  acceptDelivery: async (id: number) => {
    const response = await axiosInstance.post(
      mechanicRoutes.acceptDelivery(id)
    );
    return response;
  },
  completeDelivery: async () => {
    const response = await axiosInstance.post(mechanicRoutes.completeDelivery);
    return response;
  },
  getCurrentDelivery: async () => {
    const response = await axiosInstance.get(mechanicRoutes.getCurrentDelivery);
    return response;
  },
  uploadBeforeDelivery: async (formData: FormData) => {
    const response = await axiosInstance.post(
      mechanicRoutes.uploadBeforeDelivery,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  },
  uploadAfterDelivery: async (formData: FormData) => {
    const response = await axiosInstance.post(
      mechanicRoutes.uploadAfterDelivery,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },
};

export const mechanicActionsApi = {
  openVehicle: async () => {
    const response = await axiosInstance.post(
      mechanicActionsRoutes.openVehicle
    );
    return response.data;
  },
  closeVehicle: async () => {
    const response = await axiosInstance.post(
      mechanicActionsRoutes.closeVehicle
    );
    return response.data;
  },
  giveKey: async () => {
    const response = await axiosInstance.post(mechanicActionsRoutes.giveKey);
    return response.data;
  },
  takeKey: async () => {
    const response = await axiosInstance.post(mechanicActionsRoutes.takeKey);
    return response.data;
  },
};
