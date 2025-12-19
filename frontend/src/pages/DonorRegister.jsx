import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // for notifications
import { PublicHeader } from "@/components/layout/PublicHeader";

export default function DonorRegister() {
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:4000";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loadingOtp, setLoadingOtp] = useState(false); // loading state for OTP
  const [loadingRegister, setLoadingRegister] = useState(false); // loading state for register
  const [timer, setTimer] = useState(180); // 3 minutes in seconds

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Send OTP handler
  const handleSendOtp = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = { name, email, password };

    try {
      setLoadingOtp(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/registerTemp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
        setTimer(180); // reset timer
      } else {
        toast.error(data.message || data.error || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoadingOtp(false);
    }
  };

  // OTP input change
  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
      if (!value && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    }
  };

  // Register handler
  const handleRegister = async () => {
    if (otp.some((o) => o === "")) {
      toast.error("Enter complete OTP");
      return;
    }

    try {
      setLoadingRegister(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: otp.join(""),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful!");
        navigate("/donor-login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoadingRegister(false);
    }
  };

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* HEADER */}
      <PublicHeader/>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-sm p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Donor Registration</h2>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {/* Send OTP */}
          {!otpSent && (
            <Button className="w-full mt-2" onClick={handleSendOtp} disabled={loadingOtp}>
              {loadingOtp ? "Sending OTP..." : "Send OTP"}
            </Button>
          )}

          {/* OTP Fields */}
          {otpSent && (
            <div className="space-y-4 mt-4">
              <div className="flex justify-center gap-3">
                {otp.map((o, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    maxLength={1}
                    className="text-center w-14 h-14 text-xl font-semibold border rounded-md focus:ring-2 focus:ring-blue-400"
                    value={o}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center text-sm text-muted-foreground">
                {timer > 0 ? (
                  <span>Resend OTP in {formatTime(timer)}</span>
                ) : (
                  <Button variant="link" onClick={handleSendOtp} disabled={loadingOtp}>
                    Resend OTP
                  </Button>
                )}
              </div>

              {/* Register */}
              <Button className="w-full" onClick={handleRegister} disabled={loadingRegister}>
                {loadingRegister ? "Registering..." : "Register"}
              </Button>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Already a donor?{" "}
            <Link to="/donor-login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t border-border">
        © 2024 TransparencyHub. All rights reserved.
        <Link to="/privacy" className="ml-2 hover:underline">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link to="/terms" className="ml-1 hover:underline">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
