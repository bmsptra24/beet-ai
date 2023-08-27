import { NextResponse, NextRequest } from "next/server";
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_OGRANIZATION,
});
configuration.baseOptions.headers = {
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
};

const openai = new OpenAIApi(configuration);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const data: string | null = searchParams.get("data");

  // empty data
  if (data === null)
    return NextResponse.json({
      message: "Empty JSON data",
      body: { role: "assistant", content: "Error...400" },
    });

  // invalid data
  let input;
  try {
    input = JSON.parse(data);
  } catch (parseError) {
    return NextResponse.json({
      message: "Invalid JSON data",
      body: { role: "assistant", content: "Error...400" },
    });
  }

  const params: CreateChatCompletionRequest = {
    messages: input,
    model: process.env.OPENAI_MODEL as string,
    temperature: Number(process.env.OPENAI_TEMPERATURE),
    max_tokens: Number(process.env.OPENAI_MAX_TOKEN),
    top_p: Number(process.env.OPENAI_TOP_P),
    frequency_penalty: Number(process.env.OPENAI_FREQUENCY_PENALTY),
    presence_penalty: Number(process.env.OPENAI_PRESENCE_PENALTY),
  };

  try {
    const response = await openai.createChatCompletion(params);
    const data = response.data.choices[0].message;
    // console.log({ data });
    return NextResponse.json(data);
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      message: error,
      body: { role: "assistant", content: "Error...404" },
    });
  }
}
