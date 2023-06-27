import bcrypt from "bcryptjs";

const salt = 10;

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

export const checkPassword = (pass, compPass) => {
  const compare = bcrypt.compareSync(pass, compPass);

  return compare;
};
