import { verifySignIn } from "~/server/services";
import { createUserSession } from "~/server/utils/session";

export type SignInDto = {
  username: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<SignInDto>(event);
  const user = await verifySignIn(body);

  createUserSession(event, { userId: user.id });

  return superjsonResponse(user);
});
