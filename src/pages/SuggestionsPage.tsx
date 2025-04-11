
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Calculator, ChevronLeft, Download } from 'lucide-react';
import SuggestionsList from '@/components/SuggestionsList';
import { useElectricityStore } from '@/store/electricityStore';
import { generateSuggestions } from '@/utils/calculation-utils';

const SuggestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    summary, 
    applianceUsages, 
    electricityRate,
    suggestions,
    setSuggestions
  } = useElectricityStore();
  
  useEffect(() => {
    if (!summary || applianceUsages.length === 0) {
      toast.error('Please add appliances and calculate your bill first', {
        position: 'top-center'
      });
      navigate('/estimator');
      return;
    }
    
    if (suggestions.length === 0 && applianceUsages.length > 0) {
      const newSuggestions = generateSuggestions(applianceUsages, {
        energyRate: electricityRate,
        fixedCharge: 100,
        surchargeRate: 0.05
      });
      setSuggestions(newSuggestions);
    }
  }, [summary, navigate, applianceUsages, suggestions, setSuggestions, electricityRate]);
  
  if (!summary || suggestions.length === 0) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Smart Suggestions</h1>
        <p className="text-gray-500">
          Personalized recommendations to reduce your electricity bill
        </p>
      </div>
      
      <div className="mb-8">
        <SuggestionsList suggestions={suggestions} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-energy-blue/10 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Why These Suggestions Matter</h3>
          <p className="mb-4">
            These smart suggestions are personalized based on your specific appliance usage patterns. 
            Implementing them can help you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Save money on your monthly electricity bill</li>
            <li>Reduce your household's carbon footprint</li>
            <li>Extend the lifespan of your appliances</li>
            <li>Create more energy-efficient habits</li>
          </ul>
        </div>
        
        <div className="bg-energy-green/10 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Environmental Impact</h3>
          <p className="mb-2">
            By implementing all suggestions, you could reduce your carbon emissions by approximately:
          </p>
          <p className="text-3xl font-bold text-energy-green mb-4">
            {(summary.carbonFootprint * 0.15).toFixed(2)} kg CO₂ per month
          </p>
          <p className="text-sm text-gray-600">
            This is equivalent to planting about {Math.round((summary.carbonFootprint * 0.15) / 21)} trees per year.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/summary')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Summary
        </Button>
        
        <div className="flex gap-4">
          <Button 
            asChild
            variant="outline"
            className="border-energy-blue text-energy-blue hover:bg-energy-blue/10"
          >
            <Link to="#">
              <Download className="mr-2 h-4 w-4" /> Save Report
            </Link>
          </Button>
          
          <Button 
            asChild
            className="bg-energy-blue hover:bg-energy-blue-dark"
          >
            <Link to="/estimator">
              <Calculator className="mr-2 h-4 w-4" /> New Calculation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;
