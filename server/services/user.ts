import { SignInDto } from "../api/auth/signin.post";
import { SignUpDto } from "../api/auth/signup.post";
import { prisma } from "../db";
import {
  BadCredentialsException,
  UserAlreadyExistsException,
} from "../exceptions";

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
    throw BadCredentialsException();
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    throw BadCredentialsException();
  }

  const { passwordHash, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

export async function createUser(user: SignUpDto) {
  const existingUser = await getUserByUsername(user.username);

  if (existingUser) {
    throw UserAlreadyExistsException();
  }
  const { passwordHash, ...userWithoutPassword } = await prisma.user.create({
    data: {
      username: user.username,
      passwordHash: await hashPassword(user.password),
    },
  });

  return userWithoutPassword;
}
