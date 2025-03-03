"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/LoadingButton";
import { Manager, UpdatedManegerRequest } from "@/lib/type";
import { updateManeger } from "./action";

function UpdateManeger({
  isOpen,
  setIsOpen,
  maneger,
}: {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  maneger: Manager | undefined;
}) {
  const [formValue, setFormValue] = useState<UpdatedManegerRequest>({
    email: "",
    name: "",
  });
  const [err, setErr] = useState("");
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (maneger) {
      setFormValue({ email: maneger.email, name: maneger.name });
    }
  }, [maneger]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateManeger({
        ...formValue,
        oldEmail: maneger?.email || "",
      });
      if (result.err) return setErr(result.msg);
    });
  };

  const onClose = async () => {
    if (!isLoading) {
      setErr("");
      setFormValue({ email: "", name: "" });
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="w-[60vw] sm:max-w-full">
        <button
          title="close"
          onClick={onClose}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <XIcon />
        </button>
        <DialogHeader>
          <DialogTitle>Update Maneger</DialogTitle>
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

export default UpdateManeger;
