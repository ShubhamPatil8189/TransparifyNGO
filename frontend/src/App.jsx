import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuditLogs from "./pages/AuditLogs";
import Beneficiaries from "./pages/Beneficiaries";
import AllCampaigns from "./pages/AllCampaigns";
import CampaignManagement from "./pages/CampaignManagement";
import CreateCampaign from "./pages/CreateCampaign";
import DonationDetails from "./pages/DonationDetails";
import DonorRegistration from "./pages/DonorRegistration";
import DonorLogin from "./pages/DonorLogin";
import DonorReceipts from "./pages/DonorReceipts";
import DonorDashboard from "./pages/DonorDashboard";
import HelpSupport from "./pages/HelpSupport";
import InKindInventory from "./pages/InKindInventory";
import AddInKindItem from "./pages/AddInKindItem";
import CampaignDetail from "./pages/CampaignDetail";
import AuditorDashboard from "./pages/AuditorDashboard";
import ReceiptVerification from "./pages/ReceiptVerification";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import TransactionsList from "./pages/TransactionsList";
import TransactionDetails from "./pages/TransactionDetails";
import NGODashboard from "./pages/NGODashboard";
import DonorsList from "./pages/DonorsList";
import About from "./pages/About";
import AdminServices from "./pages/services/AdminService";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/beneficiaries" element={<Beneficiaries />} />
            <Route path="/all-campaigns" element={<AllCampaigns />} />
            <Route path="/campaigns" element={<CampaignManagement />} />
            <Route path="/campaigns/create" element={<CreateCampaign />} />
            <Route path="/campaign/:id" element={<CampaignDetail />} />
            <Route path="/donation/:id" element={<DonationDetails />} />
            <Route path="/transactions/details/:id" element={<TransactionDetails />} />
            <Route path="/register" element={<DonorRegistration />} />
            <Route path="/donor-login" element={<DonorLogin />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/donor-receipts" element={<DonorReceipts />} />
            <Route path="/help" element={<HelpSupport />} />
            <Route path="/inventory" element={<InKindInventory />} />
            <Route path="/inventory/add" element={<AddInKindItem />} />
            <Route path="/auditor" element={<AuditorDashboard />} />
            <Route path="/verify/:id" element={<ReceiptVerification />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/transactions" element={<TransactionsList />} />
            <Route path="/donors" element={<Dashboard />} />
            {/* <Route path="/reports" element={<Dashboard />} /> */}
            <Route path="/settings" element={<Dashboard />} />
            <Route path="/donor-details-dashboard" element={<NGODashboard />} />
            <Route path="/donor-list" element={<DonorsList />} />
            <Route path="*" element={<NotFound />} />
            <Route path="services" element={<AdminServices/>}/>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

