import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-4 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2024 NGO Transparent. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
