import { Switch, Route } from "wouter";
import { queryClient } from "./components/contexts/hooks/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import NotFound from "./components/contexts/hooks/lib/pages/not-found";
import CruisePackingPage from "./components/contexts/hooks/lib/pages/cruise-packing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CruisePackingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
