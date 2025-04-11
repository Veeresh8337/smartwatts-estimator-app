
import { create } from 'zustand';
import { ApplianceUsage, ConsumptionSummary } from '@/utils/calculation-utils';

interface ElectricityState {
  applianceUsages: ApplianceUsage[];
  electricityRate: number;
  summary: ConsumptionSummary | null;
  suggestions: Array<{
    applianceId: string;
    name: string;
    suggestion: string;
    potentialSavings: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
  setApplianceUsages: (appliances: ApplianceUsage[]) => void;
  setElectricityRate: (rate: number) => void;
  setSummary: (summary: ConsumptionSummary) => void;
  setSuggestions: (suggestions: Array<{
    applianceId: string;
    name: string;
    suggestion: string;
    potentialSavings: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>) => void;
  reset: () => void;
  usesDemoData: boolean;
  setUsesDemoData: (value: boolean) => void;
}

// Demo data for suggestions when no user data is present
const demoSuggestions = [
  {
    applianceId: 'ac1',
    name: 'Air Conditioner',
    suggestion: 'Set AC temperature to 24°C instead of 20°C',
    potentialSavings: 350,
    difficulty: 'easy' as const
  },
  {
    applianceId: 'refrigerator1',
    name: 'Refrigerator',
    suggestion: 'Ensure door seals are tight and clean coils regularly',
    potentialSavings: 120,
    difficulty: 'medium' as const
  },
  {
    applianceId: 'light1',
    name: 'Lighting',
    suggestion: 'Replace remaining incandescent bulbs with LED',
    potentialSavings: 200,
    difficulty: 'easy' as const
  },
  {
    applianceId: 'tv1',
    name: 'Television',
    suggestion: 'Use the power saving mode and reduce brightness',
    potentialSavings: 80,
    difficulty: 'easy' as const
  }
];

// Demo summary data - updated to match ConsumptionSummary interface
const demoSummary: ConsumptionSummary = {
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

export const useElectricityStore = create<ElectricityState>((set) => ({
  applianceUsages: [],
  electricityRate: 7.5, // Default rate
  summary: null,
  suggestions: [],
  usesDemoData: false,
  
  setApplianceUsages: (appliances) => set({ applianceUsages: appliances, usesDemoData: false }),
  
  setElectricityRate: (rate) => set({ electricityRate: rate }),
  
  setSummary: (summary) => set({ summary }),
  
  setSuggestions: (suggestions) => set({ suggestions }),
  
  setUsesDemoData: (value) => set({ 
    usesDemoData: value,
    summary: value ? demoSummary : null,
    suggestions: value ? demoSuggestions : []
  }),
  
  reset: () => set({
    applianceUsages: [],
    electricityRate: 7.5,
    summary: null,
    suggestions: [],
    usesDemoData: false
  })
}));
