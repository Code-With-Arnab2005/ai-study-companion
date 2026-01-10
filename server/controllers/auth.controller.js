import { supabase } from "../lib/supabase/supabaseClient.js";

const signup = async(req, res) => {
    try {
        const { id, fullname, email, course } = req.body;
        if(!id || !fullname || !email || !course){
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

        if(error){
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Account created successfully", data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
}

export {
    signup
}