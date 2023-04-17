import { CurrentUser } from "~/types";

export default () => useState<CurrentUser | null>("currentUser", () => null);
