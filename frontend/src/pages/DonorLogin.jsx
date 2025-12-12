import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";

const DonorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // <-- removed TypeScript type annotation here
  const API_BASE_URL = "http://localhost:4000";

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      // Save token if needed
      navigate("/donor-dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to fetch. Check backend URL and CORS.");
  }
};



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 to-background">
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden flex">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">Donor Login</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 w-full rounded-md border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 w-full rounded-md border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="text-primary hover:underline text-sm">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-12 text-base rounded-md bg-primary text-primary-foreground hover:opacity-95"
              >
                Log In
              </button>

              <p className="text-center text-muted-foreground">
                New Donor?{" "}
                <Link to="/donor-register" className="text-primary font-medium hover:underline">
                  Register Here
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block w-1/2 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  Empowering Donors with<br />Transparent Giving.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonorLogin;
