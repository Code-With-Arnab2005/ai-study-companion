import { getUserFromToken } from "../lib/getUserFromToken.js";
import { supabase } from "../lib/supabase/supabaseClient.js";

const signup = async (req, res) => {
    try {
        const { id, fullname, email, course } = req.body;
        if (!id || !fullname || !email || !course) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    id,
                    fullname,
                    email,
                    course
                }
            ]);

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Account created successfully", data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

        if(error){
            return res.status(500).json({ success: false, message: error.message });
        }
        return res.status(200).json({ success: true, message: "User fetched successfully", user: data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {
    signup,
    getCurrentUser
}