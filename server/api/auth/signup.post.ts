import { createUser } from "~/server/services";

export type SignUpDto = {
  username: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<SignUpDto>(event);
  const newUser = await createUser(body);

  createUserSession(event, { userId: newUser.id });

  return superjsonResponse(newUser);
});
