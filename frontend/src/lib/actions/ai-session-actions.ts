import axios from "../axios";
import toast from "react-hot-toast"


export const generateNotes = async ({ topic, depth, level }: { topic: string, depth: string, level: string }) => {
    try {
        const res = await axios.post("/make-topic-notes", {
            topic,
            depth,
            level
        })
        return res;
    } catch (error: any) {
        console.log(error);
        toast.error(error.message);
    }
}