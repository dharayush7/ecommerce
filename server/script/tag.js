import fs from "fs";

const data = JSON.parse(
  fs.readFileSync(
    "/Users/ayushdhar/CODDING/perfume/server/script/tags.json",
    "utf-8"
  )
);
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loadTags() {
  for (const e of data) {
    await prisma.category.create({
      data: {
        name: e.name,
        description: e.description,
        isTag: true,
      },
    });
  }
}

(async () => {
  await loadTags();
})();
