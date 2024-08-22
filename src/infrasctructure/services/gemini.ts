import { GoogleGenerativeAI } from "@google/generative-ai";



export default class Gemini {
    constructor(

    ) { }

    async GenerateText(prompt: string) {
        if (process.env.GEMINI_API_KEY) {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            return result.response.text()
        }
    }


}