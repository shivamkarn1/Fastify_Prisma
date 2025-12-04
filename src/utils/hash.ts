// manual function to hash password , created from scratch
// #not using any library like bcrypt

import crypto from "crypto";
import { promisify } from "util";

const pbkdf2 = promisify(crypto.pbkdf2);
async function hashPassword(
  password: string
): Promise<{ hash: string; salt: string }> {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 100_000;
  const keylen = 64;
  const derived = await pbkdf2(password, salt, iterations, keylen, "sha512"); // it will returun buffer
  return { hash: Buffer.from(derived).toString("hex"), salt };
}

type VerifyInputs = {
  candidatePassword: string;
  salt: string;
  hash: string;
};
async function verifyPassword({
  candidatePassword,
  salt,
  hash,
}: VerifyInputs): Promise<boolean> {
  const iterations = 100_000;
  const keylen = 64;
  const derived = await pbkdf2(
    candidatePassword,
    salt,
    iterations,
    keylen,
    "sha512"
  );
  const candidateBuf = Buffer.from(derived);
  const hashBuf = Buffer.from(hash, "hex");
  if (candidateBuf.length !== hashBuf.length) return false;
  return crypto.timingSafeEqual(candidateBuf, hashBuf);
}

export { hashPassword, verifyPassword };
