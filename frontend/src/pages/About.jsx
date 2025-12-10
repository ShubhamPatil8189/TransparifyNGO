import { Link, useLocation } from "react-router-dom";
import { DollarSign, Users, FileText, Heart, ChevronRight, Shield, BarChart3, Receipt, Search, Bell, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardHeader from "@/components/layout/DashboardHeader";
const campaigns = [
  {
    title: "Clean Water for Rural Villages",
    progress: 75,
    raised: "$50,000",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300",
  },
  {
    title: "Education for All",
    progress: 40,
    raised: "$100,000",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300",
  },
  {
    title: "Disaster Relief Fund",
    progress: 90,
    raised: "$200,000",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300",
  },
];

const steps = [
  { icon: DollarSign, title: "1. Donate Securely.", description: "Contribute to verified NGO campaigns." },
  { icon: BarChart3, title: "2. Track Real-time.", description: "See how your donation is used in transparent dashboards." },
  { icon: Receipt, title: "3. Witness Impact.", description: "Receive updates and automated receipts." },
];

export default function About() {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Campaigns", path: "/all-campaigns" },
    { label: "Transactions", path: "/transactions" },
    { label: "Donors", path: "/donor-list" },
    { label: "Reports", path: "/reports" },
    { label: "About", path: "/landing" },
  ];

  return (
    <div className="min-h-screen bg-background">
        <DashboardHeader />
      {/* Header: matches DashboardHeader (gradient) + search */}
      {/* <header
        className="text-primary-foreground"
        style={{
          background:
            "linear-gradient(135deg, hsl(199, 89%, 30%) 0%, hsl(160, 84%, 30%) 100%)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-semibold text-lg text-white">TransparifyNGO</span>
                <div className="text-xs text-white/80">NGO Network</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-white/12 text-white"
                      : "text-white/80 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search 
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
              <Input
                placeholder="Search"
                className="pl-10 w-64 bg-white/10 border border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            {/* Bell 
            <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10">
              <Bell className="w-5 h-5 text-white" />
            </button>

            {/* User
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-sm text-white">Guest</span>
            </div>

            {/* Login / Donate 
            <Link to="/donor-login">
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header> */}

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                  Empowering NGOs Through<br />
                  <span className="text-primary">Financial Transparency.</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Consolidating transactions, automating receipts, and building trust with every donation.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-6">
                    Donate Now
                  </Button>
                  <Button variant="outline" className="h-12 px-6">
                    Explore Campaigns
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600"
                    alt="NGO Work"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Campaigns */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Campaigns</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {campaigns.map((campaign, index) => (
                <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-4">{campaign.title}</h3>
                    <div className="mb-2">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>{campaign.progress}% of {campaign.raised}</span>
                      <span>Raised</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact & Transparency</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Total Donations:</p>
                <p className="text-3xl font-bold text-primary">$1,540,000</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <p className="text-sm text-muted-foreground">Beneficiaries Impacted:</p>
                <p className="text-3xl font-bold text-secondary">120,000+</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Active Programs:</p>
                <p className="text-3xl font-bold text-primary">45+</p>
              </div>
            </div>

            {/* How It Works */}
            <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-sm text-muted-foreground">Contact Us</p>
              <p className="text-sm text-muted-foreground">Your marcecnmt</p>
              <p className="text-sm text-muted-foreground">Transparent NGO Network</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social Media</h4>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">f</div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">t</div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">in</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
