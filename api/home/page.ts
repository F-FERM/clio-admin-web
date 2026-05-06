import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";
import { ListVesselLanding } from "@/interfaces/Home";

const BASE = "/vessel-landing";

// GET ALL
export const getHeroes = async (): Promise<ListVesselLanding[]> => {
  try {
    const res = await axiosInstance.get(BASE);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// CREATE
export const createHero = async (
  data: Partial<ListVesselLanding>
) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// UPDATE
export const updateHero = async (
  id: string,
  data: Partial<ListVesselLanding>
) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// DELETE
export const deleteHero = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};