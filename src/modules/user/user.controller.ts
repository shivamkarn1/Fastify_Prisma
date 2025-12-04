import type { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema, type CreateUserInput } from "./user.schema";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import type { loginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { app } from "../../app";
async function registerUser(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  try {
    const body = request.body;
    const user = await createUser(body);
    return reply.status(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

async function loginUser(
  request: FastifyRequest<{
    Body: loginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  // find user by email
  const user = await findUserByEmail(body.email);
  if (!user) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  // verify password
  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (!correctPassword) {
    return reply.code(401).send({
      message: "Invalid Email or Password",
    });
  }
  // generate/give access token
  const { password, salt, ...rest } = user;
  return {
    accessToken: app.jwt.sign(rest),
  };

  // resposne
  return reply.code(200).send({
    message: "User Login success",
  });
}

async function getUsers() {
  const users = await findUsers();
}

export { registerUser, loginUser, getUsers };
