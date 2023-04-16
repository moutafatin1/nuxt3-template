export function UnAuthorizedException() {
  return createError({
    statusCode: 401,
    message: "Unauthorized",
  });
}
