import type { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.service";
import type { CreateProductInput } from "./product.schema";

async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>
) {
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
}
async function getAllProducts() {
  const products = await getProducts();
  return products;
}

export { createProductHandler, getAllProducts };
