
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Plan {
  name: string;
  price: number;
}

interface OrderSummaryProps {
  selectedPlan: Plan;
  billingCycle: 'monthly' | 'annual';
  getCurrentPrice: () => number;
  getAnnualDiscount: () => number;
  formatPrice: (price: number) => string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedPlan,
  billingCycle,
  getCurrentPrice,
  getAnnualDiscount,
  formatPrice
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            {selectedPlan.name} ({billingCycle === 'monthly' ? 'Mensual' : 'Anual'})
          </span>
          <span className="font-semibold">
            {selectedPlan.price === 0 ? 'Gratis' : formatPrice(getCurrentPrice())}
          </span>
        </div>
        {billingCycle === 'annual' && selectedPlan.price > 0 && (
          <div className="flex justify-between items-center text-sm text-green-600">
            <span>Descuento anual</span>
            <span>-{formatPrice(getAnnualDiscount())}</span>
          </div>
        )}
        {selectedPlan.price > 0 && (
          <>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>IVA (19%)</span>
              <span>{formatPrice(getCurrentPrice() * 0.19)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-teal-600">
                {formatPrice(getCurrentPrice() * 1.19)}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
