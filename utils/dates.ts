type InputObject = {
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
};

type OutputObject = {
  createdAt: Date;
  updatedAt: Date;
};

export function convertToObjWithDates<T extends InputObject>(input: T) {
  const { createdAt, updatedAt, ...rest } = input;

  const output: OutputObject & Omit<T, "createdAt" | "updatedAt"> = {
    ...rest,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };

  return output;
}
