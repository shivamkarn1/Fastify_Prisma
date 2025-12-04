import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import type { CreateUserInput } from "./user.schema";

async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const { hash, salt } = await hashPassword(password);
  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });
  return user;
}

async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
async function findUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export { createUser, findUserByEmail, findUsers };
