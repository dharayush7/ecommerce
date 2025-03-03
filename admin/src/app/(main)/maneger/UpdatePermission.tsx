"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingButton from "@/components/LoadingButton";
import { Manager, UpdatedPermissionRequest } from "@/lib/type";
import { updatedPermission } from "./action";

function UpdatePermission({
  isOpen,
  setIsOpen,
  maneger,
}: {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  maneger: Manager | undefined;
}) {
  const [formValue, setFormValue] = useState<UpdatedPermissionRequest>({
    admin: false,
    customer: false,
    order: false,
    payment: false,
    product: false,
    site: false,
  });
  const [err, setErr] = useState("");
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (maneger) {
      let admin = false;
      let customer = false;
      let order = false;
      let payment = false;
      let product = false;
      let site = false;

      if (maneger.permission.includes("ADMIN")) admin = true;
      if (maneger.permission.includes("CUSTOMER")) customer = true;
      if (maneger.permission.includes("ORDER")) order = true;
      if (maneger.permission.includes("PAYMENTS")) payment = true;
      if (maneger.permission.includes("PRODUCT")) product = true;
      if (maneger.permission.includes("SITE")) site = true;

      setFormValue({ admin, customer, order, payment, product, site });
    }
  }, [maneger]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updatedPermission({
        ...formValue,
        email: maneger?.email || "",
      });
      if (result.err) return setErr(result.msg);
    });
  };

  const onClose = async () => {
    if (!isLoading) {
      setErr("");
      setFormValue({
        admin: false,
        customer: false,
        order: false,
        payment: false,
        product: false,
        site: false,
      });
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="w-[30vw] sm:max-w-full">
        <button
          title="close"
          onClick={onClose}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <XIcon />
        </button>
        <DialogHeader>
          <DialogTitle>Update Permission</DialogTitle>
          <DialogDescription>{maneger?.name}</DialogDescription>
        </DialogHeader>
        <div className="w-full flex jc items-center">
          <p className="text-base text-red-600">{err}</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="w-full flex space-x-8 justify-between pt-2">
            <div className="flex items-center space-x-2 w-full">
              <Checkbox
                id="admin"
                className="rounded-none border border-primary"
                checked={formValue.admin}
                onCheckedChange={(e) =>
                  setFormValue({ ...formValue, admin: Boolean(e) })
                }
              />
              <label
                htmlFor="admin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Admin
              </label>
            </div>
            <div className="flex items-center space-x-2 w-full">
              <Checkbox
                id="product"
                className="rounded-none border border-primary"
                checked={formValue.product}
                onCheckedChange={(e) =>
                  setFormValue({ ...formValue, product: Boolean(e) })
                }
              />
              <label
                htmlFor="product"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Product
              </label>
            </div>
          </div>
          <div className="w-full flex space-x-8 justify-between pt-2">
            <div className="flex items-center space-x-2 w-full">
              <Checkbox
                id="order"
                className="rounded-none border border-primary"
                checked={formValue.order}
                onCheckedChange={(e) =>
                  setFormValue({ ...formValue, order: Boolean(e) })
                }
              />
              <label
                htmlFor="order"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Order
              </label>
            </div>
            <div className="flex items-center space-x-2 w-full">
              <Checkbox
                id="payment"
                className="rounded-none border border-primary"
                checked={formValue.payment}
                onCheckedChange={(e) =>
                  setFormValue({ ...formValue, payment: Boolean(e) })
                }
              />
              <label
                htmlFor="payment"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Payment
              </label>
            </div>
          </div>
          <div className="w-full flex space-x-8 justify-between pt-2">
            <div className="flex items-center space-x-2 w-full">
              <Checkbox
                id="customer"
                className="rounded-none border border-primary"
                checked={formValue.customer}
                onCheckedChange={(e) =>
                  setFormValue({ ...formValue, customer: Boolean(e) })
                }
              />
              <label
                htmlFor="customer"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Customer
              </label>
            </div>
            <div className="flex items-center space-x-2 w-full">
              <Checkbox
                id="site"
                className="rounded-none border border-primary"
                checked={formValue.site}
                onCheckedChange={(e) =>
                  setFormValue({ ...formValue, site: Boolean(e) })
                }
              />
              <label
                htmlFor="site"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Site
              </label>
            </div>
          </div>
          <div className="w-full flex justify-end items-center pt-4">
            <LoadingButton isLoading={isLoading} type="submit">
              Update
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePermission;
