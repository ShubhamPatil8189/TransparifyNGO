import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col ">
      {/* HEADER — dashboard gradient + navbar */}
      <header
        className="sticky top-0 z-50"
        style={{
          background:
            "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
          position: "sticky",
        }}
      >
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto text-white">
          {/* left: logo + title */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
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

          {/* center: nav (hidden on small) */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/dashboard"
              className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
            >
              Dashboard
            </Link>
            <Link
              to="/all-campaigns"
              className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
            >
              Campaigns
            </Link>
            <Link
              to="/donor-list"
              className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
            >
              Donors
            </Link>
            <Link
              to="/reports"
              className="px-3 py-2 text-sm rounded-md hover:bg-white/10"
            >
              Reports
            </Link>
          </nav>

          {/* right: search (small icon), support */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/12 text-white text-sm"
              aria-label="search"
              type="button"
            >
              <Search className="w-4 h-4" />{" "}
              <span className="hidden sm:inline">Search</span>
            </button>

            <Link to="/help">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Tabs defaultValue="admin" className="w-full">
            {/* TAB BUTTONS */}
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="admin">Admin Login</TabsTrigger>
              <TabsTrigger value="donor">Donor Login / Register</TabsTrigger>
            </TabsList>

            {/* ---------------- ADMIN LOGIN TAB ---------------- */}
            <TabsContent value="admin">
              <div className="bg-card rounded-lg shadow-sm border border-border p-8">
                <h2 className="text-2xl font-semibold text-center mb-8">
                  Admin Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      type="email"
                      placeholder="admin@example.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <label htmlFor="remember" className="text-sm">
                        Remember Me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full">
                    Secure Login
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Not an administrator? Contact your NGO's administrator.
                  </p>
                </form>
              </div>
            </TabsContent>

            {/* ---------------- DONOR LOGIN / REGISTER TAB ---------------- */}
            <TabsContent value="donor">
              <div className="bg-card rounded-lg shadow-sm border border-border p-8">
                <h2 className="text-2xl font-semibold text-center mb-8">
                  Donor Login / Register
                </h2>

                <div className="space-y-4">
                  <Button
                    className="w-full"
                    onClick={() => navigate("/donor-login")}
                  >
                    Donor Login
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => navigate("/donor-register")}
                  >
                    Register as Donor
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t border-border">
        © 2024 TransparencyHub. All rights reserved.
        <Link to="/privacy" className="ml-2 hover:underline">
          Privacy Policy
        </Link>{" "}
        |
        <Link to="/terms" className="ml-1 hover:underline">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
