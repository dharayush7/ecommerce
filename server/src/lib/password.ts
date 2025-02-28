import { compare } from "bcrypt";

export const comparePassword = async (
  password: string,
  hashPasword: string
) => {
  const result = await compare(password, hashPasword);
  return result;
};
