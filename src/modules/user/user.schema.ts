import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Email must be valid" })
    .transform((s) => s.trim().toLowerCase()),

  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .transform((v) => v.trim()),
});

export const createUserSchema = userCore.extend({
  password: z
    .string()
    .nonempty({ message: "Enter password" })
    .min(8, { message: "Password must be atleast 8 chars" }),
});

export const createUserResponseSchema = userCore.extend({
  id: z.number(),
});

const loginSchema = z.object({
  email: z.string().nonempty({ message: "Enter email" }).email(),
  password: z.string().nonempty({ message: "Please Enter a password" }),
});
const loginResponseSchema = z.object({
  accessToken: z.string(),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

export type loginInput = z.infer<typeof loginSchema>;
export const { schemas: userSchemas, $ref: userSchemaRef } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
  },
  {
    $id: "userSchemas",
  }
);
