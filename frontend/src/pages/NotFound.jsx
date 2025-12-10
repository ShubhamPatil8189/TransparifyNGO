import { Link } from "react-router-dom";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border border-border bg-card">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z" />
            </svg>
          </div>
          <span className="font-semibold">TransparifyNGO</span>
        </Link>
        <Link to="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <LinkIcon className="w-16 h-16 text-primary" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-0.5 bg-primary rotate-45 translate-y-1" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
          <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Sorry, the page you are looking for doesn't exist or has been moved. 
            Please check the URL and try again.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
            <Link to="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
