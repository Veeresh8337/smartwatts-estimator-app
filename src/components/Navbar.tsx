
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-energy-blue" />
          <Link to="/" className="text-xl font-bold gradient-text">SmartWatts</Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-energy-blue transition-colors">
            Home
          </Link>
          <Link to="/estimator" className="text-sm font-medium hover:text-energy-blue transition-colors">
            Estimator
          </Link>
          <Link to="/summary" className="text-sm font-medium hover:text-energy-blue transition-colors">
            Summary
          </Link>
          <Link to="/suggestions" className="text-sm font-medium hover:text-energy-blue transition-colors">
            Suggestions
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="hidden md:flex">
            <Link to="/estimator">
              <Zap className="mr-2 h-4 w-4" /> Start Estimating
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
