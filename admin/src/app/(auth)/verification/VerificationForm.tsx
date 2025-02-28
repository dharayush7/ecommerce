"use client";

import { FormEvent, useState, useTransition } from "react";
import LoadingThemeButton from "@/components/LoadingButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verfication } from "./action";
const VerificationForm = () => {
  const [err, setErr] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const error = await verfication({ otpCode });
      setErr(error);
    });
  };

  return (
    <form
      className="w-full space-y-5 flex flex-col justify-center items-center"
      onSubmit={onSubmit}
    >
      <p className="text-center text-destructive">{err}</p>
      <InputOTP
        maxLength={6}
        pattern="^[0-9]+$"
        onChange={(e) => setOtpCode(e)}
        value={otpCode}
        containerClassName="w-full flex justify-center items-center"
      >
        <InputOTPGroup className="space-x-4">
          <InputOTPSlot index={0} className="text-xl py-5" />
          <InputOTPSlot index={1} className="text-xl py-5" />
          <InputOTPSlot index={2} className="text-xl py-5" />
          <InputOTPSlot index={3} className="text-xl py-5" />
          <InputOTPSlot index={4} className="text-xl py-5" />
          <InputOTPSlot index={5} className="text-xl py-5" />
        </InputOTPGroup>
      </InputOTP>

      <LoadingThemeButton
        className="py-3 w-72"
        type="submit"
        isLoading={isPending}
      >
        Verify
      </LoadingThemeButton>
    </form>
  );
};

export default VerificationForm;
