type BuildPromptParams = {
    extractedText: string;
    userPrompt?: string;
};

export const buildPrompt = ({
    extractedText,
    userPrompt,
}: BuildPromptParams): string => {
    const baseInstruction = `
You are an AI that generates EXACTLY 5 multiple choice questions.

Rules:
- Focus mainly on the document text
- Each question must have 4 options
- Only ONE option is correct
- Return STRICT JSON (no explanation, no markdown)

JSON format:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "correct ans here (same as option)"
  }
]
`;

    // no user prompt
    if (!userPrompt || userPrompt.trim() === "") {
        return `
${baseInstruction}

Generate questions from the following document:

DOCUMENT:
${extractedText}
`;
    }

    // CASE 1 / 2: user prompt exists
    return `
${baseInstruction}

User instruction:
${userPrompt}

DOCUMENT:
${extractedText}
`;
};
