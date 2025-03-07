"use client";
import React, { useTransition } from "react";
import LoadingButton from "@/components/LoadingButton";
import { clearUpload } from "./action";

export default function ClearUploadButton() {
  const [isPending, startTransition] = useTransition();
  const onClick = async () => {
    startTransition(async () => {
      await clearUpload();
    });
  };
  return (
    <LoadingButton isLoading={isPending} onClick={onClick}>
      Clean Uploads
    </LoadingButton>
  );
}
