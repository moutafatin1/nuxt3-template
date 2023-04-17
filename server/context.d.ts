import { User } from "@prisma/client";
import { CurrentUser } from "~/types";

declare module "h3" {
  interface H3EventContext {
    user?: CurrentUser;
  }
}
