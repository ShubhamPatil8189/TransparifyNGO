import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "NGOs", path: "/ngos" },
  { label: "Contact", path: "/contact" },
  { label: "Donor Login", path: "/login" },
];

const ngos = [
  "Save the Children",
  "World Wildlife Fund",
  "Doctors Without Borders",
  "GlobalGiving",
];

export default function DonorRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedNgo, setSelectedNgo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-semibold text-lg">NGO Transparency Hub</Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center p-6 min-h-[calc(100vh-65px)]">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-sm border border-primary/20 p-8">
            <h2 className="text-2xl font-semibold text-center mb-8">Donor Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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

              <Input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Select value={selectedNgo} onValueChange={setSelectedNgo}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose NGO (Optional)" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {ngos.map((ngo) => (
                    <SelectItem key={ngo} value={ngo}>{ngo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full">
                Register
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
