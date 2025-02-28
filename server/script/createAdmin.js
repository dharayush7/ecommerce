import { PrismaClient } from "@prisma/client";
import { genSalt, hash as _hash } from "bcrypt";
import { question } from "readline-sync";
import { z } from "zod";

async function create(name, email, mobileNo, password) {
  try {
    const prisma = new PrismaClient();
    const [user1, user2] = await Promise.all([
      prisma.adminUser.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      }),
      prisma.adminUser.findFirst({
        where: {
          mobileNo: {
            equals: mobileNo,
          },
        },
      }),
    ]);

    if (user1 || user2) {
      console.log("\x1b[31mUser allready exists\x1b[0m");
      return;
    }

    const salt = await genSalt(16);
    const hash = await _hash(password, salt);
    await prisma.adminUser.create({
      data: {
        name,
        email,
        password: hash,
        isOwner: true,
        isRequreChange: false,
        mobileNo,
        permission: ["ADMIN"],
      },
    });
    console.log("\x1b[32mUser created successfull.\x1b[0m");
  } catch (error) {
    console.error(error);
  }
}

function takeInput() {
  const nameSchema = z.string().min(3, "Too shrot name!");
  const emailSchema = z.string().email("Please enter a valid email");
  const numberSchema = z.number().min(10, "Enter a valid number!");
  const passwordSchema = z
    .string()
    .min(6, "Please enter a password of 6 charecter long!");

  const inpName = question("Fullname: ");
  const inpEmail = question("Email: ");
  const inpNumber = question("Mobile No.: ");
  const inpPassword = question("Password: ", {
    hideEchoBack: true,
  });

  try {
    const name = nameSchema.parse(inpName);
    const email = emailSchema.parse(inpEmail);
    const number = numberSchema.parse(Number(inpNumber));
    const password = passwordSchema.parse(inpPassword);

    return { name, email, number, password };
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
}

const { name, email, number, password } = takeInput();

console.log("\x1b[32m%s\x1b[0m", "Creating user...");
await create(name, email, String(number), password);
