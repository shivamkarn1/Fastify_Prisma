import Fastify from "fastify";
import { userRoutes } from "./modules/user/user.route";
const app = Fastify();

app.get("/health", async function () {
  return { status: "OK" };
});

async function main() {
  app.register(userRoutes, { prefix: "/api/users" });
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
