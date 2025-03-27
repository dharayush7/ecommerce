import fs from "fs";
import { PrismaClient } from "@prisma/client";

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const data = JSON.parse(
  fs.readFileSync(
    "/Users/ayushdhar/CODDING/perfume/server/script/data.json",
    "utf-8"
  )
);

async function loadData() {
  const prisma = new PrismaClient();

  const [categories, tags] = await Promise.all([
    prisma.category.findMany({
      where: {
        isTag: false,
      },
    }),
    prisma.category.findMany({
      where: {
        isTag: true,
      },
    }),
  ]);
  for (const e of data) {
    const category1 = categories[getRandomInt(0, categories.length - 1)];

    const tag1 = tags[getRandomInt(0, tags.length - 1)];
    await prisma.product.create({
      data: {
        name: e.name,
        description: e.description,
        description2: e.description2,
        description3: e.description3,
        points: e.points,
        maxPrice: e.maxPrice,
        sellPrice: e.sellPrice,
        fragrence: e.fragrence,
        idealFor: e.idealFor,
        preference: e.preference,
        quantity: e.quantity,
        strength: e.strength,
        sustainable: e.sustainable,
        type: e.type,
        productOnCategories: {
          create: [{ categoryId: category1.id }, { categoryId: tag1.id }],
        },
      },
    });
  }
}

(async () => {
  await loadData();
})();
