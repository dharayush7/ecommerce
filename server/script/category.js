import fs from "fs";

const data = JSON.parse(
  fs.readFileSync(
    "/Users/ayushdhar/CODDING/perfume/server/script/categories.json",
    "utf-8"
  )
);
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loadCategories() {
  for (const e of data) {
    await prisma.category.create({
      data: {
        name: e.name,
        description: e.description,
      },
    });
  }
}

(async () => {
  await loadCategories();
})();
