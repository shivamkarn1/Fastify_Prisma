import type { FastifyInstance } from "fastify";
import { createProductHandler, getAllProducts } from "./product.controller";
import { productSchemaRef as $ref } from "./product.schema";
async function productRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("createProductSchema"),
        response: {
          201: $ref("productResponseSchema"),
        },
      },
    },
    createProductHandler
  );

  app.get(
    "/",
    {
      schema: {
        response: {
          201: $ref("productsResponseSchema"),
        },
      },
    },
    getAllProducts
  );
}

export default productRoutes;
