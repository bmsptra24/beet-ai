// import { NextResponse, NextRequest } from "next/server";
// import { authentication } from "../middleware";
// import { getParam, respons } from "@/utils/api";
// import { prismaFindManyUsers, prismaFindUniqueUser } from "@/utils/prisma";

// // GET => Find
// // POST => Create
// // PUT => Update
// // DELETE => Delete

// /**
//  * Read
//  * @param total "one" | "many"
//  * @param id id user
//  */
// export async function GET(req: NextRequest) {
//   const total = getParam(req, "total");
//   const id = Number(getParam(req, "id"));

//   if (!authentication(req))
//     return NextResponse.json(respons.fail.auth, { status: 400 });

//   if (total !== "one")
//     if (total !== "many")
//       return NextResponse.json(respons.fail.auth, { status: 400 });

//   let data;
//   if (total === "one") data = await prismaFindUniqueUser({ id: id });
//   if (total === "many") data = await prismaFindManyUsers();

//   return NextResponse.json(data, { status: 200 });
// }

// export async function POST(req: NextRequest) {
//   // get the body
//   const body = await req.json();
//   console.log({ body });

//   return NextResponse.json("work");
// }
