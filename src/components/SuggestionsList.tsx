
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Lightbulb, 
  TrendingDown, 
  BadgeIndianRupee, 
  ThumbsUp, 
  Clock, 
  Zap
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Suggestion {
  applianceId: string;
  name: string;
  suggestion: string;
  potentialSavings: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const DifficultyBadge: React.FC<{ difficulty: 'easy' | 'medium' | 'hard' }> = ({ difficulty }) => {
  const colors = {
    easy: 'bg-energy-green/20 text-energy-green',
    medium: 'bg-energy-yellow/20 text-energy-yellow',
    hard: 'bg-energy-red/20 text-energy-red',
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
};

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  if (suggestions.length === 0) {
    return (
      <Card className="p-6 energy-card">
        <div className="text-center py-10 text-gray-500">
          <Lightbulb className="mx-auto h-12 w-12 text-energy-gray mb-4" />
          <h3 className="text-xl font-medium mb-2">No Suggestions Available</h3>
          <p>Add more appliances to get energy-saving suggestions</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="energy-card">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-energy-yellow" />
          <CardTitle className="text-xl font-semibold">Smart Suggestions</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Card className="bg-energy-green/10 p-4 border-energy-green/20">
            <div className="flex items-start">
              <TrendingDown className="h-8 w-8 text-energy-green mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-lg mb-1">Potential Monthly Savings</h3>
                <p className="text-3xl font-bold">
                  ₹{suggestions.reduce((sum, suggestion) => sum + suggestion.potentialSavings, 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  by implementing all suggestions below
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <AccordionItem 
              key={`${suggestion.applianceId}-${index}`} 
              value={`${suggestion.applianceId}-${index}`}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 [&>svg]:text-energy-blue">
                <div className="flex items-start justify-between w-full text-left">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-energy-blue mt-1" />
                    <div>
                      <h4 className="font-medium">{suggestion.suggestion}</h4>
                      <p className="text-sm text-gray-500">{suggestion.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-energy-green">₹{suggestion.potentialSavings.toFixed(2)}</span>
                    <DifficultyBadge difficulty={suggestion.difficulty} />
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <BadgeIndianRupee className="h-5 w-5 text-energy-green mt-1" />
                    <div>
                      <p className="font-medium">Potential Savings</p>
                      <p className="text-sm">₹{suggestion.potentialSavings.toFixed(2)} per month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <ThumbsUp className="h-5 w-5 text-energy-blue mt-1" />
                    <div>
                      <p className="font-medium">Benefits</p>
                      <p className="text-sm">Lower electricity bills, reduced carbon footprint</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-energy-yellow mt-1" />
                    <div>
                      <p className="font-medium">Difficulty</p>
                      <p className="text-sm">
                        {suggestion.difficulty === 'easy' && 'Simple to implement with minimal effort'}
                        {suggestion.difficulty === 'medium' && 'Requires some planning or small investment'}
                        {suggestion.difficulty === 'hard' && 'Requires significant investment or lifestyle change'}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SuggestionsList;
