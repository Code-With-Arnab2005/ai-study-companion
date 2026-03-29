import useSWR from "swr";
import axios from "../axios";
import toast from "react-hot-toast"
import { fetcher } from "../swr/helper";


export const generateNotes = async ({ topic, depth, level }: { topic: string, depth: string, level: string }) => {
    const res = await axios.post("/make-topic-notes", {
        topic,
        depth,
        level
    })
    return res;
}

export const getLatestNote = async () => {
    const res = await axios.get("/get-latest-generated-notes");
    return res;
}