import { useState } from "react";
import {
  Search,
  Info,
  FileText,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DonorNavbar from "@/components/layout/DonorNavbar";

/* ------------------ Help Topics ------------------ */
const helpTopics = [
  { id: "getting-started", label: "Getting Started", icon: Info },
  { id: "transactions", label: "Managing Transactions", icon: FileText },
  { id: "donors", label: "Donor Management", icon: Users },
  { id: "reporting", label: "Reporting & Transparency", icon: BarChart3 },
  { id: "settings", label: "Account & Settings", icon: Settings },
];

/* ------------------ FAQs ------------------ */
const faqs = {
  "getting-started": [
    {
      question: "How do I set up my account?",
      answer:
        "To set up your account, click the Sign Up button and complete your organization details. Verify your email to activate the account.",
    },
    {
      question: "How do I navigate the dashboard?",
      answer:
        "Use the navigation menu to access campaigns, transactions, donors, and reports.",
    },
  ],
  transactions: [
    {
      question: "How do I record a transaction?",
      answer:
        "Go to Transactions → Add New Transaction and fill in the details.",
    },
  ],
  donors: [
    {
      question: "How do I add a donor?",
      answer:
        "Navigate to Donors → Add Donor and provide donor information.",
    },
  ],
  reporting: [
    {
      question: "How do I generate reports?",
      answer:
        "Go to Reports, select date range and report type, then click Generate.",
    },
  ],
  settings: [
    {
      question: "How do I change my password?",
      answer:
        "Go to Settings → Security → Change Password.",
    },
  ],
};

const UserHelp = () => {
  const [selectedTopic, setSelectedTopic] = useState("getting-started");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const currentFaqs = faqs[selectedTopic] || [];

  return (
    <div className="min-h-screen bg-muted/30">
      <DonorNavbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground mt-1">
            How can we help you today?
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Help Topics
            </h2>
            <nav className="space-y-1">
              {helpTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                    selectedTopic === topic.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <topic.icon className="h-4 w-4" />
                  {topic.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <section className="flex-1">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <h2 className="text-xl font-bold mb-6">
              {helpTopics.find((t) => t.id === selectedTopic)?.label}
            </h2>

            {/* FAQs */}
            <div className="space-y-4">
              {currentFaqs.map((faq, index) => (
                <div key={index} className="bg-card border rounded-lg">
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full flex justify-between px-6 py-4 text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>

                  {expandedFaq === index && (
                    <div className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-8 bg-muted/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                Still need help?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our support team is here to assist you.
              </p>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserHelp;
