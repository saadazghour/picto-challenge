import axios from "axios";
import { UnsplashPhoto } from "../../types";

const ACCESS_KEY: string = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "";

export const getPhotos = async (
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashPhoto[]> => {
  try {
    const res = await axios.get<UnsplashPhoto[]>(
      `https://api.unsplash.com/photos`,
      {
        params: {
          client_id: ACCESS_KEY,
          page,
          per_page: perPage,
        },
      }
    );

    const { data } = res;

    return data;
  } catch (error: any) {
    console.error("Error fetching photos from Unsplash:", error);
    throw error;
  }
};
