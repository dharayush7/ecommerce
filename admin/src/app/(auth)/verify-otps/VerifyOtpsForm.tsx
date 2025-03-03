"use client";
import React, { FormEvent, useState, useTransition } from "react";
import LoadingThemeButton from "@/components/LoadingThemeButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { VerifyOTPsRequest } from "@/lib/type";
import { verfyOTPs } from "./action";

function VerifyOtpsForm() {
  const [formValue, setFormValue] = useState<VerifyOTPsRequest>({
    emailOtp: "",
    mobileOtp: "",
  });
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const err = await verfyOTPs(formValue);
      setErr(err ?? "");
    });
  };

  return (
    <form
      className="w-full flex flex-col justify-center items-center"
      onSubmit={onSubmit}
    >
      <p className="text-center text-destructive">{err}</p>
      <p className="text-center text-green-600"></p>
      <label htmlFor="emailOtp" className="text-lg font-bold mt-4 mb-2">
        Email OTP
      </label>
      <InputOTP
        id="emailOtp"
        maxLength={6}
        pattern="^[0-9]+$"
        containerClassName="w-full flex justify-center items-center"
        value={formValue.emailOtp}
        onChange={(e) => setFormValue({ ...formValue, emailOtp: e })}
        required
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
      <label htmlFor="mobileOtp" className="text-lg font-bold mt-3 mb-2">
        Mobile OTP
      </label>
      <InputOTP
        id="mobileOtp"
        maxLength={6}
        pattern="^[0-9]+$"
        containerClassName="w-full flex justify-center items-center"
        value={formValue.mobileOtp}
        onChange={(e) => setFormValue({ ...formValue, mobileOtp: e })}
        required
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

      <div className="flex gap-2 mt-3 mb-2">
        <p> Not received your code?</p>
        <button type="button" className="text-blue-600 cursor-pointer">
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
}

export default VerifyOtpsForm;
