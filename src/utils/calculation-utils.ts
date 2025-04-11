
import { Appliance } from './appliance-data';

export interface ApplianceUsage {
  applianceId: string;
  appliance: Appliance;
  hoursPerDay: number;
  quantity: number;
  customWattage?: number;
}

export interface BillBreakdown {
  energyCharge: number;
  fixedCharge: number;
  surcharge: number;
  total: number;
}

export interface ConsumptionSummary {
  dailyUsage: number; // in kWh
  monthlyUsage: number; // in kWh
  applianceUsages: Array<{
    applianceId: string;
    name: string;
    category: string;
    dailyUsage: number; // in kWh
    monthlyUsage: number; // in kWh
    monthlyCost: number;
    percentage: number;
  }>;
  billBreakdown: BillBreakdown;
  totalCost: number;
  carbonFootprint: number; // in kg CO2
}

// Default rates (can be customized by user)
const DEFAULT_RATES = {
  energyRate: 7.5, // Rs per kWh
  fixedCharge: 100, // Rs per month
  surchargeRate: 0.05, // 5% of energy charge
};

// Convert watt-hours to kilowatt-hours
export const wattHoursToKilowattHours = (wattHours: number): number => {
  return wattHours / 1000;
};

// Calculate daily usage in kilowatt-hours
export const calculateDailyUsage = (
  wattage: number,
  hoursPerDay: number,
  quantity: number
): number => {
  const dailyWattHours = wattage * hoursPerDay * quantity;
  return wattHoursToKilowattHours(dailyWattHours);
};

// Calculate monthly usage in kilowatt-hours (assuming 30 days per month)
export const calculateMonthlyUsage = (dailyUsage: number): number => {
  return dailyUsage * 30;
};

// Calculate energy cost
export const calculateEnergyCost = (
  kwhUsage: number,
  ratePerKwh: number
): number => {
  return kwhUsage * ratePerKwh;
};

// Calculate carbon footprint in kg CO2
// Average emission factor: 0.82 kg CO2 per kWh in India
export const calculateCarbonFootprint = (kwhUsage: number): number => {
  const emissionFactor = 0.82; // kg CO2 per kWh
  return kwhUsage * emissionFactor;
};

// Calculate bill breakdown
export const calculateBillBreakdown = (
  monthlyUsage: number,
  rates = DEFAULT_RATES
): BillBreakdown => {
  const energyCharge = calculateEnergyCost(monthlyUsage, rates.energyRate);
  const surcharge = energyCharge * rates.surchargeRate;
  const fixedCharge = rates.fixedCharge;
  const total = energyCharge + surcharge + fixedCharge;

  return {
    energyCharge,
    fixedCharge,
    surcharge,
    total,
  };
};

// Generate consumption summary
export const generateConsumptionSummary = (
  applianceUsages: ApplianceUsage[],
  rates = DEFAULT_RATES
): ConsumptionSummary => {
  let totalDailyUsage = 0;

  // Calculate usage for each appliance
  const usageSummaries = applianceUsages.map((usage) => {
    const wattage = usage.customWattage || usage.appliance.wattage;
    const dailyUsage = calculateDailyUsage(
      wattage,
      usage.hoursPerDay,
      usage.quantity
    );
    const monthlyUsage = calculateMonthlyUsage(dailyUsage);

    totalDailyUsage += dailyUsage;

    return {
      applianceId: usage.applianceId,
      name: usage.appliance.name,
      category: usage.appliance.category,
      dailyUsage,
      monthlyUsage,
      monthlyCost: calculateEnergyCost(monthlyUsage, rates.energyRate),
      percentage: 0, // Will calculate after we know the total
    };
  });

  const monthlyUsage = calculateMonthlyUsage(totalDailyUsage);
  const billBreakdown = calculateBillBreakdown(monthlyUsage, rates);
  const carbonFootprint = calculateCarbonFootprint(monthlyUsage);

  // Calculate percentage of total for each appliance
  usageSummaries.forEach((summary) => {
    summary.percentage = totalDailyUsage > 0 
      ? (summary.dailyUsage / totalDailyUsage) * 100 
      : 0;
  });

  return {
    dailyUsage: totalDailyUsage,
    monthlyUsage,
    applianceUsages: usageSummaries,
    billBreakdown,
    totalCost: billBreakdown.total,
    carbonFootprint,
  };
};

