"use client";

import { FormEvent, useState, useTransition } from "react";
import LoadingThemeButton from "@/components/LoadingThemeButton";
import { Input } from "@/components/ui/input";
import { login } from "./action";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const error = await login({ email, password });
      setErr(error);
    });
  }

  return (
    <form className="pl-20 w-full space-y-3" onSubmit={onSubmit}>
      <p className="text-center text-destructive">{err}</p>
      <Input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <p> Forget your</p>
        <button
          type="button"
          className="text-blue-600 cursor-pointer"
          onClick={() => router.push("/rest-password")}
        >
          password?
        </button>
      </div>
      <LoadingThemeButton className="py-3" isLoading={isPending}>
        Login
      </LoadingThemeButton>
    </form>
  );
};

export default LoginForm;
