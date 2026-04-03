import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import PlatformPage from "./pages/PlatformPage";
import AgentNetworkPage from "./pages/AgentNetworkPage";
import WorkflowPage from "./pages/WorkflowPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import CollaborationPage from "./pages/CollaborationPage";
import ReportsPage from "./pages/ReportsPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import RequestDemoPage from "./pages/RequestDemoPage";
import CommandCenterPage from "./pages/CommandCenterPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/agent-network" element={<AgentNetworkPage />} />
            <Route path="/workflow" element={<WorkflowPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/agents" element={<DepartmentsPage />} />
            <Route path="/collaboration" element={<CollaborationPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/request-demo" element={<RequestDemoPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
