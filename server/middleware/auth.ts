import { getCurrentUser } from "../utils/session";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);
  if (user) {
    event.context.user = user;
  }
});
