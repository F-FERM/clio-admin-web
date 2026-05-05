import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";
import { ListShipManagementLogistics } from "@/interfaces/Home";

const BASE = "/ship-management";

export const getShipManagement = async (): Promise<ListShipManagementLogistics[]> => {
  try {
    const res = await axiosInstance.get(BASE);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const createShipManagement = async (data: Partial<ListShipManagementLogistics>) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const updateShipManagement = async (data: Partial<ListShipManagementLogistics> & { _id: string }) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const deleteShipManagement = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};
