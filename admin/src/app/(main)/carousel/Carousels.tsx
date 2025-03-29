"use client";
import * as React from "react";
import { useEffect, useState, useTransition } from "react";
import { Eye, Loader2, MoreHorizontal } from "lucide-react";
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
import { Carousel } from "@/lib/type";
import AlertDialog from "@/components/AlertDialog";
import { getCarousels, deleteCarousels } from "./action";
// import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

export default function Carousels() {
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getCarousels();
      if (data.err) {
        setErrMsg(data.msg);
      }
      setCarousels(data.data);
    });
  }, []);
  return (
    <div className="space-y-1 pt-3">
      {isLoading && (
        <div className="w-full mt-6">
          <Loader2 size={30} className="animate-spin text-primary" />
        </div>
      )}
      <div className="w-full pb-3 flex justify-center items-center">
        <p className="text-red-600">{errMsg}</p>
      </div>
      <DataTable carousels={carousels} />
    </div>
  );
}

export const MoreOption = ({
  setIsDeleteDialog,
  setCarousel,
  carousel,
}: {
  setIsDeleteDialog: (e: boolean) => void;
  setCarousel: (e: Carousel) => void;
  carousel: Carousel;
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
            setCarousel(carousel);
            setIsDeleteDialog(true);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function DataTable({ carousels }: { carousels: Carousel[] }) {
  const [deleteDialog, setIsDeleteDialog] = useState(false);
  const [carousel, setCarousel] = useState<Carousel>();
  const [isPending, startTransition] = useTransition();
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Preference</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carousels.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link href={row.images[0].url} target="_blank">
                    <Eye />
                  </Link>
                </TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.preference}</TableCell>
                <TableCell>
                  <Link href={row.link} className="underline" target="_blank">
                    link
                  </Link>
                </TableCell>
                <TableCell>
                  <MoreOption
                    carousel={row}
                    setCarousel={setCarousel}
                    setIsDeleteDialog={setIsDeleteDialog}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog
        btnTitle="delete"
        content="Are your want to update status"
        isLoading={isPending}
        isOpen={deleteDialog}
        setIsOpen={setIsDeleteDialog}
        onClick={() => {
          startTransition(async () => {
            const err = await deleteCarousels(carousel?.id || "");
            if (err) {
              toast(err.msg);
            }
            setIsDeleteDialog(false);
          });
        }}
      />
    </div>
  );
}
