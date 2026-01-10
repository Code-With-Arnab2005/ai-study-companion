import { supabase } from "./supabase/supabaseClient.js";

export const getUserFromToken = async(req) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if(!token) return null;

    const { data, error } = await supabase.auth.getUser(token);

    if(error){
        console.log(error.message);
        return null;
    }
    return data.user;
}