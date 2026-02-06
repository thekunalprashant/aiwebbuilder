import OpenAI from "openai";
import { WebsiteSchema, buildGeneratePrompt } from "@aiwebbuilder/schema";

export class AiService {
  constructor(private readonly client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })) {}

  async generateWebsiteSchema(brief: string) {
    const response = await this.client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1",
      input: buildGeneratePrompt(brief),
      max_output_tokens: 1800
    });

    const text = response.output_text;
    const parsed = JSON.parse(text);
    return WebsiteSchema.parse(parsed);
  }
}
