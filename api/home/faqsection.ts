import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";
import { ListFaqSection } from "@/interfaces/Home";

const BASE = "/faq-section";

export const getFaqSection = async (): Promise<ListFaqSection[]> => {
  try {
    const res = await axiosInstance.get(BASE);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const createFaqSection = async (data: Partial<ListFaqSection>) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const updateFaqSection = async (data: Partial<ListFaqSection> & { _id: string }) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const deleteFaqSection = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};
