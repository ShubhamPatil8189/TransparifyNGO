// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Index from "./pages/Index";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import AuditLogs from "./pages/AuditLogs";
// import Beneficiaries from "./pages/Beneficiaries";
// import AllCampaigns from "./pages/AllCampaigns";
// import CampaignManagement from "./pages/CampaignManagement";
// import CreateCampaign from "./pages/CreateCampaign";
// import DonationDetails from "./pages/DonationDetails";
// import DonorLogin from "./pages/DonorLogin";
// import DonorReceipts from "./pages/DonorReceipts";
// import DonorDashboard from "./pages/DonorDashboard";
// import HelpSupport from "./pages/HelpSupport";
// import InKindInventory from "./pages/InKindInventory";
// import AddInKindItem from "./pages/AddInKindItem";
// import CampaignDetail from "./pages/CampaignDetail";
// import AuditorDashboard from "./pages/AuditorDashboard";
// import ReceiptVerification from "./pages/ReceiptVerification";
// import LandingPage from "./pages/LandingPage";
// import NotFound from "./pages/NotFound";
// import TransactionsList from "./pages/TransactionsList";
// import TransactionDetails from "./pages/TransactionDetails";
// import DonorDetailsDashboard from "./pages/DonarDetailsDashBoard";
// import DonorsList from "./pages/DonorsList";
// import DonorReg from "./pages/DonorRegister";
// import AdminServices from "./pages/services/AdminService";
// import Donate from "./pages/Donate";
// import DonorProfile from "./pages/DonorProfile";
// import AdminProfile from "./pages/AdminProfile";
// import ForgotPass from "./pages/ForgotPassword";
// import DonorDetail from "./pages/DonorDetail";
// import UserHelp from "./pages/UserHelp";
// import AllCampaignsPublic from "./pages/AllCampaignsPublic";
// import DonorDonation from "./pages/DonorDonation";

// import ProtectedRoute from "./auth/ProtectedRoute";

// const queryClient = new QueryClient();

// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />

//         <BrowserRouter>
//           <Routes>

//             {/* ---------- PUBLIC ROUTES ---------- */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/landing" element={<LandingPage />} />
//             <Route path="/home" element={<Index />} />
//             <Route path="/about" element={<Index />} />

//             <Route path="/login" element={<Login />} />
//             <Route path="/donor-login" element={<DonorLogin />} />
//             <Route path="/donor-register" element={<DonorReg />} />
//             <Route path="/forgot-password" element={<ForgotPass />} />
//             <Route path="/help" element={<HelpSupport />} />
//             <Route path="/all-public-compaign" element={<AllCampaignsPublic />} />

//             {/* ---------- DONOR PROTECTED ---------- */}
//             <Route element={<ProtectedRoute />}>
//               <Route path="/donor-dashboard" element={<DonorDashboard />} />
//               <Route path="/donor-receipts" element={<DonorReceipts />} />
//               <Route path="/donate" element={<Donate />} />
//               <Route path="/donor-profile" element={<DonorProfile />} />
//               <Route path="/verify/:id" element={<ReceiptVerification />} />
//               <Route path="/donar-donation" element={<DonorDonation />} />
//                <Route path="/userhelp" element={<UserHelp/>}/>
//             </Route>

//             {/* ---------- ADMIN PROTECTED ---------- */}
//             <Route element={<ProtectedRoute role="ADMIN" />}>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/admin-profile" element={<AdminProfile />} />
//               <Route path="/audit-logs" element={<AuditLogs />} />
//               <Route path="/beneficiaries" element={<Beneficiaries />} />
//               <Route path="/all-campaigns" element={<AllCampaigns />} />
//               <Route path="/campaigns" element={<CampaignManagement />} />
//               <Route path="/campaigns/create" element={<CreateCampaign />} />
//               <Route path="/campaign/:id" element={<CampaignDetail />} />
//               <Route path="/donation/:id" element={<DonationDetails />} />
//               <Route path="/transactions" element={<TransactionsList />} />
//               <Route path="/transactions/details/:id" element={<TransactionDetails />} />
//               <Route path="/inventory" element={<InKindInventory />} />
//               <Route path="/inventory/add" element={<AddInKindItem />} />
//               <Route path="/settings" element={<Dashboard />} />
//               <Route path="/donor-details-dashboard" element={<DonorDetailsDashboard />} />
//               <Route path="/donor-list" element={<DonorsList />} />
//               <Route path="/donor/:id" element={<DonorDetail />} />
//               <Route path="/services" element={<AdminServices />} />
//             </Route>

