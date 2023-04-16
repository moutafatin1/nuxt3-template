import { PrismaClient } from "@prisma/client";
import { SignInDto } from "../api/auth/signin.post";
import { UnAuthorizedException } from "../exceptions";
import { verifyPassword } from "../utils/security";

const prisma = new PrismaClient();

export function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function verifySignIn({ username, password }: SignInDto) {
  const user = await getUserByUsername(username);
  if (!user) {
    throw UnAuthorizedException();
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    throw UnAuthorizedException();
  }

  const { passwordHash, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
