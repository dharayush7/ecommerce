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
import { ProductRequest } from "@/lib/type";
import AlertDialog from "@/components/AlertDialog";
import { getProduct, updateStatus } from "./action";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Product extends ProductRequest {
  isLive: boolean;
  id: string;
}

export default function Products() {
  const [products, setproducts] = useState<Product[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getProduct();
      if (data.err) {
        setErrMsg(data.msg);
      }
      setproducts(data.data);
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
      <DataTable products={products} />
    </div>
  );
}

export const MoreOption = ({
  setIsDeleteDialog,
  setProduct,
  product,
}: {
  setIsDeleteDialog: (e: boolean) => void;
  setProduct: (e: Product) => void;
  product: Product;
}) => {
  const router = useRouter();
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
          onClick={() => router.push(`/products/${product.id}/update`)}
        >
          Update product details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/products/${product.id}/update-media`)}
        >
          Update product images
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setProduct(product);
            setIsDeleteDialog(true);
          }}
        >
          Update status
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function DataTable({ products }: { products: Product[] }) {
  const [deleteDialog, setIsDeleteDialog] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [isPending, startTransition] = useTransition();
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Max Price</TableHead>
              <TableHead>Sell Price</TableHead>
              <TableHead>Live Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.maxPrice}</TableCell>
                <TableCell>{row.sellPrice}</TableCell>
                <TableCell
                  className={cn(
                    !row.isLive ? "text-destructive" : "text-green-600"
                  )}
                >
                  {row.isLive ? "Live" : "Not live"}
                </TableCell>
                <TableCell>
                  <MoreOption
                    product={row}
                    setProduct={setProduct}
                    setIsDeleteDialog={setIsDeleteDialog}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog
        btnTitle={product?.isLive ? "Inactive" : "Live"}
        content="Are your want to update status"
        isLoading={isPending}
        isOpen={deleteDialog}
        setIsOpen={setIsDeleteDialog}
        onClick={() => {
          startTransition(async () => {
            const currentState = product ? product.isLive : false;
            const err = await updateStatus({
              productId: product?.id || "",
              status: !currentState,
            });
            if (err) {
              toast(err);
            }
            setIsDeleteDialog(false);
          });
        }}
      />
    </div>
  );
}
