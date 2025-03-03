"use client";

import { FormEvent, useState, useTransition } from "react";
import LoadingThemeButton from "@/components/LoadingThemeButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resendOtp, verfication } from "./action";
const VerificationForm = () => {
  const [err, setErr] = useState("");
  const [succ, setSucc] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const error = await verfication({ otpCode });
      setErr(error);
    });
  };

  const onResend = async () => {
    const msg = await resendOtp();
    setSucc(msg);
  };

  return (
    <form
      className="w-full space-y-5 flex flex-col justify-center items-center"
      onSubmit={onSubmit}
    >
      <p className="text-center text-destructive">{err}</p>
      <p className="text-center text-green-600">{succ}</p>

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

      <div className="flex gap-2">
        <p> Not received your code?</p>
        <button
          type="button"
          className="text-blue-600 cursor-pointer"
          onClick={() => onResend()}
        >
          Resend code
        </button>
      </div>

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
