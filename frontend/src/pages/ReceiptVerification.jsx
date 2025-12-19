import { Link } from "react-router-dom";
import { CheckCircle, Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DonorNavbar from "@/components/layout/DonorNavbar";

const ReceiptVerification = () => {
  const verificationHash =
    "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b";

  const copyHash = () => {
    navigator.clipboard.writeText(verificationHash);
    toast.success("Hash copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">

      {/* ⭐ STICKY NAVBAR WITH GRADIENT + DASHBOARD BUTTON */}
      <DonorNavbar/>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">

          {/* Verified Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-lg font-semibold mb-6">
            <CheckCircle className="h-6 w-6" />
            VERIFIED
          </div>

          <p className="text-muted-foreground mb-8">
            This receipt has been successfully verified against the blockchain record and is authentic.
          </p>

          {/* Receipt Details Card */}
          <div className="bg-card rounded-lg p-8 text-left">
            <h2 className="text-xl font-bold mb-2">Receipt Details</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Transaction details as recorded in our system.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">NGO Name</span>
                <span className="font-medium">Hope Foundation</span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Transaction Amount</span>
                <span className="font-medium">€150.00</span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Transaction Date</span>
                <span className="font-medium">2023-10-26 14:30 UTC</span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Receipt ID</span>
                <span className="font-medium font-mono">TXN-1A2B3C4D5E</span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Donor Name</span>
                <span className="font-medium">Anonymous</span>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Verification Hash</span>
                  <button className="text-primary hover:text-primary/80">
                    <Info className="h-4 w-4" />
                  </button>
                </div>

                <div className="bg-muted rounded-lg p-3 flex items-center justify-between gap-2">
                  <code className="text-xs font-mono text-muted-foreground truncate">
                    {verificationHash}
                  </code>

                  <Button variant="ghost" size="sm" onClick={copyHash}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          © 2024 Hope Foundation. All rights reserved.
        </p>

        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>·</span>
          <Link to="/contact" className="hover:text-foreground">Contact Us</Link>
          <span>·</span>
          <Link to="/what-is-this" className="hover:text-foreground">What is this?</Link>
        </div>
      </footer>

    </div>
  );
};

export default ReceiptVerification;
