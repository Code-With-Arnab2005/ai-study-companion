import { ai } from "../../config/gemini.js";

export const NotesAgent = async ({ topic, depth="short", level="beginner" }) => {
    const prompt = `
        You are an expert notes creator on a given topic.
        Make notes on the given topic, accorging to the depth and level

        topic: ${topic}
        depth: ${depth}
        level: ${level}

        Give the response in educational format, don't use extra emojis.

        Rules:
            1. Use proper headings
            2. Use bullet points to make the points clear
            3. Highlight Key terms
            4. Don't use any extra words, just give me heading of the topic, and give notes on this topic
            5.  Do NOT say phrases like "Here are", "Below are", "These notes"
    `
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })
        return response.text;
    } catch (error) {
        console.log(error);
        throw error;
    }
}