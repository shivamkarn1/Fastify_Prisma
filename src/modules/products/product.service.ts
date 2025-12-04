import type { CreateProductInput } from "./product.schema";
import prisma from "../../utils/prisma";

async function createProduct(
  inputData: CreateProductInput & { ownerId: number }
) {
  return prisma.product.create({
    data: inputData,
  });
}

function getProducts() {
  return prisma.product.findMany({
    select: {
      content: true,
      title: true,
      price: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
  });
}

export { createProduct, getProducts };
