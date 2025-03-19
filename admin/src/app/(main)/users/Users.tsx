"use client";
import * as React from "react";
import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUser } from "./action";
import { User } from "@/lib/type";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getUser();
      if (data.err) {
        setErrMsg(data.msg);
      }
      setUsers(data.data);
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
      <DataTable users={users} />
    </div>
  );
}

export function DataTable({ users }: { users: User[] }) {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.mobileNo}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.mobileNo}</TableCell>
                <TableCell className="space-x-2">
                  {row.email} {row.isEmailVerified && <Badge>Varified</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
