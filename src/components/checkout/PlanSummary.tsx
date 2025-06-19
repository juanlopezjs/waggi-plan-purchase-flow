
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Heart, Check } from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  period: string;
  annualPrice: number;
  color: string;
  features: string[];
}

interface PlanSummaryProps {
  selectedPlan: Plan;
  billingCycle: 'monthly' | 'annual';
  onBillingCycleChange: (cycle: 'monthly' | 'annual') => void;
  formatPrice: (price: number) => string;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({
  selectedPlan,
  billingCycle,
  onBillingCycleChange,
  formatPrice
}) => {
  const getCurrentPrice = () => {
    if (selectedPlan.price === 0) return 0;
    return billingCycle === 'monthly' ? selectedPlan.price : selectedPlan.annualPrice;
  };

  const getAnnualDiscount = () => {
    if (selectedPlan.price === 0) return 0;
    const monthlyYearly = selectedPlan.price * 12;
    const annualPrice = selectedPlan.annualPrice;
    return monthlyYearly - annualPrice;
  };

  return (
    <Card className={`${selectedPlan.color} border-teal-200`}>
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-gray-900">{selectedPlan.name}</CardTitle>
        <p className="text-gray-600">Pet Grooming Services</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Billing Cycle Selection */}
        {selectedPlan.price > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Ciclo de facturación</Label>
            <RadioGroup value={billingCycle} onValueChange={onBillingCycleChange}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-white/50 transition-colors">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>Mensual</span>
                    <span className="font-semibold">{formatPrice(selectedPlan.price)}</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-white/50 transition-colors">
                <RadioGroupItem value="annual" id="annual" />
                <Label htmlFor="annual" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span>Anual</span>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Ahorra {formatPrice(getAnnualDiscount())}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatPrice(selectedPlan.annualPrice / 12)}/mes
                      </div>
                    </div>
                    <span className="font-semibold">{formatPrice(selectedPlan.annualPrice)}</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <div className="text-center">
          <div className="text-3xl font-bold text-teal-600">
            {selectedPlan.price === 0 ? 'Gratis' : formatPrice(getCurrentPrice())}
          </div>
          <div className="text-gray-600">
            {selectedPlan.price === 0 ? selectedPlan.period : (billingCycle === 'monthly' ? 'por mes' : 'por año')}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Incluye:</h4>
          {selectedPlan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanSummary;
