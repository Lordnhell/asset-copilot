import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import FundSetup from "./pages/FundSetup";
import DataIntegration from "./pages/DataIntegration";
import Dashboard from "./pages/Dashboard";
import Processing from "./pages/Processing";
import Confirmation from "./pages/Confirmation";
import Calculating from "./pages/Calculating";
import ComparativeAnalysis from "./pages/ComparativeAnalysis";
import PortfolioHealth from "./pages/PortfolioHealth";
import DataSources from "./pages/DataSources";
import FundSettings from "./pages/FundSettings";
import ManualInput from "./pages/ManualInput";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/fund-setup" element={<FundSetup />} />
          <Route path="/data-integration" element={<DataIntegration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio-health" element={<PortfolioHealth />} />
          <Route path="/data-sources" element={<DataSources />} />
          <Route path="/fund-settings" element={<FundSettings />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/calculating" element={<Calculating />} />
          <Route path="/comparative-analysis" element={<ComparativeAnalysis />} />
          <Route path="/manual-input" element={<ManualInput />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
