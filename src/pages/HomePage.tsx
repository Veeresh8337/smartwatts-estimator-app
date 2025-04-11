
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Calculator, PieChart, Lightbulb, Battery, FileText } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <section className="py-16 hero-gradient rounded-3xl mb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-energy-blue/10 px-3 py-1 text-sm text-energy-blue mb-4">
                Smart Electricity Estimator
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Understand Your <span className="gradient-text">Electricity Bill</span>
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SmartWatts helps you estimate your electricity consumption, analyze your bill, and get personalized tips to reduce your energy costs.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-energy-blue hover:bg-energy-blue-dark">
                  <Link to="/estimator">
                    <Zap className="mr-2 h-4 w-4" /> Start Estimating
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/suggestions">
                    <Lightbulb className="mr-2 h-4 w-4" /> View Smart Tips
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mt-0 lg:order-last animate-float">
              <img
                alt="Electricity Dashboard"
                className="rounded-xl object-cover w-full aspect-[4/3]"
                src="https://images.unsplash.com/photo-1592833159842-07eec5fbd8e6?q=80&w=1887&auto=format&fit=crop"
                width={550}
                height={413}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 mb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How SmartWatts Works
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Understand and optimize your electricity usage in four simple steps
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="energy-card">
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-energy-blue/10 p-3 w-12 h-12 mx-auto mb-4">
                  <Calculator className="h-6 w-6 text-energy-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Input Appliances</h3>
                <p className="text-gray-500">
                  Add your household appliances with their wattage and usage hours
                </p>
              </CardContent>
            </Card>
            <Card className="energy-card">
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-energy-green/10 p-3 w-12 h-12 mx-auto mb-4">
                  <Battery className="h-6 w-6 text-energy-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Calculate Usage</h3>
                <p className="text-gray-500">
                  Our algorithm calculates your daily and monthly energy consumption
                </p>
              </CardContent>
            </Card>
            <Card className="energy-card">
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-energy-yellow/10 p-3 w-12 h-12 mx-auto mb-4">
                  <PieChart className="h-6 w-6 text-energy-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visualize Data</h3>
                <p className="text-gray-500">
                  See detailed breakdowns and charts of your consumption patterns
                </p>
              </CardContent>
            </Card>
            <Card className="energy-card">
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-energy-red/10 p-3 w-12 h-12 mx-auto mb-4">
                  <Lightbulb className="h-6 w-6 text-energy-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Get Smart Tips</h3>
                <p className="text-gray-500">
                  Receive personalized suggestions to reduce your electricity bill
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-energy-blue/10 rounded-3xl">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Start Saving?
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take control of your electricity consumption and start saving money today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-energy-blue hover:bg-energy-blue-dark">
                  <Link to="/estimator">
                    <Zap className="mr-2 h-4 w-4" /> Start Estimating
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/suggestions">
                    <FileText className="mr-2 h-4 w-4" /> Learn More
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Smart energy management"
                className="rounded-xl object-cover mx-auto aspect-[4/3]"
                src="https://images.unsplash.com/photo-1611151657506-8a5f0f4e9d23?q=80&w=2072&auto=format&fit=crop"
                width={500}
                height={375}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
