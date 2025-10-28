import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import ProductPage from "@/pages/ProductPage";
import CheckoutPage from "@/pages/CheckoutPage";
import PaymentPage from "@/pages/PaymentPage";
import TaxaPage from "@/pages/TaxaPage";
import AcompanhamentoPage from "@/pages/AcompanhamentoPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ProductPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/pagamento" component={PaymentPage} />
      <Route path="/taxa" component={TaxaPage} />
      <Route path="/acompanhamento" component={AcompanhamentoPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function MobileOnlyGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MobileOnlyGuard>
          <Toaster />
          <Router />
        </MobileOnlyGuard>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