//             {/* ---------- AUDITOR ---------- */}
//             <Route path="/auditor" element={<AuditorDashboard />} />

//             {/* ---------- FALLBACK ---------- */}
//             <Route path="*" element={<NotFound />} />

//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuditLogs from "./pages/AuditLogs";
import Beneficiaries from "./pages/Beneficiaries";
import AllCampaigns from "./pages/AllCampaigns";
import CampaignManagement from "./pages/CampaignManagement";
import CreateCampaign from "./pages/CreateCampaign";
import DonationDetails from "./pages/DonationDetails";
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
// import NGODashboard from "./pages/NGODashboard";
import DonorDetailsDashboard from "./pages/DonarDetailsDashBoard";
import DonorsList from "./pages/DonorsList";
import DonorReg from "./pages/DonorRegister";
import AdminServices from "./pages/services/AdminService";
import Donate from "./pages/Donate";
import DonorProfile from "./pages/DonorProfile";
import AdminProfile from "./pages/AdminProfile";
import ForgotPass from "./pages/ForgotPassword";
import DonorDetail from "./pages/DonorDetail";
import UserHelp from "./pages/UserHelp";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AllCampaignsPublic from "./pages/AllCampaignsPublic";
import DonorDonation from "./pages/DonorDonation";
import TransparencyWall from "./pages/TransparencyWall";
import AIAnalytics from "./pages/AIAnalytics";
import AIChatbot from "./components/AIChatbot";
import ProtectedRoute from "./auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/home" element={<Index />} />
          <Route path="/about" element={<Index />} />

          <Route path="/login" element={<Login />} />
          <Route path="/donor-login" element={<DonorLogin />} />
          <Route path="/donor-register" element={<DonorReg />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/all-public-compaign" element={<AllCampaignsPublic />} />
          <Route path="/transparency" element={<TransparencyWall />} />

          {/* ---------- DONOR PROTECTED ---------- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/donor-receipts" element={<DonorReceipts />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donor-profile" element={<DonorProfile />} />
            <Route path="/verify/:id" element={<ReceiptVerification />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path='/donar-donation' element={<DonorDonation />} />
          </Route>

          {/* ---------- ADMIN / NGO PROTECTED ---------- */}
          <Route element={<ProtectedRoute role="ADMIN" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/beneficiaries" element={<Beneficiaries />} />
            <Route path="/all-campaigns" element={<AllCampaigns />} />
            <Route path="/campaigns" element={<CampaignManagement />} />
            <Route path="/campaigns/create" element={<CreateCampaign />} />
            <Route path="/campaign/:id" element={<CampaignDetail />} />
            <Route path="/donation/:id" element={<DonationDetails />} />
            <Route path="/transactions" element={<TransactionsList />} />
            <Route path="/transactions/details/:id" element={<TransactionDetails />} />
            <Route path="/inventory" element={<InKindInventory />} />
            <Route path="/inventory/add" element={<AddInKindItem />} />
            <Route path="/settings" element={<Dashboard />} />
            <Route path="/donor-details-dashboard" element={<DonorDetailsDashboard />} />
            <Route path="/donor-list" element={<DonorsList />} />
            <Route path="/donor/:id" element={<DonorDetail />} />
            <Route path="/services" element={<AdminServices />} />
            <Route path="/userhelp" element={<UserHelp />} />
            <Route path="/products" element={<Products />} />
          </Route>

          {/* ---------- ADMIN ONLY: AI Analytics ---------- */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/ai-analytics" element={<AIAnalytics />} />
          </Route>

          {/* ---------- AUDITOR ---------- */}
          <Route path="/auditor" element={<AuditorDashboard />} />

          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatbot />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
