import React, { useState, useEffect, useTransition } from "react";
import "../assets/css/login/login.css";
import { Loader } from "lucide-react";
import pic1 from "../assets/login/login.png";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router";

interface FormState {
  mobileNumber: string;
  otp: string;
}

interface FormErrors {
  mobileNumber?: string;
  otp?: string;
}

export default function Login(): React.ReactElement {
  const [formData, setFormData] = useState<FormState>({
    mobileNumber: "8815298130",
    otp: "123456",
  });

  const [isLoading, startTransision] = useTransition();
  const [isLoading2, startTransision2] = useTransition();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<Partial<FormErrors>>({});
  const [recapthaVarifer, setRecapthaVarifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confermationResult, setConfermationResult] =
    useState<ConfirmationResult | null>(null);
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null);
  const [errmsg, setErrmsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const route = useNavigate();

  useEffect(() => {
    const recaptha = new RecaptchaVerifier(auth, "auth", {
      size: "invisible",
    });

    setRecapthaVarifier(recaptha);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<FormErrors> = {};

    if (otpSent) {
      errors.otp = validateOTP(formData.otp);
    } else {
      errors.mobileNumber = validateMobileNumber(formData.mobileNumber);
    }

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      if (otpSent) {
        await handleVerifyOTP();
      } else {
        await handleSendOTP();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }

    if (name === "mobileNumber") {
      const numbersOnly = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        mobileNumber: numbersOnly,
      }));

      if (isSubmitted) {
        validateMobileNumber(numbersOnly);
      }
    } else if (name === "otp") {
      const numbersOnly = value.replace(/[^0-9]/g, "").slice(0, 6);
      setFormData((prev) => ({
        ...prev,
        otp: numbersOnly,
      }));
      setFormErrors((prev) => ({
        ...prev,
        otp: validateOTP(numbersOnly),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    const timeout = setTimeout(() => {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }, 5000);

    setErrorTimeout(timeout);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [errorTimeout]);

  const handleSendOTP = async () => {
    setIsSubmitted(true);
    validateMobileNumber(formData.mobileNumber);

    startTransision(async () => {
      if (formData.mobileNumber.length === 10) {
        console.log(`Sending OTP to ${formData.mobileNumber}`);
        if (!recapthaVarifer) {
          return;
        }
        const result = await signInWithPhoneNumber(
          auth,
          `+91${formData.mobileNumber}`,
          recapthaVarifer
        );
        console.log(result);
        setConfermationResult(result);
        setOtpSent(true);
        setCountdown(30);
      }
    });
  };

  const handleVerifyOTP = async (): Promise<void> => {
    const result = validateOTP(formData.otp);
    if (result) {
      setFormErrors({ ...formErrors, otp: result });
    } else {
      startTransision2(async () => {
        try {
          const data = await confermationResult?.confirm(formData.otp);
          console.log(data);
          setErrmsg("");
          route("/");
        } catch (error) {
          console.log(error);
          setErrmsg("Otp not match");
        }
      });
    }
  };

  const handleResendOTP = (): void => {
    if (countdown === 0) {
      handleSendOTP();
    }
  };

  const validateMobileNumber = (number: string): undefined => {
    if (!number) {
      setFormErrors((prev) => ({
        ...prev,
        mobileNumber: "Mobile number is required",
      }));
    } else if (number.length < 10) {
      setFormErrors((prev) => ({
        ...prev,
        mobileNumber: "Please enter 10 digits mobile number",
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        mobileNumber: "",
      }));
    }
  };

  const validateOTP = (otp: string): string | undefined => {
    if (!otp) return "OTP is required";
    if (!/^\d{6}$/.test(otp)) return "Please enter a 6-digit OTP";
    return undefined;
  };

  return (
    <div className="login-container">
      <div id="auth" />
      <div className="login-card">
        <>
          <div
            className={`form-container ${
              isAnimating ? "form-exit-right" : "form-enter-left"
            }`}
          >
            <h1 className="form-title">Welcome to Fluid</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-fields">
                {!otpSent ? (
                  <>
                    <div className="form-field">
                      <label htmlFor="mobileNumber" className="field-label">
                        Mobile Number
                      </label>
                      <div className="input-container">
                        <div className="input-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <input
                          id="mobileNumber"
                          name="mobileNumber"
                          type="tel"
                          placeholder="Enter your mobile number"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className={`text-input ${
                            formErrors.mobileNumber ? "error-input" : ""
                          }`}
                          maxLength={10}
                          disabled
                        />
                      </div>
                      {formErrors.mobileNumber && (
                        <div className="error-container">
                          <svg
                            className="error-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 7v6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <circle cx="12" cy="16" r="1" fill="currentColor" />
                          </svg>
                          <span className="error-text">
                            {formErrors.mobileNumber}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      className="submit-button disabled:!bg-black/80 disabled:!border-none disabled:outline-none"
                      type="button"
                      onClick={handleSendOTP}
                      disabled={
                        isLoading ||
                        (isSubmitted && formData.mobileNumber.length !== 10)
                      }
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <Loader className="animate-spin" size={20} />
                          <span className="pl-3">Sending</span>
                        </span>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="form-field">
                      <p className="text-red-5 w-full text-center">{errmsg}</p>
                      <label htmlFor="otp" className="field-label">
                        Enter OTP
                      </label>
                      <div className="input-container">
                        <div className="input-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <input
                          id="otp"
                          name="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={formData.otp}
                          onChange={handleInputChange}
                          className={`text-input ${
                            formErrors.otp ? "error" : ""
                          }`}
                          maxLength={6}
                          disabled
                        />
                      </div>
                      {formErrors.otp && (
                        <div className="error-container">
                          <svg
                            className="error-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 7v6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <circle cx="12" cy="16" r="1" fill="currentColor" />
                          </svg>
                          <span className="error-text">{formErrors.otp}</span>
                        </div>
                      )}
                      <div className="resend-container pt-2">
                        <button
                          onClick={handleResendOTP}
                          className={`resend-button  ${
                            countdown > 0
                              ? "disabled"
                              : "underline underline-offset-1 cursor-pointer"
                          }`}
                          disabled={countdown > 0}
                          type="button"
                        >
                          Resend OTP {countdown > 0 ? `in ${countdown}s` : ""}
                        </button>
                      </div>
                    </div>

                    <button
                      className="submit-button disabled:!bg-black/80 disabled:!border-none disabled:outline-none"
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={isLoading}
                    >
                      {isLoading2 ? (
                        <span className="flex items-center justify-center">
                          <Loader className="animate-spin" size={20} />
                          <span className="pl-3">Verifing</span>
                        </span>
                      ) : (
                        "Verify"
                      )}
                    </button>

                    <button
                      className="border border-black rounded-3xl py-2 hover:bg-black hover:text-white ease-in duration-200 font-medium cursor-pointer"
                      type="button"
                      onClick={() => setOtpSent(false)}
                    >
                      Back
                    </button>
                  </>
                )}
              </div>

              <div className="info-section">
                <div className="info-container">
                  <div className="info-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="info-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="info-title">Can you change your plan?</h3>
                    <p className="info-text">
                      Whenever you need, Fluid will also change with you
                      according to your needs.
                    </p>
                    <a href="#" className="info-link">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div
            className={`image-container image-right ${
              isAnimating ? "image-exit-left" : "image-enter-right"
            }`}
          >
            <img src={pic1} alt="perfum" className="fluid-image" />
          </div>
        </>
      </div>
    </div>
  );
}
