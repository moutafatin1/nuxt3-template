export function UnAuthorizedException() {
  return createError({
    statusCode: 401,
    message: "Unauthorized",
  });
}

export function UserAlreadyExistsException() {
  return createError({
    statusCode: 409,
    message: "User already exists, try with a different username",
  });
}
