import type { FastifyInstance } from "fastify";
import { registerUser } from "./user.controller";

async function userRoutes(app: FastifyInstance) {
  app.post("/create", registerUser);
}
export { userRoutes };
