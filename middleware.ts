import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  return NextResponse.next();
};
export default middleware;

export const config = {
  matcher: ["/home/:path*", "/api/admin/:path*"],
};
