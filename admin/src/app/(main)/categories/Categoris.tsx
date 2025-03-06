"use client";
import * as React from "react";
import { useEffect, useState, useTransition } from "react";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/lib/type";
import UpdateCategory from "./UpdateCategory";
import { getCategories } from "./action";

interface CategoryResponsse extends Category {
  count: number;
}

function Categories() {
  const [categories, setCategories] = useState<CategoryResponsse[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getCategories();
      if (data.err) {
        setErrMsg(data.msg);
      }
      setCategories(data.data);
    });
  }, []);

  return (
    <div className="space-y-1 pt-3">
      {isLoading && (
        <div>
          <Loader2 size={22} className="animate-spin text-primary" />
        </div>
      )}
      <div className="w-full pb-3 flex justify-center items-center">
        <p className="text-red-600">{errMsg}</p>
      </div>
      <DataTable categoris={categories} />
    </div>
  );
}

export default Categories;

export const MoreOption = ({
  setUpdateDetailsForm,
  setCategory,
  category,
}: {
  setUpdateDetailsForm: (e: boolean) => void;
  setCategory: (e: CategoryResponsse) => void;
  category: CategoryResponsse;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setCategory(category);
            setUpdateDetailsForm(true);
          }}
        >
          Update category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function DataTable({ categoris }: { categoris: CategoryResponsse[] }) {
  const [updateDeatilsForm, setUpdateDetailsForm] = useState(false);
  const [category, setCategory] = useState<CategoryResponsse>();

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>No of products</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoris.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>
                  <MoreOption
                    setUpdateDetailsForm={setUpdateDetailsForm}
                    category={row}
                    setCategory={setCategory}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UpdateCategory
        category={category}
        isOpen={updateDeatilsForm}
        setIsOpen={setUpdateDetailsForm}
      />
    </div>
  );
}
