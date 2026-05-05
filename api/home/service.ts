import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";
import { ListOurService } from "@/interfaces/Home";

const BASE = "/our-service";

export const getServices = async (): Promise<ListOurService[]> => {
  try {
    const res = await axiosInstance.get(BASE);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const createService = async (data: Partial<ListOurService>) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const updateService = async (id: string, data: Partial<ListOurService>) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const deleteService = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};
