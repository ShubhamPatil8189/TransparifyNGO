import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart3, Users, Heart } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-xl text-primary">NGO TransparencyHub</h1>
              <p className="text-xs text-muted-foreground">Financial Management & Transparency</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/all-campaigns" className="text-sm text-muted-foreground hover:text-foreground">Campaigns</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
            <Link to="/register">
              <Button>Donate Now</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="nav-header text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Transparent Giving,<br />Meaningful Impact
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Track every donation. See real impact. Build trust through complete financial transparency in charitable giving.
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-in">
            <Link to="/all-campaigns">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Browse Campaigns
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Become a Donor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TransparencyHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Complete Transparency</h3>
              <p className="text-sm text-muted-foreground">Every transaction is logged and verifiable with blockchain-like audit trails.</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-sm text-muted-foreground">Watch your donations work in real-time with live campaign updates.</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Verified NGOs</h3>
              <p className="text-sm text-muted-foreground">All partner organizations are thoroughly vetted and verified.</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2">Impact Reports</h3>
              <p className="text-sm text-muted-foreground">Receive detailed reports showing exactly how your donation helped.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Explore the Platform</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Link to="/dashboard" className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
              <p className="font-medium">Admin Dashboard</p>
            </Link>
            <Link to="/all-campaigns" className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
              <p className="font-medium">All Campaigns</p>
            </Link>
            <Link to="/beneficiaries" className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
              <p className="font-medium">Beneficiaries</p>
            </Link>
            <Link to="/audit-logs" className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
              <p className="font-medium">Audit Logs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2024 NGO TransparencyHub. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
