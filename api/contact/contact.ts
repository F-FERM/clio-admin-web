import { ListContactResponse } from "@/interfaces/Contact";
import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";

export const ListContactApi = async (data: {
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

    const response = await axiosInstance.get<ListContactResponse>(
      `/contact?${params.toString()}`,
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

const BASE = "/contact";

// CREATE
export const createContact = async (data: Partial<ListContactResponse>) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// UPDATE
export const updateContact = async (
  data: Partial<ListContactResponse> & { _id: string }
) => {
  try {
    const res = await axiosInstance.patch(BASE, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// DELETE
export const deleteContact = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};
