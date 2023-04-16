import { User } from "@prisma/client";

declare module "h3" {
  interface H3EventContext {
    user?: Omit<User, "passwordHash">;
  }
}
