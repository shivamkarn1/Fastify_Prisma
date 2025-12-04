import type { FastifyInstance } from "fastify";
import { registerUser, loginUser, getUsers } from "./user.controller";
import { userSchemaRef as $ref } from "./user.schema";

async function userRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUser
  );

  app.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginUser
  );

  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    getUsers
  );
}
export { userRoutes };
