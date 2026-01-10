import { User } from "@/types";
import axios from "../axios";
import { createClient } from "../supabase/client";

const supabase = createClient();

export const createUser = async (data: User) => {
    try {
        const { id, fullname, email, course } = data;

        const res = await axios.post("/user-signup", {
            id,
            fullname,
            email,
            course
        })
        console.log("auth-actions page: ", res)

        return res;
    } catch (error) {
        console.log(error);
    }
}

export const userExitsts = async (email: string) => {
    try {
        const { data: existingUser, error} = await supabase.from('users').select('id').eq('emaail', email).maybeSingle();
        if(existingUser) return true;
        if(error) throw error;
        return false;
    } catch (error) {
        
    }
}

export const getCurrentUser = async (): Promise<User | null> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data;
};
