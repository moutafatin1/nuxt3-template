import { verifySignIn } from "~/server/services";
import { createUserSession } from "~/server/utils/session";
import { CurrentUser } from "~/types";

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
