import axios from "../axios";
import { createClient } from "../supabase/client";
import toast from "react-hot-toast";

const supabase = createClient();

export const createUser = async (data: any) => {
  const { id, fullname, email, course } = data;
  const res = await axios.post("/user-signup", {
    id,
    fullname,
    email,
    course
  })

  return res;
}

export const userExitsts = async (email: string) => {
  const res = await axios.post("/user-exists-by-email", {
    email
  })
  return res;
}

export const getCurrentUser = async () => {
  try {
    const res = await axios.get("/get-current-user");
    return res;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const sendMail = async (email: string) => {
  const res = await axios.post("/forgot-password", {
    email
  })
  return res;
}
