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
import { deleteManeger, getManeger } from "./action";
import { Manager } from "@/lib/type";
import UpdateManeger from "./UpdateManeger";
import UpdatePermission from "./UpdatePermission";
import AlertDialog from "@/components/AlertDialog";
import { Badge } from "@/components/ui/badge";

function Manegers() {
  const [manegers, setManegers] = useState<Manager[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getManeger();
      if (data.err) {
        setErrMsg(data.msg);
      }
      setManegers(data.data);
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
      <DataTable manegers={manegers} />
    </div>
  );
}

export default Manegers;

export const MoreOption = ({
  setUpdateDetailsForm,
  setUpdatePermissionForm,
  setIsDeleteDialog,
  setManeger,
  maneger,
}: {
  setUpdatePermissionForm: (e: boolean) => void;
  setUpdateDetailsForm: (e: boolean) => void;
  setIsDeleteDialog: (e: boolean) => void;
  setManeger: (e: Manager) => void;
  maneger: Manager;
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
            setManeger(maneger);
            setUpdateDetailsForm(true);
          }}
        >
          Update maneger
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setManeger(maneger);
            setUpdatePermissionForm(true);
          }}
        >
          Upadte permisions
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setManeger(maneger);
            setIsDeleteDialog(true);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function DataTable({ manegers }: { manegers: Manager[] }) {
  const [updateDeatilsForm, setUpdateDetailsForm] = useState(false);
  const [updatePermissionForm, setUpdatePermissionForm] = useState(false);
  const [deleteDialog, setIsDeleteDialog] = useState(false);
  const [maneger, setManeger] = useState<Manager>();

  const [isPending, startTransition] = useTransition();

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manegers.map((row) => (
              <TableRow key={row.email}>
                <TableCell className="space-x-2">
                  {row.name} {row.isOwner && <Badge>Owner</Badge>}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="space-x-2">
                  {row.permission.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </TableCell>
                <TableCell>
                  {!row.isOwner && !row.permission.includes("ADMIN") && (
                    <MoreOption
                      setUpdatePermissionForm={setUpdatePermissionForm}
                      setUpdateDetailsForm={setUpdateDetailsForm}
                      setIsDeleteDialog={setIsDeleteDialog}
                      maneger={row}
                      setManeger={setManeger}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UpdateManeger
        isOpen={updateDeatilsForm}
        setIsOpen={setUpdateDetailsForm}
        maneger={maneger}
      />
      <UpdatePermission
        isOpen={updatePermissionForm}
        maneger={maneger}
        setIsOpen={setUpdatePermissionForm}
      />
      <AlertDialog
        btnTitle="Delete"
        content="Are your want to delete"
        isLoading={isPending}
        isOpen={deleteDialog}
        setIsOpen={setIsDeleteDialog}
        onClick={() => {
          startTransition(async () => {
            await deleteManeger(maneger?.email || "");
          });
        }}
      />
    </div>
  );
}
