import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
  title: z.string(),
  content: z.string().optional(),
  price: z.number().nonnegative().default(0),
};
const productGenerated = {
  id: z.number().nonnegative(),
  ownerId: z.number().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
};
const createProductSchema = z.object({
  ...productInput,
});

// For sinngle product resposne
const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

// for multiple products
const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref: productSchemaRef } =
  buildJsonSchemas(
    {
      createProductSchema,
      productResponseSchema,
      productsResponseSchema,
    },
    {
      $id: "productSchemas",
    }
  );
