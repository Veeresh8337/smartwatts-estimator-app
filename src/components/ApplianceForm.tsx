
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, Zap, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Appliance, commonAppliances, applianceCategories, searchAppliances } from '@/utils/appliance-data';
import { ApplianceUsage } from '@/utils/calculation-utils';

interface ApplianceFormProps {
  onAddAppliance: (newAppliance: ApplianceUsage) => void;
  existingAppliances: ApplianceUsage[];
}

const ApplianceForm: React.FC<ApplianceFormProps> = ({ onAddAppliance, existingAppliances }) => {
  const [selectedApplianceId, setSelectedApplianceId] = useState("");
  const [selectedAppliance, setSelectedAppliance] = useState<Appliance | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [customWattage, setCustomWattage] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [filteredAppliances, setFilteredAppliances] = useState<Appliance[]>(commonAppliances);

  useEffect(() => {
    if (searchQuery) {
      setFilteredAppliances(searchAppliances(searchQuery));
    } else {
      setFilteredAppliances(commonAppliances);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedApplianceId) {
      const appliance = commonAppliances.find(a => a.id === selectedApplianceId);
      setSelectedAppliance(appliance || null);
      if (appliance) {
        setCustomWattage(appliance.wattage);
      }
    } else {
      setSelectedAppliance(null);
      setCustomWattage(undefined);
    }
  }, [selectedApplianceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAppliance) return;
    
    const newApplianceUsage: ApplianceUsage = {
      applianceId: selectedAppliance.id,
      appliance: selectedAppliance,
      hoursPerDay,
      quantity,
      customWattage: customWattage !== selectedAppliance.wattage ? customWattage : undefined
    };
    
    onAddAppliance(newApplianceUsage);
    
    // Reset form
    setSelectedApplianceId("");
    setSelectedAppliance(null);
    setHoursPerDay(1);
    setQuantity(1);
    setCustomWattage(undefined);
  };

  return (
    <Card className="p-6 energy-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Zap className="h-6 w-6 text-energy-blue" />
          <h3 className="text-xl font-semibold">Add Appliance</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="appliance">Appliance</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedAppliance
                    ? selectedAppliance.name
                    : "Select an appliance..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search for an appliance..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No appliance found.</CommandEmpty>
                    {applianceCategories.map((category) => {
                      const categoryAppliances = filteredAppliances.filter(
                        (appliance) => appliance.category === category
                      );
                      if (categoryAppliances.length === 0) return null;
                      
                      return (
                        <CommandGroup key={category} heading={category}>
                          {categoryAppliances.map((appliance) => (
                            <CommandItem
                              key={appliance.id}
                              value={appliance.id}
                              onSelect={(currentValue) => {
                                setSelectedApplianceId(currentValue);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedApplianceId === appliance.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {appliance.name} ({appliance.wattage} W)
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      );
                    })}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="wattage">Power Rating (Watts)</Label>
              <Input
                id="wattage"
                type="number"
                value={customWattage || ""}
                onChange={(e) => setCustomWattage(parseFloat(e.target.value) || 0)}
                placeholder="Power in Watts"
                min={1}
                className="energy-input"
                disabled={!selectedAppliance}
              />
            </div>

            <div>
              <Label htmlFor="hours">Hours Per Day</Label>
              <Input
                id="hours"
                type="number"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)}
                min={0.1}
                max={24}
                step={0.1}
                className="energy-input"
              />
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min={1}
                className="energy-input"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-energy-green hover:bg-energy-green-dark text-white"
          disabled={!selectedAppliance}
        >
          <Plus className="mr-2 h-4 w-4" /> Add to List
        </Button>
      </form>
    </Card>
  );
};

export default ApplianceForm;
