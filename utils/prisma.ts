"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type Where =
  | Prisma.UserWhereUniqueInput
  | Prisma.ProjectWhereUniqueInput;

type WhereUser = Prisma.UserWhereUniqueInput;
type WhereProject = Prisma.ProjectWhereUniqueInput;

export const prismaFindManyUsers = async () => {
  return prisma.user.findMany();
};

export const prismaFindManyProjects = async () => {
  return prisma.project.findMany();
};

export const prismaFindUniqueUser = async (where: WhereUser) => {
  return prisma.user.findUnique({ where });
};

export const prismaFindUniqueProject = async (where: WhereProject) => {
  return prisma.project.findUnique({ where });
};

export const prismaCreateUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};

export const prismaCreateProject = async (data: Prisma.ProjectCreateInput) => {
  return prisma.project.create({ data });
};

export const prismaUpdateUser = async (
  where: WhereUser,
  data: Prisma.UserUpdateInput
) => {
  return prisma.user.update({ where, data });
};

export const prismaUpdateProject = async ({
  where,
  data,
}: Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput) => {
  try {
    const response: any = await prisma.project.update({ where, data });
    return response;
  } catch (error) {
    throw error;
  }
};

export const prismaDeleteUser = async (where: WhereUser) => {
  return prisma.user.deleteMany({ where });
};

export const prismaDeleteProject = async (where: WhereProject) => {
  return prisma.project.deleteMany({ where });
};
