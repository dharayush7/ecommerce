"use client";
import React, { FormEvent, useState, useTransition } from "react";
import LoadingThemeButton from "@/components/LoadingThemeButton";
import { Input } from "@/components/ui/input";
import { restPasswordRequest } from "./action";

function RestPassword() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const err = await restPasswordRequest(email);
      setErr(err);
    });
  };

  return (
    <form className="pl-20 w-full space-y-3" onSubmit={onSubmit}>
      <p className="text-center text-destructive">{err}</p>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <LoadingThemeButton className="py-3" isLoading={isPending}>
        Send OTP
      </LoadingThemeButton>
    </form>
  );
}

export default RestPassword;
