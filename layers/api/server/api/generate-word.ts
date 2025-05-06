import { GoogleGenAI, Type } from "@google/genai";

export default defineEventHandler(async (event) => {
  const apiKey = useRuntimeConfig().geminiAPI

  const body = await readBody(event)

  const usedWords = body

  const ai = new GoogleGenAI({ apiKey })

  const text1 =  `You will be provided with a list of words that have already been used.
    Used words: ${usedWords.join(', ')}
    
    Follow these instructions:
    1. Generate a word that is appropriate for a 6th-grade level.
    2. Create a definition as a hint for the word. The definition should be challenging but not too difficult for a 6th grader to solve.
    3. Ensure that the hint is unique and has not been used before.
    4. Do not use any of the words in the list of used words.
    5. Output the word and the definition in the following format:
    
    **Word:** [word]
    **Hint (definition):** [definition]
    
    Example:
    
    **Word:** Planet
    **Hint (Definition):** I am a large ball of rock or gas that orbits a star. What am I?`;

  // To run this code you need to install the following dependencies:
  // npm install @google/genai mime
  // npm install -D @types/node

  const config = {
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      required: ["word", "hint"],
      properties: {
        word: {
          type: Type.STRING,
        },
        hint: {
          type: Type.STRING,
        },
      },
    },
  };
  const model = 'gemini-2.5-pro-preview-03-25';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: text1,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `The user wants a JSON object containing an English word appropriate for a 6th grader and a hint for that word.
The JSON object must conform to the provided schema:
\`\`\`json
{
  "hint": "string",
  "word": "string"
}
\`\`\`
Constraints:
- The hint must not be repeated (this implies I need to remember previous interactions, but for a single request, it means the hint shouldn't be self-repeating or trivially obvious).
- The hint should not contain the word itself.
- The word should be suitable for a 6th-grade level.
- I must not use words from a provided list (but no list was provided in this prompt). Since no list was provided, I will proceed without this constraint.
- The output must be *only* the JSON object, valid and parseable. No extra text, comments, or control tokens.

Plan:
1. Choose a 6th-grade level word. Let's try "analyze".
2. Create a hint for "analyze" that doesn't use the word "analyze". A good hint would be something like "To examine something carefully piece by piece."
3. Format the word and hint into the required JSON structure.

Let's try another word: "frequent".
Hint: "Happening often or regularly."

Let's try "benefit".
Hint: "An advantage or good thing you get from something."

Let's try "elaborate".
Hint: "To explain something in greater detail."

Let's pick "elaborate".
Word: "elaborate"
Hint: "To explain something in greater detail."
Check constraints:
- Word level: "elaborate" seems appropriate for 6th grade.
- Hint doesn't use the word: Yes.
- Hint isn't trivially obvious: Yes.
- JSON format: Correct schema.
- No forbidden words: No list provided.
- Only JSON output: Ensure no extra text.

JSON structure:
\`\`\`json
{
  "hint": "To explain something in greater detail.",
  "word": "elaborate"
}
\`\`\`
This looks correct.`,
        },
        {
          text: `{
  "hint": "To examine something closely and break it down into parts.",
  "word": "analyze"
}`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  if (!response.text) throw new Error('Error generating word')

  return JSON.parse(response.text)

})
