"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import LoadingThemeButton from "@/components/LoadingThemeButton";
import { Input } from "@/components/ui/input";
import { chnagePassword } from "./action";

interface FormValue {
  password: string;
  rePassword: string;
}

function ChangePasswordForm() {
  const [formValue, setFormValue] = useState<FormValue>({
    password: "",
    rePassword: "",
  });
  const [isDisable, setIsDesable] = useState(true);
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (formValue.password === formValue.rePassword) {
      setIsDesable(false);
    } else {
      setIsDesable(true);
    }
  }, [formValue.password, formValue.rePassword]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const err = await chnagePassword({ password: formValue.password });
      setErr(err);
    });
  };

  return (
    <form className="pl-20 w-full space-y-3" onSubmit={onSubmit}>
      <p className="text-center text-destructive">{err}</p>
      <Input
        placeholder="Enter password"
        type="password"
        value={formValue.password}
        onChange={(e) =>
          setFormValue({ ...formValue, password: e.target.value })
        }
        required
      />
      <Input
        placeholder="Re-enter password"
        type="password"
        value={formValue.rePassword}
        onChange={(e) =>
          setFormValue({ ...formValue, rePassword: e.target.value })
        }
        required
      />
      <LoadingThemeButton
        className="py-3"
        isLoading={isPending}
        disabled={isDisable}
      >
        Save password
      </LoadingThemeButton>
    </form>
  );
}

export default ChangePasswordForm;
