"use server";
import prisma from "@/lib/prisma";
import { Prisma, Project, User, Verification } from "@prisma/client";

type WhereUser = Prisma.UserWhereUniqueInput;
type IncludeUser = Prisma.UserInclude;
type WhereProject = Prisma.ProjectWhereUniqueInput;
type WhereVerification = Prisma.VerificationWhereUniqueInput;

export const prismaFindManyUsers = async () => {
  return prisma.user.findMany();
};

export const prismaFindManyProjects = async () => {
  return prisma.project.findMany();
};

export const prismaFindManyVerifications = async () => {
  return prisma.verification.findMany();
};

export const prismaFindUniqueUser = async (
  where: WhereUser,
  include?: IncludeUser
): Promise<any> => {
  return prisma.user.findUnique({
    where,
    include,
  });
};

export const prismaFindUniqueProject = async (where: WhereProject) => {
  return prisma.project.findUnique({ where });
};

export const prismaFindUniqueVerification = async (
  where: WhereVerification
) => {
  return prisma.verification.findUnique({ where });
};

export const prismaCreateUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};

export const prismaCreateProject = async (data: Prisma.ProjectCreateInput) => {
  return prisma.project.create({ data });
};

export const prismaCreateVerification = async (
  data: Prisma.VerificationCreateInput
) => {
  return prisma.verification.create({ data });
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

export const prismaUpdateVerification = async ({
  where,
  data,
}: Prisma.VerificationUpdateWithWhereUniqueWithoutUserInput) => {
  try {
    const response: any = await prisma.verification.update({ where, data });
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

export const prismaDeleteVerification = async (where: WhereVerification) => {
  return prisma.verification.deleteMany({ where });
};
