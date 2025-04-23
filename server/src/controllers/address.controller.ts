import prisma from "@/lib/prisma";
import { addAddressSchema, updateAddressSchema } from "@/lib/validation";
import { Request, Response } from "express";

export async function addAddressHandler(req: Request, res: Response) {
  const user = req.user;
  const body = req.body;
  const result = addAddressSchema.safeParse({ ...body });
  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }

  try {
    const data = result.data;

    await prisma.address.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    res.json({
      msg: "Address saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function updateAddressHandler(req: Request, res: Response) {
  const user = req.user;
  const body = req.body;
  const result = updateAddressSchema.safeParse(body);
  if (!result.success) {
    res.status(400).json({
      msg: result.error.issues[0].message,
    });
    return;
  }

  try {
    const data = result.data;

    const address = await prisma.address.findUnique({
      where: {
        id: data.addressId,
      },
    });

    if (!address) {
      res.status(400).json({
        msg: "Address not found",
      });
      return;
    }

    await prisma.address.update({
      where: {
        id: data.addressId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        alternatePhoneNumber: data.alternatePhoneNumber,
        address1: data.address1,
        address2: data.address2,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
        country: data.country,
        postCode: data.postCode,
      },
    });

    res.json({
      msg: "Address updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function getAddressHandeler(req: Request, res: Response) {
  const user = req.user;

  try {
    const addresses = await prisma.address.findMany({
      where: {
        userId: {
          equals: user.id,
        },
        isDeleted: {
          equals: false,
        },
      },
    });

    res.json({
      msg: "Addresses fetched",
      data: addresses.map((e) => ({ ...e, postCode: String(e.postCode) })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function deleteAddressHandeler(req: Request, res: Response) {
  const addressId = req.params.id;
  const user = req.user;
  try {
    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!address) {
      res.status(400).json({
        msg: "Address not found",
      });
      return;
    }

    if (address.userId !== user.id) {
      res.status(401).json({
        msg: "Unauthorized",
      });
      return;
    }

    await prisma.address.update({
      where: {
        id: address.id,
      },
      data: {
        isDeleted: true,
      },
    });
    res.json({
      msg: "Address deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}
