
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import BillSummary from '@/components/BillSummary';
import ConsumptionChart from '@/components/ConsumptionChart';
import { useElectricityStore } from '@/store/electricityStore';

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { summary, electricityRate, applianceUsages } = useElectricityStore();
  
  useEffect(() => {
    if (!summary || applianceUsages.length === 0) {
      toast.error('Please add appliances and calculate your bill first', {
        position: 'top-center'
      });
      navigate('/estimator');
    }
  }, [summary, navigate, applianceUsages]);
  
  if (!summary) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bill Summary</h1>
        <p className="text-gray-500">
          Detailed breakdown of your estimated electricity consumption and costs
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <BillSummary summary={summary} electricityRate={electricityRate} />
        </div>
        <div>
          <ConsumptionChart summary={summary} />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/estimator')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Estimator
        </Button>
        
        <Button 
          asChild
          className="bg-energy-yellow hover:bg-energy-yellow/90 text-black"
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
