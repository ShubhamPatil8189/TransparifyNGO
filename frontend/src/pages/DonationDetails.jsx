import { Link } from "react-router-dom";
import { CheckCircle, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Donations", path: "/donations", active: true },
  { label: "Profile", path: "/profile" },
];

export default function DonationDetails() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="nav-header text-primary-foreground">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold">NGO Transparency Portal</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-primary-foreground/20"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm">John Doe</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Donation Details #12345</h1>
            <p className="text-muted-foreground">Dashboard › Donations › #12345</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Donation Summary */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Donation Summary</h2>
              <div className="nav-header rounded-lg p-6 text-primary-foreground mb-4">
                <p className="text-4xl font-bold mb-2">$500.00 USD</p>
                <p className="text-sm opacity-80">October 26, 2023 | One-time Credit Card</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4 mb-4">
                <div className="flex items-center gap-2 text-success mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Verified & Processed</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button className="bg-success hover:bg-success/90 text-success-foreground">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt (PDF)
                  </Button>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-muted rounded-lg mb-2 flex items-center justify-center">
                      <svg className="w-16 h-16 text-foreground" viewBox="0 0 100 100">
                        <rect x="10" y="10" width="20" height="20" fill="currentColor" />
                        <rect x="40" y="10" width="10" height="10" fill="currentColor" />
                        <rect x="60" y="10" width="20" height="20" fill="currentColor" />
                        <rect x="10" y="40" width="10" height="10" fill="currentColor" />
                        <rect x="30" y="40" width="20" height="20" fill="currentColor" />
                        <rect x="60" y="40" width="10" height="10" fill="currentColor" />
                        <rect x="80" y="40" width="10" height="10" fill="currentColor" />
                        <rect x="10" y="60" width="20" height="20" fill="currentColor" />
                        <rect x="40" y="60" width="10" height="20" fill="currentColor" />
                        <rect x="60" y="60" width="20" height="20" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      QR Verification<br />for Authenticity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact & Transparency */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Impact & Transparency</h2>
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-medium mb-3">Donation Usage</h3>
                <div className="mb-4">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: "80%" }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Clean Water Initiative (80% Funded)
                  </p>
                </div>

                <p className="text-sm mb-4">
                  <strong>Allocated to:</strong> Provide 10 families with clean water filters in Rural District A.
                </p>

                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=100&h=80&fit=crop"
                      alt="Beneficiary update"
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">Beneficiary Update:</p>
                      <p className="text-sm text-muted-foreground">
                        Water access improved. Photo by NGO Field Team.
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View Full Project Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-sm text-muted-foreground border-t border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            <Link to="/contact" className="hover:underline">Contact Us</Link>
          </div>
          <p>© 2023 NGO Transparency Portal</p>
        </div>
      </footer>
    </div>
  );
}
