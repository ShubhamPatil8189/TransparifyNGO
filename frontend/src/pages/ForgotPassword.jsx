import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://transparifyngo.onrender.com";
const RESEND_TIME = 180;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");

  // ✅ separate loading states
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step !== 2 || canResend) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, canResend]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter your email");

    setSendingOtp(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/sendOtp`, {
        email,
        purpose: "forgot",
      });

      toast.success("OTP sent to your email");
      setStep(2);
      setTimer(RESEND_TIME);
      setCanResend(false);
      setOtp(["", "", "", ""]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  /* ================= RESEND OTP ================= */
  const handleResendOtp = async () => {
    if (!canResend) return;

    setResendingOtp(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/sendOtp`, {
        email,
        purpose: "forgot",
      });

      toast.success("OTP resent successfully");
      setTimer(RESEND_TIME);
      setCanResend(false);
      setOtp(["", "", "", ""]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendingOtp(false);
    }
  };

  /* ================= VERIFY + RESET ================= */
  const handleVerifyAndReset = async () => {
    if (updatingPassword) return;

    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      toast.error("Enter the 4-digit OTP");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setUpdatingPassword(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/forgotpass`, {
        email,
        code: otpCode,
        newPassword,
      });

      toast.success("Password updated successfully");
      navigate("/donor-login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <PublicHeader />

      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card p-6 rounded-xl shadow-lg mt-10">

          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Forgot Password
              </h2>

              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />

              <Button
                onClick={handleSendOtp}
                className="w-full"
                disabled={sendingOtp}
              >
                {sendingOtp ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Enter OTP & New Password
              </h2>

              <div className="flex justify-between mb-4 gap-2">
                {otp.map((value, index) => (
                  <Input
                    key={index}
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="text-center text-lg font-bold w-14 h-14"
                  />
                ))}
              </div>

              <Input
                type="password"
                placeholder="New password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-4"
              />

              <Button
                onClick={handleVerifyAndReset}
                className="w-full mb-3"
                disabled={updatingPassword}
              >
                {updatingPassword ? "Updating..." : "Update Password"}
              </Button>

              <div className="text-center text-sm">
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    disabled={resendingOtp}
                    className="text-primary font-medium hover:underline disabled:opacity-50"
                  >
                    {resendingOtp ? "Resending..." : "Resend OTP"}
                  </button>
                ) : (
                  <span className="text-muted-foreground">
                    Resend OTP in {formatTime(timer)}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
