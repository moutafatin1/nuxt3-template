import { UnAuthorizedException } from "~/server/exceptions";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    throw UnAuthorizedException();
  }

  return user;
});
