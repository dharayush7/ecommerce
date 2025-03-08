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
import { Category, UpdatedCategoryRequest } from "@/lib/type";
import { updateCategory } from "./action";
import { Checkbox } from "@/components/ui/checkbox";

function UpdateCategory({
  isOpen,
  setIsOpen,
  category,
}: {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  category: Category | undefined;
}) {
  const [formValue, setFormValue] = useState<UpdatedCategoryRequest>({
    name: "",
    description: "",
    isTag: false,
  });
  const [err, setErr] = useState("");
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (category) {
      setFormValue({
        name: category.name,
        description: category.description,
        isTag: category.isTag,
      });
    }
  }, [category]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateCategory({
        ...formValue,
        categoryId: category?.id || "",
      });
      if (result?.msg) return setErr(result.msg);
    });
  };

  const onClose = async () => {
    if (!isLoading) {
      setErr("");
      setFormValue({ description: "", name: "", isTag: false });
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="w-[40vw] sm:max-w-full">
        <button
          title="close"
          onClick={onClose}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <XIcon />
        </button>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center items-center">
          <p className="text-base text-red-600">{err}</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="w-full flex flex-col space-y-4">
            <div className="w-full">
              <Label htmlFor="name" className="pb-2 w-full">
                Name
              </Label>
              <Input
                placeholder="Category name"
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
              <Label htmlFor="description" className="pb-2">
                Description
              </Label>
              <Input
                placeholder="Write description here.."
                id="description"
                name="description"
                type="text"
                value={formValue.description}
                onChange={(e) =>
                  setFormValue({ ...formValue, description: e.target.value })
                }
                required
              />
            </div>
            <div className="space-x-2">
              <Checkbox
                id="isTag"
                className="rounded-none border border-primary"
                checked={formValue.isTag}
                onCheckedChange={(e) =>
                  setFormValue({ ...formValue, isTag: Boolean(e) })
                }
              />
              <label htmlFor="isTag">Tag</label>
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

export default UpdateCategory;
