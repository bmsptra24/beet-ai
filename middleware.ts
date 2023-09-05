import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const middleware = (req: NextRequest) => {
  return NextResponse.next();
};

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ req, token }) => {
      const urlStartWith = (searchString: string) =>
        req.nextUrl.pathname.startsWith(searchString);
      console.log({ token });

      if (urlStartWith("/home") && !token) return false;
      if (urlStartWith("/studio") && !token) return false;

      return true;
    },
  },
});
