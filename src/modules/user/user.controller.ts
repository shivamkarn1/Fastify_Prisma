import type { FastifyReply, FastifyRequest } from "fastify";

async function registerUser(request: FastifyRequest, reply: FastifyReply) {
  return { status: "Created Successfully" };
}

export { registerUser };
