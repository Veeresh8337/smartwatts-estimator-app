
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

// Demo summary data
const demoSummary: ConsumptionSummary = {
  totalDailyConsumption: 8.5,
  totalMonthlyConsumption: 255,
  totalEnergyCost: 1912.5,
  fixedCharge: 100,
  surcharge: 100.63,
  totalBill: 2113.13,
  applianceBreakdown: [
    { name: 'Air Conditioner', consumption: 120, cost: 900 },
    { name: 'Refrigerator', consumption: 45, cost: 337.5 },
    { name: 'Television', consumption: 25, cost: 187.5 },
    { name: 'Lights', consumption: 35, cost: 262.5 },
    { name: 'Other Appliances', consumption: 30, cost: 225 }
  ],
  carbonFootprint: 178.5
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
