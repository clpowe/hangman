import { GoogleGenAI, Type } from "@google/genai";

export default defineEventHandler(async (event) => {
  const apiKey = useRuntimeConfig().geminiAPI

  const body = await readBody(event)

  const usedWords = body

  const ai = new GoogleGenAI({ apiKey })

  const res = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Give me a random English word and a hint. Words should be on a 6th grade level. Avoid using the words in this list ${usedWords}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          "word": {
            type: Type.STRING
          },
          "hint": {
            type: Type.STRING
          }
        },
        "required": [
          "word",
          "hint"
        ]
      }
    }
  })
  if (!res.text) throw new Error('Error generating word')

  return JSON.parse(res.text)

})
