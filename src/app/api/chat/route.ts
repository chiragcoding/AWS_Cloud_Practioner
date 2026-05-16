import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, topic } = await req.json();

  const systemPrompt = `You are an AWS Cloud Practitioner exam tutor. You are helping a student study for the CLF-C02 exam.

The student is currently studying the topic: "${topic}".

Rules:
- Keep answers concise and exam-focused
- Use bullet points for clarity
- Highlight exam tips when relevant
- If the student asks something outside AWS Cloud Practitioner scope, gently redirect them
- Use simple analogies to explain complex concepts
- When relevant, mention what the exam might ask about this topic
- Be encouraging and supportive`;

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
