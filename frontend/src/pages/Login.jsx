import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, HelpCircle, Search } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext"; // assume you have AuthContext

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { checkAuth } = useAuth(); // frontend auth context

  // 🔐 ADMIN LOGIN HANDLER
  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      // Step 1: Login
      await axios.post(
        "http://localhost:4000/api/auth/loginAdmin",
        { email, password },
        { withCredentials: true }
      );

      // Step 2: Re-validate auth immediately
      const user = await checkAuth(); // ✅ now returns user

      if (user?.roles?.includes("ADMIN")) {
        toast.success("Admin login successful");
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("You are not authorized as admin");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* HEADER */}
      <header
        className="sticky top-0 z-50"
        style={{
          background:
            "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto text-white">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="font-semibold text-lg">TransparifyNGO</h1>
              <div className="text-xs text-white/80">
                Financial Management & Transparency
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link to="/dashboard" className="px-3 py-2 text-sm rounded-md hover:bg-white/10">
              Dashboard
            </Link>
            <Link to="/all-campaigns" className="px-3 py-2 text-sm rounded-md hover:bg-white/10">
              Campaigns
            </Link>
            <Link to="/donor-list" className="px-3 py-2 text-sm rounded-md hover:bg-white/10">
              Donors
            </Link>
            <Link to="/reports" className="px-3 py-2 text-sm rounded-md hover:bg-white/10">
              Reports
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/12 text-sm">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <Link to="/help">
              <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Tabs defaultValue="admin">
            <TabsList className="grid grid-cols-2 w-full mb-6 bg-muted p-1 rounded-lg select-none">
              <TabsTrigger
                value="admin"
                className="select-none rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Admin Login
              </TabsTrigger>

              <TabsTrigger
                value="donor"
                className="select-none rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Donor Login / Register
              </TabsTrigger>
            </TabsList>

            {/* ADMIN LOGIN */}
            <TabsContent value="admin">
              <div className="bg-card rounded-lg border p-8">
                <h2 className="text-2xl font-semibold text-center mb-8">
                  Admin Login
                </h2>

                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-sm text-primary">
                      Forgot Password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full">
                    Secure Admin Login
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* DONOR */}
            <TabsContent value="donor">
              <div className="bg-card rounded-lg border p-8 space-y-4">
                <Button className="w-full" onClick={() => navigate("/donor-login")}>
                  Donor Login
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/donor-register")}>
                  Register as Donor
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="py-4 text-center text-sm border-t">
        © 2024 TransparifyNGO
      </footer>
    </div>
  );
}
