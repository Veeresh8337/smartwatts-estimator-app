
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ConsumptionSummary } from '@/utils/calculation-utils';
import { ChartPie, BarChart2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ConsumptionChartProps {
  summary: ConsumptionSummary;
}

const COLORS = ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6', '#1abc9c', '#d35400', '#34495e'];

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ summary }) => {
  const pieData = summary.applianceUsages
    .filter(item => item.monthlyUsage > 0)
    .map(item => ({
      name: item.name,
      value: parseFloat(item.monthlyUsage.toFixed(2))
    }));

  // Create category-based data for bar chart
  const categoryData: Record<string, number> = {};
  summary.applianceUsages.forEach(item => {
    if (!categoryData[item.category]) {
      categoryData[item.category] = 0;
    }
    categoryData[item.category] += item.monthlyUsage;
  });

  const barData = Object.entries(categoryData)
    .map(([category, usage]) => ({
      category,
      usage: parseFloat(usage.toFixed(2))
    }))
    .sort((a, b) => b.usage - a.usage);

  return (
    <Card className="energy-card">
      <CardHeader className="pb-0">
        <div className="flex items-center space-x-2">
          <ChartPie className="h-5 w-5 text-energy-blue" />
          <CardTitle className="text-xl font-semibold">Consumption Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie">
          <div className="flex justify-center mb-4">
            <TabsList>
              <TabsTrigger value="pie" className="flex items-center gap-1">
                <ChartPie className="h-4 w-4" /> By Appliance
              </TabsTrigger>
              <TabsTrigger value="bar" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" /> By Category
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pie">
            <div className="h-[350px] w-full">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} kWh`, 'Consumption']} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No consumption data to display</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="bar">
            <div className="h-[350px] w-full">
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip formatter={(value) => [`${value} kWh`, 'Consumption']} />
                    <Bar dataKey="usage" fill="#3498db" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No consumption data to display</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;
