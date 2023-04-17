import { protectRouteAndGetCurrentUser } from "~/server/utils/session";

export default defineEventHandler(async (event) => {
  const user = protectRouteAndGetCurrentUser(event);

  return user;
});
