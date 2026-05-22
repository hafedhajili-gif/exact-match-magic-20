import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import AmbientExperience from "./components/AmbientExperience";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import MenuPage from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Votes from "./pages/Votes";
import Reservations from "./pages/Reservations";
import CorporateBookings from "./pages/CorporateBookings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AmbientExperience />
        <div className="relative z-10">
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concept" element={<Concept />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/votes" element={<Votes />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/corporate" element={<CorporateBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
