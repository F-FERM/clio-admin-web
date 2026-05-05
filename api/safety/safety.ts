import { ListSafetyResponse } from "@/interfaces/Safety";
import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";

export const ListSafetyApi = async (data: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, page, limit } = data;
  try {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (page) {
      params.append("page", page.toString());
    }
    if (limit) {
      params.append("limit", limit.toString());
    }

    const response = await axiosInstance.get<ListSafetyResponse>(
      `/safety?${params.toString()}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data;
      const errorMessage = apiError?.error || apiError?.message || error.message || "An unexpected error occurred";
      const normalizedError = new Error(errorMessage);

      (normalizedError as any).statusCode = apiError?.statusCode || error.response?.status;
      (normalizedError as any).raw = apiError;

      throw normalizedError;
    }
    throw error;
  }
};

const BASE = "/safety";

// CREATE
export const createSafety = async (data: Partial<ListSafetyResponse>) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// UPDATE
export const updateSafety = async (
  data: Partial<ListSafetyResponse> & { _id: string }
) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// DELETE
export const deleteSafety = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};
