
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/Layout/AppLayout";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import AnalysisDetailPage from "./pages/AnalysisDetailPage";
import MyAnalysesPage from "./pages/MyAnalysesPage";
import JobRolesPage from "./pages/JobRolesPage";
import CandidatesPage from "./pages/CandidatesPage";
import ResumeDatabase from "./pages/ResumeDatabase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Protected routes with AppLayout */}
            <Route element={<AppLayout />}>
              <Route path="/resume-upload" element={<ResumeUploadPage />} />
              <Route path="/analysis/:id" element={<AnalysisDetailPage />} />
              <Route path="/my-analyses" element={<MyAnalysesPage />} />
              <Route path="/job-roles" element={<JobRolesPage />} />
              <Route path="/candidates" element={<CandidatesPage />} />
              <Route path="/resume-database" element={<ResumeDatabase />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
