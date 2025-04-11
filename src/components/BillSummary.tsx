
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ZapOff, Zap, DollarSign, Leaf } from 'lucide-react';
import { ConsumptionSummary } from '@/utils/calculation-utils';

interface BillSummaryProps {
  summary: ConsumptionSummary;
  electricityRate: number;
}

const BillSummary: React.FC<BillSummaryProps> = ({ summary, electricityRate }) => {
  return (
    <Card className="p-6 energy-card">
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="h-6 w-6 text-energy-blue" />
          <CardTitle className="text-xl font-semibold">Bill Summary</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 space-y-6">
        {/* Usage Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-energy-blue/10">
            <div className="flex flex-col items-center">
              <Zap className="h-8 w-8 text-energy-blue mb-2" />
              <p className="text-sm text-gray-500">Daily Usage</p>
              <p className="text-2xl font-bold">{summary.dailyUsage.toFixed(2)} kWh</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-energy-green/10">
            <div className="flex flex-col items-center">
              <ZapOff className="h-8 w-8 text-energy-green mb-2" />
              <p className="text-sm text-gray-500">Monthly Usage</p>
              <p className="text-2xl font-bold">{summary.monthlyUsage.toFixed(2)} kWh</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-energy-yellow/10">
            <div className="flex flex-col items-center">
              <DollarSign className="h-8 w-8 text-energy-yellow mb-2" />
              <p className="text-sm text-gray-500">Monthly Cost</p>
              <p className="text-2xl font-bold">₹{summary.totalCost.toFixed(2)}</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-energy-green/10">
            <div className="flex flex-col items-center">
              <Leaf className="h-8 w-8 text-energy-green mb-2" />
              <p className="text-sm text-gray-500">Carbon Footprint</p>
              <p className="text-2xl font-bold">{summary.carbonFootprint.toFixed(2)} kg</p>
            </div>
          </Card>
        </div>
        
        {/* Bill Breakdown */}
        <div>
          <h3 className="text-lg font-medium mb-4">Bill Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Energy Charge (₹{electricityRate}/kWh)</span>
              <span className="font-medium">₹{summary.billBreakdown.energyCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Fixed Charge</span>
              <span className="font-medium">₹{summary.billBreakdown.fixedCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Surcharge (5%)</span>
              <span className="font-medium">₹{summary.billBreakdown.surcharge.toFixed(2)}</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total Bill</span>
              <span>₹{summary.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Top Consumers */}
        <div>
          <h3 className="text-lg font-medium mb-4">Top Energy Consumers</h3>
          <div className="space-y-3">
            {summary.applianceUsages
              .sort((a, b) => b.monthlyUsage - a.monthlyUsage)
              .slice(0, 5)
              .map((applianceUsage, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-energy-${index === 0 ? 'red' : index === 1 ? 'yellow' : 'blue'} mr-2`}></div>
                    <span>{applianceUsage.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{applianceUsage.monthlyUsage.toFixed(2)} kWh</div>
                    <div className="text-xs text-gray-500">₹{applianceUsage.monthlyCost.toFixed(2)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillSummary;
