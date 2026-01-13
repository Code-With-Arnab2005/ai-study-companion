import axios from "../axios";
import { createClient } from "../supabase/client";
import toast from "react-hot-toast";

const supabase = createClient();

export const createUser = async (data: any) => {
    try {
        const { id, fullname, email, course } = data;
        const res = await axios.post("/user-signup", {
            id,
            fullname,
            email,
            course
        })

        return res;
    } catch (error: any) {
        console.log(error.message);
    }
}

export const userExitsts = async (email: string) => {
    try {
        const { data: existingUser, error} = await supabase.from('users').select('id').eq('email', email).maybeSingle();
        if(existingUser) return true;
        if(error) throw error;
        return false;
    } catch (error) {
        
    }
}

export const getCurrentUser = async () => {
  try {
    const res = await axios.get("/get-current-user");
    return res;
  } catch (error: any) {
    toast.error(error.message);
  }
};
