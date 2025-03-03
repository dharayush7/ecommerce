"use client";
import React, { FormEvent, useState, useTransition } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingButton from "@/components/LoadingButton";
import { AddManegerRequest } from "@/lib/type";
import { addManeger } from "./action";

function AddManegerForm() {
  const defaultFormValue: AddManegerRequest = {
    admin: false,
    customer: false,
    email: "",
    mobileNo: "",
    name: "",
    order: false,
    password: "",
    payment: false,
    product: false,
    site: false,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [formValue, setFormValue] =
    useState<AddManegerRequest>(defaultFormValue);
  const [err, setErr] = useState("");
  const [isLoading, startTransition] = useTransition();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await addManeger(formValue);
      if (result.err) return setErr(result.msg);
    });
  };

  const onClose = async () => {
    if (!isLoading) {
      setErr("");
      setFormValue(defaultFormValue);
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild id="close">
        <Button
          variant="default"
          className="cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Add Maneger
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[60vw] sm:max-w-full">
        <button
          title="close"
          onClick={onClose}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <XIcon />
        </button>
        <DialogHeader>
          <DialogTitle>Add Maneger</DialogTitle>
        </DialogHeader>
        <div className="w-full flex jc items-center">
          <p className="text-base text-red-600">{err}</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="w-full flex space-x-8 justify-between">
            <div className="w-full">
              <Label htmlFor="name" className="pb-2 w-full">
                Name
              </Label>
              <Input
                placeholder="Jhon Doe"
                id="name"
                name="name"
                className="w-full"
                value={formValue.name}
                onChange={(e) =>
                  setFormValue({ ...formValue, name: e.target.value })
                }
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email" className="pb-2">
                Email
              </Label>
              <Input
                placeholder="jhonedoe@example.com"
                id="email"
                name="email"
                type="email"
                value={formValue.email}
                onChange={(e) =>
                  setFormValue({ ...formValue, email: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="w-full flex space-x-8 justify-between pt-2">
            <div className="w-full">
              <Label htmlFor="mobileNo" className="pb-2 w-full">
                Phone Number
              </Label>
              <Input
                placeholder="+91 00000-00000"
                id="mobileNo"
                name="mobileNo"
                className="w-full"
                type="number"
                value={formValue.mobileNo}
                onChange={(e) =>
                  setFormValue({ ...formValue, mobileNo: e.target.value })
                }
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="password" className="pb-2">
                Password
              </Label>
              <Input
                placeholder="********"
                id="password"
                name="password"
                type="password"
                value={formValue.password}
                onChange={(e) =>
                  setFormValue({ ...formValue, password: e.target.value })
                }
                required
              />
            </div>
          </div>
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
              Add
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddManegerForm;
