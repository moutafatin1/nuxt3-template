import SuperJSON from "superjson";

export function superjsonResponse<T>(data: T) {
  return SuperJSON.stringify(data) as unknown as T;
}
