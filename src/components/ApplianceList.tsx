
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Zap } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { ApplianceUsage, calculateDailyUsage, calculateMonthlyUsage, wattHoursToKilowattHours } from '@/utils/calculation-utils';

interface ApplianceListProps {
  appliances: ApplianceUsage[];
  onRemoveAppliance: (index: number) => void;
  electricityRate: number;
}

const ApplianceList: React.FC<ApplianceListProps> = ({ 
  appliances, 
  onRemoveAppliance,
  electricityRate
}) => {
  if (appliances.length === 0) {
    return (
      <Card className="p-6 energy-card">
        <div className="text-center py-10 text-gray-500">
          <Zap className="mx-auto h-12 w-12 text-energy-gray mb-4" />
          <h3 className="text-xl font-medium mb-2">No Appliances Added</h3>
          <p>Add appliances to start calculating your electricity usage</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 energy-card">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="h-6 w-6 text-energy-blue" />
        <h3 className="text-xl font-semibold">Your Appliances</h3>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appliance</TableHead>
              <TableHead className="text-right">Watts</TableHead>
              <TableHead className="text-right">Hours/Day</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Daily kWh</TableHead>
              <TableHead className="text-right">Monthly kWh</TableHead>
              <TableHead className="text-right">Monthly Cost</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appliances.map((item, index) => {
              const wattage = item.customWattage || item.appliance.wattage;
              const dailyUsage = calculateDailyUsage(wattage, item.hoursPerDay, item.quantity);
              const monthlyUsage = calculateMonthlyUsage(dailyUsage);
              const monthlyCost = monthlyUsage * electricityRate;

              return (
                <TableRow key={`${item.applianceId}-${index}`}>
                  <TableCell className="font-medium">{item.appliance.name}</TableCell>
                  <TableCell className="text-right">{wattage}</TableCell>
                  <TableCell className="text-right">{item.hoursPerDay}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{dailyUsage.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{monthlyUsage.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{monthlyCost.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-energy-red hover:text-energy-red hover:bg-red-50"
                      onClick={() => onRemoveAppliance(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ApplianceList;
