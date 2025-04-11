
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Zap, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-energy-blue" />
          <Link to="/" className="text-xl font-bold gradient-text">SmartWatts</Link>
        </div>
        
        {isMobile ? (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-6">
                <Link 
                  to="/" 
                  className={`text-lg font-medium transition-colors ${location.pathname === '/' ? 'text-energy-blue' : 'hover:text-energy-blue'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/estimator" 
                  className={`text-lg font-medium transition-colors ${location.pathname === '/estimator' ? 'text-energy-blue' : 'hover:text-energy-blue'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Estimator
                </Link>
                <Link 
                  to="/summary" 
                  className={`text-lg font-medium transition-colors ${location.pathname === '/summary' ? 'text-energy-blue' : 'hover:text-energy-blue'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Summary
                </Link>
                <Link 
                  to="/suggestions" 
                  className={`text-lg font-medium transition-colors ${location.pathname === '/suggestions' ? 'text-energy-blue' : 'hover:text-energy-blue'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Suggestions
                </Link>
                <Button className="mt-4 w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/estimator" className="w-full flex items-center justify-center">
                    <Zap className="mr-2 h-4 w-4" /> Start Estimating
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-energy-blue' : 'hover:text-energy-blue'}`}>
                Home
              </Link>
              <Link to="/estimator" className={`text-sm font-medium transition-colors ${location.pathname === '/estimator' ? 'text-energy-blue' : 'hover:text-energy-blue'}`}>
                Estimator
              </Link>
              <Link to="/summary" className={`text-sm font-medium transition-colors ${location.pathname === '/summary' ? 'text-energy-blue' : 'hover:text-energy-blue'}`}>
                Summary
              </Link>
              <Link to="/suggestions" className={`text-sm font-medium transition-colors ${location.pathname === '/suggestions' ? 'text-energy-blue' : 'hover:text-energy-blue'}`}>
                Suggestions
              </Link>
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              <Button asChild variant="outline">
                <Link to="/estimator">
                  <Zap className="mr-2 h-4 w-4" /> Start Estimating
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
