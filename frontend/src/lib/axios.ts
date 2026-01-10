import axios from "axios";
import { createClient } from "./supabase/client";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    }
});

//atach the accesstoken to the axios req
api.interceptors.request.use(
  async (config) => {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;