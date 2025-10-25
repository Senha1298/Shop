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
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        'android',
        'webos',
        'iphone',
        'ipad',
        'ipod',
        'blackberry',
        'windows phone',
        'mobile'
      ];
      
      return mobileKeywords.some(keyword => userAgent.includes(keyword));
    };

    const checkDevice = async () => {
      // Desativa redirecionamento no preview da Replit
      const isReplitPreview = window.location.hostname.includes('replit.dev') || 
                             window.location.hostname.includes('repl.co') ||
                             window.location.hostname.includes('replit.app') ||
                             window.location.hostname.includes('localhost') ||
                             window.location.hostname === '127.0.0.1';
      
      if (isReplitPreview) {
        console.log('🔧 Preview da Replit detectado - redirecionamento desktop desativado');
        setIsChecking(false);
        return;
      }
      
      if (!isMobile()) {
        try {
          const response = await fetch('/api/desktop-redirect-url');
          if (response.ok) {
            const data = await response.json();
            if (data.url) {
              console.log('🔄 Desktop detectado - redirecionando para:', data.url);
              window.location.href = data.url;
              return;
            }
          }
        } catch (error) {
          console.error('Erro ao buscar URL de redirecionamento:', error);
        }
      }
      setIsChecking(false);
    };

    checkDevice();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F52B56] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

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
