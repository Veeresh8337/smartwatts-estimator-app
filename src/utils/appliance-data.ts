
export interface Appliance {
  id: string;
  name: string;
  category: string;
  wattage: number;
  icon?: string;
  description?: string;
}

export const applianceCategories = [
  "Kitchen",
  "Entertainment",
  "Cooling & Heating",
  "Lighting",
  "Bathroom",
  "Bedroom",
  "Office",
  "Laundry",
];

export const commonAppliances: Appliance[] = [
  // Kitchen appliances
  { id: "refrigerator", name: "Refrigerator", category: "Kitchen", wattage: 150, description: "Standard double-door refrigerator" },
  { id: "microwave", name: "Microwave Oven", category: "Kitchen", wattage: 1100, description: "Standard microwave oven" },
  { id: "toaster", name: "Toaster", category: "Kitchen", wattage: 800, description: "2-slice toaster" },
  { id: "mixer", name: "Mixer/Grinder", category: "Kitchen", wattage: 750, description: "Standard mixer grinder" },
  { id: "electric_kettle", name: "Electric Kettle", category: "Kitchen", wattage: 1500, description: "1.5L electric kettle" },
  { id: "induction_stove", name: "Induction Stove", category: "Kitchen", wattage: 2000, description: "Single burner induction stove" },
  
  // Entertainment appliances
  { id: "led_tv_32", name: "LED TV (32\")", category: "Entertainment", wattage: 50, description: "32-inch LED television" },
  { id: "led_tv_42", name: "LED TV (42\")", category: "Entertainment", wattage: 80, description: "42-inch LED television" },
  { id: "led_tv_55", name: "LED TV (55\")", category: "Entertainment", wattage: 120, description: "55-inch LED television" },
  { id: "home_theater", name: "Home Theater System", category: "Entertainment", wattage: 95, description: "5.1 channel home theater system" },
  { id: "gaming_console", name: "Gaming Console", category: "Entertainment", wattage: 150, description: "Modern gaming console" },
  
  // Cooling & Heating appliances
  { id: "ceiling_fan", name: "Ceiling Fan", category: "Cooling & Heating", wattage: 75, description: "Standard ceiling fan" },
  { id: "table_fan", name: "Table Fan", category: "Cooling & Heating", wattage: 50, description: "Standard table fan" },
  { id: "ac_1ton", name: "AC (1 Ton)", category: "Cooling & Heating", wattage: 1000, description: "1 ton air conditioner" },
  { id: "ac_1.5ton", name: "AC (1.5 Ton)", category: "Cooling & Heating", wattage: 1500, description: "1.5 ton air conditioner" },
  { id: "ac_2ton", name: "AC (2 Ton)", category: "Cooling & Heating", wattage: 2000, description: "2 ton air conditioner" },
  { id: "water_heater", name: "Water Heater (Geyser)", category: "Cooling & Heating", wattage: 2000, description: "Standard water heater" },
  { id: "room_heater", name: "Room Heater", category: "Cooling & Heating", wattage: 1500, description: "Portable room heater" },
  
  // Lighting appliances
  { id: "led_bulb", name: "LED Bulb", category: "Lighting", wattage: 9, description: "Standard LED bulb" },
  { id: "cfl_bulb", name: "CFL Bulb", category: "Lighting", wattage: 14, description: "Compact fluorescent light bulb" },
  { id: "tube_light", name: "Tube Light", category: "Lighting", wattage: 36, description: "Standard tube light" },
  { id: "led_tube", name: "LED Tube Light", category: "Lighting", wattage: 20, description: "LED tube light" },
  
  // Bathroom appliances
  { id: "hair_dryer", name: "Hair Dryer", category: "Bathroom", wattage: 1200, description: "Standard hair dryer" },
  { id: "electric_shaver", name: "Electric Shaver", category: "Bathroom", wattage: 15, description: "Electric razor/shaver" },
  
  // Bedroom appliances
  { id: "air_purifier", name: "Air Purifier", category: "Bedroom", wattage: 50, description: "Standard air purifier" },
  { id: "electric_blanket", name: "Electric Blanket", category: "Bedroom", wattage: 200, description: "Standard electric blanket" },
  
  // Office appliances
  { id: "laptop", name: "Laptop", category: "Office", wattage: 65, description: "Standard laptop computer" },
  { id: "desktop", name: "Desktop Computer", category: "Office", wattage: 200, description: "Desktop computer with monitor" },
  { id: "router", name: "WiFi Router", category: "Office", wattage: 10, description: "Wireless internet router" },
  { id: "printer", name: "Printer", category: "Office", wattage: 30, description: "Inkjet printer" },
  
  // Laundry appliances
  { id: "washing_machine", name: "Washing Machine", category: "Laundry", wattage: 500, description: "Top-loading washing machine" },
  { id: "iron", name: "Electric Iron", category: "Laundry", wattage: 1100, description: "Standard clothes iron" },
];

// Helper function to get an appliance by ID
export const getApplianceById = (id: string): Appliance | undefined => {
  return commonAppliances.find(appliance => appliance.id === id);
};

// Helper function to get appliances by category
export const getAppliancesByCategory = (category: string): Appliance[] => {
  return commonAppliances.filter(appliance => appliance.category === category);
};

// Helper function to search appliances by name
export const searchAppliances = (query: string): Appliance[] => {
  const lowerQuery = query.toLowerCase();
  return commonAppliances.filter(appliance => 
    appliance.name.toLowerCase().includes(lowerQuery) || 
    appliance.category.toLowerCase().includes(lowerQuery)
  );
};
