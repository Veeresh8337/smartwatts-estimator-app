
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Lightbulb, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import BillSummary from '@/components/BillSummary';
import ConsumptionChart from '@/components/ConsumptionChart';
import { useElectricityStore } from '@/store/electricityStore';
import { ConsumptionSummary, generateConsumptionSummary } from '@/utils/calculation-utils';

// Demo data for when user has no real data
const DEMO_SUMMARY: ConsumptionSummary = {
  dailyUsage: 8.5,
  monthlyUsage: 255,
  applianceUsages: [
    {
      applianceId: 'demo-ac',
      name: 'Air Conditioner',
      category: 'Cooling',
      dailyUsage: 3.6,
      monthlyUsage: 108,
      monthlyCost: 810,
      percentage: 42.35
    },
    {
      applianceId: 'demo-fridge',
      name: 'Refrigerator',
      category: 'Kitchen',
      dailyUsage: 1.8,
      monthlyUsage: 54,
      monthlyCost: 405,
      percentage: 21.18
    },
    {
      applianceId: 'demo-tv',
      name: 'Television',
      category: 'Entertainment',
      dailyUsage: 1.2,
      monthlyUsage: 36,
      monthlyCost: 270,
      percentage: 14.12
    },
    {
      applianceId: 'demo-lights',
      name: 'Lights',
      category: 'Lighting',
      dailyUsage: 0.9,
      monthlyUsage: 27,
      monthlyCost: 202.5,
      percentage: 10.59
    },
    {
      applianceId: 'demo-washing',
      name: 'Washing Machine',
      category: 'Laundry',
      dailyUsage: 1.0,
      monthlyUsage: 30,
      monthlyCost: 225,
      percentage: 11.76
    }
  ],
  billBreakdown: {
    energyCharge: 1912.5,
    fixedCharge: 100,
    surcharge: 95.63,
    total: 2108.13
  },
  totalCost: 2108.13,
  carbonFootprint: 209.1
};

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { summary, electricityRate, applianceUsages, setSummary } = useElectricityStore();
  const [isDemoData, setIsDemoData] = React.useState(false);
  
  useEffect(() => {
    if (!summary || applianceUsages.length === 0) {
      // Use demo summary instead of redirecting
      setSummary(DEMO_SUMMARY);
      setIsDemoData(true);
      
      toast.info('Showing demo data. Add your own appliances for accurate estimates.', {
        position: 'top-center',
        duration: 5000
      });
    } else {
      setIsDemoData(false);
    }
  }, [summary, applianceUsages, setSummary]);
  
  if (!summary) {
    return null; // Will be replaced by demo data via useEffect
  }
  
  return (
    <div className="container mx-auto py-6 md:py-8 px-4">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Bill Summary</h1>
        <p className="text-gray-500">
          Detailed breakdown of your estimated electricity consumption and costs
        </p>
        
        {isDemoData && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
            <Info className="h-5 w-5 text-energy-blue shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              This is sample data for demonstration. To see your actual bill estimate, 
              go to the Estimator page and add your appliances.
            </p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="w-full">
          <BillSummary summary={summary} electricityRate={electricityRate} />
        </div>
        <div className="w-full">
          <ConsumptionChart summary={summary} />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/estimator')}
          className="w-full sm:w-auto"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Estimator
        </Button>
        
        <Button 
          asChild
          className="w-full sm:w-auto bg-energy-yellow hover:bg-energy-yellow/90 text-black"
        >
          <Link to="/suggestions">
            <Lightbulb className="mr-2 h-4 w-4" /> 
            See Money-Saving Tips <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SummaryPage;
