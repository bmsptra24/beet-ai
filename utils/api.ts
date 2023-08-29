import { NextRequest } from "next/server";

export const respons = {
  fail: {
    auth: {
      status: "error",
      error_code: "invalid_api_key",
      message:
        "The API key you provided is not valid. Please check and try again.",
    },
  },
};

export const getParam: (req: NextRequest, query: string) => string | null = (
  req,
  query
) => {
  const { searchParams } = new URL(req.url);
  return searchParams.get(query);
};
