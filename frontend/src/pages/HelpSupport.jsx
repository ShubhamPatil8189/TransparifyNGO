import { useState } from "react";
import { Search, Info, FileText, Users, BarChart3, Settings, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { cn } from "@/lib/utils";

const helpTopics = [
  { id: "getting-started", label: "Getting Started", icon: Info },
  { id: "transactions", label: "Managing Transactions", icon: FileText },
  { id: "donors", label: "Donor Management", icon: Users },
  { id: "reporting", label: "Reporting & Transparency", icon: BarChart3 },
  { id: "settings", label: "Account & Settings", icon: Settings },
];

const faqs = {
  "getting-started": [
    {
      question: "How do I set up my account?",
      answer:
        "To set up your account, start by clicking the 'Sign Up' button on the homepage. You will be prompted to enter your NGO's information, including name, registration number, and contact details. Once submitted, you will receive a verification email to activate your account.",
    },
    {
      question: "How do I navigate the main dashboard?",
      answer:
        "The main dashboard provides an overview of your organization's financial health. You can access different sections using the sidebar navigation on the left.",
    },
    {
      question: "What are the first steps to take?",
      answer:
        "After setting up your account, we recommend completing your organization profile, adding team members, and setting up your first campaign.",
    },
    {
      question: "How do I customize my public profile?",
      answer:
        "Navigate to Settings > Public Profile to customize how your organization appears to donors. You can add your logo, description, and impact metrics.",
    },
  ],
  transactions: [
    {
      question: "How do I record a new transaction?",
      answer:
        "Click on 'Transactions' in the sidebar, then click 'Add New Transaction'. Fill in the required details and save.",
    },
    {
      question: "How do I export transaction reports?",
      answer:
        "Navigate to the Transactions page and click 'Export' to download your transaction data in CSV or PDF format.",
    },
  ],
  donors: [
    {
      question: "How do I add a new donor?",
      answer:
        "Go to the Donors section and click 'Add Donor'. Enter their contact information and any notes about their giving history.",
    },
  ],
  reporting: [
    {
      question: "How do I generate reports?",
      answer:
        "Navigate to the Reports section, select your date range and report type, then click 'Generate Report'.",
    },
  ],
  settings: [
    {
      question: "How do I change my password?",
      answer:
        "Go to Settings > Security > Change Password. Enter your current password and your new password, then save.",
    },
  ],
};

const HelpSupport = () => {
  const [selectedTopic, setSelectedTopic] = useState("getting-started");
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const currentFaqs = faqs[selectedTopic] || [];

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
          <p className="text-muted-foreground mt-1">How can we help you today?</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">Help Topics</h2>
            <nav className="space-y-1">
              {helpTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
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
          </div>

          {/* Main Content */}
          <div className="flex-1">
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

            {/* Topic Title */}
            <h2 className="text-xl font-bold text-foreground mb-6">
              {helpTopics.find((t) => t.id === selectedTopic)?.label}
            </h2>

            {/* FAQs */}
            <div className="space-y-4">
              {currentFaqs.map((faq, index) => (
                <div key={index} className="bg-card rounded-lg border">
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
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

            {/* Contact Support */}
            <div className="mt-8 bg-muted/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is here to assist you.
              </p>
              <Button className="bg-primary">
                <Send className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpSupport;
