import { getUserFromToken } from "../lib/getUserFromToken.js";
import { NotesAgent } from "../lib/agents/NotesAgent.js";
import { supabase } from "../lib/supabase/supabaseClient.js";

const makeNotes = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { topic, depth, level } = req.body;
        if (!topic || !depth || !level) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const { data } = await supabase
        .from('generated_notes')
        .select('id')
        .eq('user_id', user.id)
        .eq('topic', topic)
        .eq('depth', depth)
        .eq('level', level)
        .maybeSingle();

        if(data){
            return res.status(400).json({ success: false, message: "Notes already exists with the same attributes" });
        }

        const notes = await NotesAgent({ topic, depth, level });
        if (!notes) {
            return res.status(500).json({ success: false, message: "Something went wrong" });
        }

        //store the notes into supabase table
        const { error } = await supabase
        .from('generated_notes')
        .insert([
            {
                user_id: user.id,
                topic,
                depth,
                level,
                notes
            }
        ])

        if(error){
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Notes generated successfully", notes });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getLatestGeneratdNotes = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { data, error } = await supabase
        .from('generated_notes')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)
        .limit(1)
        .single()

        if(error){
            return res.status(500).json({ success: false, message: error.message })
        }

        return res.status(200).json({ success: true, message: "Latest notes fetched successfully", note: data })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getAllGeneratedNotes = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { data, error } = await supabase
        .from('generated_notes')
        .select('*')
        .eq('user_id', user.id)

        if(error){
            return res.status(500).json({ success: false, message: error.message })
        }

        return res.status(200).json({ success: true, message: "All notes fetched successfully", note: data })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {
    makeNotes,
    getLatestGeneratdNotes,
    getAllGeneratedNotes
}