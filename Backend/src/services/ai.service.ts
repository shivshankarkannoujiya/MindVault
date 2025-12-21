import OpenAI from "openai";
import { ENV } from "../config/env.js";

const AI = new OpenAI({
    apiKey: ENV.PERPLEXITY_API_KEY,
    baseURL: `https://api.perplexity.ai`,
});

export const generateSummary = async (input: string) => {
    const isUrl = input.startsWith("http");

    const userMessage = isUrl
        ? `Please summarize the content found at this URL: ${input}`
        : `Please summarize the following video transcript: ${input}`;

const systemPrompt = `
### PERSONA
You are a high-density Knowledge Synthesizer for a "Second Brain" system.

### DATA SOURCE
[TRANSCRIPT START]
${userMessage}
[TRANSCRIPT END]

### OBJECTIVE
Distill the text between the [TRANSCRIPT] tags into a structured summary.

### MANDATORY OUTPUT SCHEMA
1. One concise paragraph (max 3 sentences) synthesizing the core thesis.
2. Exactly 3 bullet points representing the most unique/actionable insights.

### STRICTURES (CRITICAL)
- **NO CHATTINESS**: Do not say "Here is the summary" or "Based on the transcript".
- **NO CITATIONS**: Do not include any footnotes like [1], [3], or [6].
- **NO HALLUCINATION**: Only use info from the provided [TRANSCRIPT] block. If empty, return "ERROR: DATA_MISSING".
- **SPECIFICITY**: Focus on the specific video content, NOT the general technology used.
`;

    const response = await AI.chat.completions.create({
        model: "sonar",
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userMessage,
            },
        ],
    });
    return response.choices[0]?.message.content;
};
