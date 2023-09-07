"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

type WhereUser = Prisma.UserWhereUniqueInput;
type IncludeUser = Prisma.UserInclude;
type WhereProject = Prisma.ProjectWhereUniqueInput;

type WhereVerification = Prisma.VerificationWhereUniqueInput;

export const prismaFindManyUsers = async (
  args: Prisma.UserFindManyArgs<DefaultArgs>
) => {
  return prisma.user
    .findMany(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaFindManyProjects = async (
  args: Prisma.ProjectFindManyArgs<DefaultArgs>
) => {
  return await prisma.project
    .findMany(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaFindManyVerifications = async (
  args: Prisma.VerificationFindManyArgs<DefaultArgs>
) => {
  return prisma.verification
    .findMany(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaFindUniqueUser = async (
  args: Prisma.UserFindUniqueArgs<DefaultArgs>
): Promise<any> => {
  return prisma.user
    .findUnique(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaFindUniqueProject = async (
  args: Prisma.ProjectFindUniqueArgs<DefaultArgs>
) => {
  return prisma.project
    .findUnique(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaFindUniqueVerification = async (
  args: Prisma.VerificationFindUniqueArgs<DefaultArgs>
) => {
  return prisma.verification
    .findUnique(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaCreateUser = async (
  args: Prisma.UserCreateArgs<DefaultArgs>
) => {
  return prisma.user
    .create(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaCreateProject = async (
  args: Prisma.ProjectCreateArgs<DefaultArgs>
) => {
  return prisma.project
    .create(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaCreateVerification = async (
  args: Prisma.VerificationCreateArgs<DefaultArgs>
) => {
  return prisma.verification
    .create(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaUpdateUser = async (
  args: Prisma.UserUpdateArgs<DefaultArgs>
) => {
  return prisma.user
    .update(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaUpdateProject = async (
  args: Prisma.ProjectUpdateArgs<DefaultArgs>
) => {
  try {
    return await prisma.project
      .update(args)
      .finally(async () => await prisma.$disconnect());
  } catch (error) {
    await prisma.$disconnect();
    throw error;
  }
};

export const prismaUpdateVerification = async (
  args: Prisma.VerificationUpdateArgs<DefaultArgs>
) => {
  try {
    const response: any = await prisma.verification
      .update(args)
      .finally(async () => await prisma.$disconnect());
    return response;
  } catch (error) {
    await prisma.$disconnect();
    throw error;
  }
};

export const prismaDeleteUser = async (
  args: Prisma.UserDeleteManyArgs<DefaultArgs>
) => {
  return prisma.user
    .deleteMany(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaDeleteProject = async (
  args: Prisma.ProjectDeleteManyArgs<DefaultArgs>
) => {
  return prisma.project
    .deleteMany(args)
    .finally(async () => await prisma.$disconnect());
};

export const prismaDeleteVerification = async (
  args: Prisma.VerificationDeleteManyArgs<DefaultArgs>
) => {
  return prisma.verification
    .deleteMany(args)
    .finally(async () => await prisma.$disconnect());
};
