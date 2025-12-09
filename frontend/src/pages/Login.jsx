import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-lg text-primary">TransparencyHub</h1>
            <p className="text-xs text-muted-foreground">
              Financial Management & Transparency
            </p>
          </div>
        </Link>

        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <HelpCircle className="w-4 h-4 mr-2" />
          Support
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-sm border border-border p-8">
            <h2 className="text-2xl font-semibold text-center mb-8">Admin Login</h2>

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
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm">Remember Me</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
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
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t border-border">
        © 2024 TransparencyHub. All rights reserved. 
        <Link to="/privacy" className="ml-2 hover:underline">Privacy Policy</Link> | 
        <Link to="/terms" className="ml-1 hover:underline">Terms of Service</Link>
      </footer>
    </div>
  );
}
