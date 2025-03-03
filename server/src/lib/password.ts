import { compare, genSalt, hash } from "bcrypt";

export const hashPasword = async (password: string) => {
  const salt = await genSalt(16);
  const hashed = await hash(password, salt);
  return hashed;
};

export const comparePassword = async (
  password: string,
  hashPasword: string
) => {
  const result = await compare(password, hashPasword);
  return result;
};
