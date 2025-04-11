
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
  
  setUsesDemoData: (value) => set({ usesDemoData: value }),
  
  reset: () => set({
    applianceUsages: [],
    electricityRate: 7.5,
    summary: null,
    suggestions: [],
    usesDemoData: false
  })
}));
