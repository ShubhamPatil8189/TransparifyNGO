import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";


const DonorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:4000";

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      // Fetch the current user to update AuthProvider
      const userRes = await fetch(`${API_BASE_URL}/api/auth/checkAuth`, {
        method: "GET",
        credentials: "include",
      });
      const currentUser = await userRes.json();
      setUser(currentUser.user || currentUser); // <-- update user in AuthContext

      toast.success("Login successful");
      navigate("/donor-dashboard"); // navigate immediately
    } else {
      toast.error(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 to-background">
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden flex">
          
          {/* Left - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">
              Donor Login
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 w-full rounded-md border border-border bg-input focus:ring-2 focus:ring-primary/50 transition"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 w-full rounded-md border border-border bg-input focus:ring-2 focus:ring-primary/50 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Forgot */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-primary text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-md flex items-center justify-center gap-2 
                  bg-primary text-primary-foreground font-medium
                  transition-all duration-300
                  ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}`}
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                {loading ? "Logging in..." : "Log In"}
              </button>

              <p className="text-center text-muted-foreground">
                New Donor?{" "}
                <Link to="/donor-register" className="text-primary font-medium hover:underline">
                  Register Here
                </Link>
              </p>
            </form>
          </div>

          {/* Right - Image */}
          <div className="hidden md:block w-1/2 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold text-center px-6">
                Transparent Giving,<br />Real Impact ❤️
              </h2>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonorLogin;