// Generate energy-saving suggestions based on consumption data
export const generateSuggestions = (
  applianceUsages: ApplianceUsage[],
  rates = DEFAULT_RATES
): Array<{
  applianceId: string;
  name: string;
  suggestion: string;
  potentialSavings: number;
  difficulty: 'easy' | 'medium' | 'hard';
}> => {
  const suggestions = [];

  for (const usage of applianceUsages) {
    const wattage = usage.customWattage || usage.appliance.wattage;
    const applianceName = usage.appliance.name;
    const currentMonthlyUsage = calculateMonthlyUsage(
      calculateDailyUsage(wattage, usage.hoursPerDay, usage.quantity)
    );
    
    // Suggestion 1: Reduce usage time by 1 hour for high-usage appliances
    if (usage.hoursPerDay >= 2) {
      const reducedHours = usage.hoursPerDay - 1;
      const reducedMonthlyUsage = calculateMonthlyUsage(
        calculateDailyUsage(wattage, reducedHours, usage.quantity)
      );
      const savings = calculateEnergyCost(
        currentMonthlyUsage - reducedMonthlyUsage,
        rates.energyRate
      );

      if (savings > 10) { // Only suggest if savings are significant
        suggestions.push({
          applianceId: usage.applianceId,
          name: applianceName,
          suggestion: `Reduce ${applianceName} usage by 1 hour per day`,
          potentialSavings: savings,
          difficulty: 'easy',
        });
      }
    }

    // Suggestion 2: For lighting, suggest switching to LED
    if (usage.appliance.category === 'Lighting' && usage.appliance.name.includes('CFL')) {
      // Assume LED equivalent would use 40% less power
      const ledWattage = wattage * 0.6;
      const ledMonthlyUsage = calculateMonthlyUsage(
        calculateDailyUsage(ledWattage, usage.hoursPerDay, usage.quantity)
      );
      const savings = calculateEnergyCost(
        currentMonthlyUsage - ledMonthlyUsage,
        rates.energyRate
      );

      suggestions.push({
        applianceId: usage.applianceId,
        name: applianceName,
        suggestion: `Replace ${applianceName} with LED alternative`,
        potentialSavings: savings,
        difficulty: 'medium',
      });
    }

    // Suggestion 3: For ACs, suggest increasing temperature
    if (usage.appliance.name.includes('AC') && usage.hoursPerDay > 0) {
      // Each degree increase in AC temperature saves about 6% energy
      const savingsPercentage = 0.06;
      const savingsAmount = currentMonthlyUsage * savingsPercentage;
      const costSavings = calculateEnergyCost(savingsAmount, rates.energyRate);

      suggestions.push({
        applianceId: usage.applianceId,
        name: applianceName,
        suggestion: `Increase ${applianceName} temperature by 1°C`,
        potentialSavings: costSavings,
        difficulty: 'easy',
      });
    }

    // Suggestion 4: For refrigerators, suggest proper maintenance
    if (usage.appliance.name.includes('Refrigerator')) {
      // Proper maintenance can save up to 5% energy
      const savingsPercentage = 0.05;
      const savingsAmount = currentMonthlyUsage * savingsPercentage;
      const costSavings = calculateEnergyCost(savingsAmount, rates.energyRate);

      suggestions.push({
        applianceId: usage.applianceId,
        name: applianceName,
        suggestion: `Clean ${applianceName} coils and ensure proper sealing`,
        potentialSavings: costSavings,
        difficulty: 'medium',
      });
    }
  }

  // Sort suggestions by potential savings (highest first)
  return suggestions.sort((a, b) => b.potentialSavings - a.potentialSavings);
};
