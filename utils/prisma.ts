import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
type Table = "user";

type Id = { id: number };
type Name = { name: string };
type Username = { username: string };
type Email = { email: string };
type EmailBackup = { emailBackup: string };
type Password = { password: string };
type CreatedAt = { createdAt: Date };

export type Where = Prisma.UserWhereUniqueInput;
export type Data = Prisma.UserCreateInput;
export type User = Email | Password;

export const prismaFindMany = async (table: Table) => {
  return await prisma?.[`${table}`].findMany();
};

export const prismaFindUnique = async (
  table: Table,
  where: Prisma.UserWhereUniqueInput
): Promise<User | null> => {
  return await prisma?.[`${table}`].findUnique({ where: where });
};

export const prismaCreate = async (table: Table, data: Data) => {
  return await prisma?.[`${table}`].create({ data });
};

export const prismaUpdate = async (table: Table, where: Where, data: Data) => {
  return await prisma?.[`${table}`].update({ where, data });
};

export const prismaDelete = async (table: Table, where: Where) => {
  return await prisma?.[`${table}`].deleteMany({ where });
};
