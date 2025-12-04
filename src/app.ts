import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/products/product.schema";
import productRoutes from "./modules/products/product.route";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { withRefResolver } from "fastify-zod";
export const app = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

// Register JWT plugin
app.register(fjwt, {
  secret: process.env.JWT_SECRET || "your-secret-key-here",
});

app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

app.get("/health", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of [...userSchemas, ...productSchemas]) {
    app.addSchema(schema);
  }
  app.register(
    swagger,
    withRefResolver({
      openapi: {
        info: {
          title: "Fastify API",
          description: "API for some products",
          version: "1.0.0",
        },
      },
    })
  );

  app.register(swaggerUI, {
    routePrefix: "/docs",
  });

  app.register(userRoutes, { prefix: "/api/users" });
  app.register(productRoutes, { prefix: "/api/products" });
  const port = 4000;
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Error running Server : ", error);
    process.exit(1);
  }
}

main();
