import { getUserFromToken } from "../lib/getUserFromToken.js";
import { NotesAgent } from "../lib/agents/NotesAgent.js";

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

        const notes = await NotesAgent({ topic, depth, level });
        if (!notes) {
            return res.status(500).json({ success: false, message: "Something went wrong" });
        }
        return res.status(200).json({ success: true, message: "Notes generated successfully", notes });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {
    makeNotes
}