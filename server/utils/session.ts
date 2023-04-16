import cookieSignature from "cookie-signature";
import { H3Event } from "h3";
import { getUserById } from "../services";

export type Session = {
  userId: string;
};

export function createUserSession(event: H3Event, sessionData: Session) {
  const config = useRuntimeConfig();
  const session = JSON.stringify(sessionData);

  const cookie = cookieSignature.sign(session, config.cookieSecret);

  setCookie(event, "session_3", cookie, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: config.cookieExpires,
  });
}

export async function getCurrentUser(event: H3Event) {
  const config = useRuntimeConfig();

  const cookie = getCookie(event, config.cookieName);

  if (!cookie) {
    return null;
  }

  const unsignedCookie = cookieSignature.unsign(cookie, config.cookieSecret);

  if (!unsignedCookie) {
    return null;
  }

  const session = JSON.parse(unsignedCookie) as Session;

  const user = await getUserById(session.userId);

  if (!user) return null;

  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
