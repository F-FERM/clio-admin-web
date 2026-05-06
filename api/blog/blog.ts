import {
  Card,
  LisBlogResponse,
  UpdateBlogSectionPayload,
} from "@/interfaces/Blog";
import { ListFaqSection } from "@/interfaces/Home";
import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";
export interface ListBlogSection {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tag: string;
  tags: string[];
  date: string;
  isPublished: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export const ListBlogApi = async (data: {
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

    const queryString = params.toString();
    const response = await axiosInstance.get<LisBlogResponse>(
      `blog/home${queryString ? `?${queryString}` : ""}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data;
      const errorMessage =
        apiError?.error ||
        apiError?.message ||
        error.message ||
        "An unexpected error occurred";
      const normalizedError = new Error(errorMessage);

      (normalizedError as any).statusCode =
        apiError?.statusCode || error.response?.status;
      (normalizedError as any).raw = apiError;

      throw normalizedError;
    }
    throw error;
  }
};
export const ListBlogSectionApi = async (data: {
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

    const queryString = params.toString();
    const response = await axiosInstance.get<Card[]>(
      `blog${queryString ? `?${queryString}` : ""}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

const BASE = "/blog/home";

// CREATE
export const updateBlogHome = async (data: Partial<LisBlogResponse>) => {
  try {
    const res = await axiosInstance.patch(`blog/section`, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// CREATE BLOG POST
export const createBlogPost = async (data: any) => {
  try {
    const res = await axiosInstance.post(`blog`, data);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// UPDATE
export const updateBlog = async (
  id: string,
  data: any,
) => {
  try {
    const url = `blog/${id}`;
    console.log("Updating individual blog at:", url, "with data:", data);
    const res = await axiosInstance.patch(url, data);
    return res.data;
  } catch (error) {
    console.error("Update individual blog error:", error);
    throw (error as AxiosError).response?.data || (error as any).message;
  }
};

// UPDATE BLOG SECTION (Cards)
export const updateBlogSection = async (cards: Card[]) => {
  try {
    const res = await axiosInstance.patch(`blog/section`, { section: cards });
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// DELETE
export const deleteBlog = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`blog/${id}`);
    return res.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};
