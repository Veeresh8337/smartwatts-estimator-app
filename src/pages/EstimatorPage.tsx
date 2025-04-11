
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Zap, Calculator, ChevronRight } from 'lucide-react';
import ApplianceForm from '@/components/ApplianceForm';
import ApplianceList from '@/components/ApplianceList';
import { ApplianceUsage, generateConsumptionSummary } from '@/utils/calculation-utils';
import { useElectricityStore } from '@/store/electricityStore';

const EstimatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    applianceUsages, 
    setApplianceUsages, 
    electricityRate, 
    setElectricityRate,
    setSummary
  } = useElectricityStore();
  
  const handleAddAppliance = (newAppliance: ApplianceUsage) => {
    // Check if this exact appliance is already in the list
    const isExistingAppliance = applianceUsages.some(
      a => a.applianceId === newAppliance.applianceId &&
           a.hoursPerDay === newAppliance.hoursPerDay &&
           a.quantity === newAppliance.quantity &&
           a.customWattage === newAppliance.customWattage
    );
    
    if (isExistingAppliance) {
      toast.warning('This appliance with the same parameters is already in your list', {
        position: 'top-center'
      });
      return;
    }
    
    setApplianceUsages([...applianceUsages, newAppliance]);
    toast.success(`Added ${newAppliance.appliance.name} to your list`, {
      position: 'top-center'
    });
  };
  
  const handleRemoveAppliance = (index: number) => {
    const updatedAppliances = [...applianceUsages];
    const removedAppliance = updatedAppliances[index];
    updatedAppliances.splice(index, 1);
    setApplianceUsages(updatedAppliances);
    
    toast.info(`Removed ${removedAppliance.appliance.name} from your list`, {
      position: 'top-center'
    });
  };
  
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setElectricityRate(isNaN(value) ? 7.5 : value);
  };
  
  const handleCalculateClick = () => {
    if (applianceUsages.length === 0) {
      toast.error('Please add at least one appliance to calculate', {
        position: 'top-center'
      });
      return;
    }
    
    const summary = generateConsumptionSummary(applianceUsages, {
      energyRate: electricityRate,
      fixedCharge: 100,
      surchargeRate: 0.05
    });
    
    setSummary(summary);
    navigate('/summary');
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Electricity Estimator</h1>
        <p className="text-gray-500">
          Add your appliances, set usage patterns, and calculate your estimated electricity bill
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ApplianceForm 
            onAddAppliance={handleAddAppliance}
            existingAppliances={applianceUsages}
          />
        </div>
        
        <div className="lg:col-span-1">
          <Card className="p-6 energy-card">
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="h-6 w-6 text-energy-blue" />
              <h3 className="text-xl font-semibold">Rate Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="rate">Electricity Rate (₹/kWh)</Label>
                <Input
                  id="rate"
                  type="number"
                  value={electricityRate}
                  onChange={handleRateChange}
                  min={1}
                  step={0.1}
                  className="energy-input"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Standard rate is around ₹7.50 per kWh for residential connections
                </p>
              </div>
              
              <Button
                className="w-full bg-energy-blue hover:bg-energy-blue-dark"
                onClick={handleCalculateClick}
                disabled={applianceUsages.length === 0}
              >
                <Zap className="mr-2 h-4 w-4" /> Calculate Bill
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <ApplianceList 
          appliances={applianceUsages} 
          onRemoveAppliance={handleRemoveAppliance}
          electricityRate={electricityRate}
        />
      </div>
      
      {applianceUsages.length > 0 && (
        <div className="flex justify-end">
          <Button 
            className="bg-energy-green hover:bg-energy-green-dark text-white"
            onClick={handleCalculateClick}
            size="lg"
          >
            Continue to Summary <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EstimatorPage;
