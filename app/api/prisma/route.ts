// import { NextResponse, NextRequest } from "next/server";

// // GET => Find
// // POST => Create
// // PUT => Update
// // DELETE => Delete

// /**
//  * Read
//  * @param model "user" | "project"
//  */
// export async function GET(req: NextRequest) {
//   // get the params
//   const { searchParams } = new URL(req.url);
//   const data: string | null = searchParams.get("data");

//   return NextResponse.json("work");
// }

// export async function POST(req: NextRequest) {
//   // get the body
//   const body = await req.json();
//   console.log({ body });

//   return NextResponse.json("work");
// }
