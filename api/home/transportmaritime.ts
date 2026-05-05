import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";
import { ListTransportMaritime } from "@/interfaces/Home";

const BASE = "/transport-maritime";

export const getTransportMaritime = async (): Promise<ListTransportMaritime[]> => {
  try {
    const res = await axiosInstance.get(BASE);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const createTransportMaritime = async (data: Partial<ListTransportMaritime>) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const updateTransportMaritime = async (data: Partial<ListTransportMaritime> & { _id: string }) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const deleteTransportMaritime = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};
