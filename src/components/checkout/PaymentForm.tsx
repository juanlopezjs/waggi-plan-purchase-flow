
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onPaymentChange: (field: string, value: string) => void;
  isProcessing: boolean;
  showPayment: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentInfo,
  onPaymentChange,
  isProcessing,
  showPayment
}) => {
  if (!showPayment) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-teal-600" />
          Información de pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-teal-800 text-sm">
            🔒 Pago seguro procesado por Stripe. Tus datos están protegidos.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número de tarjeta *</Label>
            <Input
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) => onPaymentChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
              disabled={isProcessing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardName">Nombre en la tarjeta *</Label>
            <Input
              id="cardName"
              value={paymentInfo.cardName}
              onChange={(e) => onPaymentChange('cardName', e.target.value)}
              placeholder="Como aparece en tu tarjeta"
              required
              disabled={isProcessing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiry">Fecha de vencimiento *</Label>
            <Input
              id="expiry"
              value={paymentInfo.expiry}
              onChange={(e) => onPaymentChange('expiry', e.target.value)}
              placeholder="MM/AA"
              required
              disabled={isProcessing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              value={paymentInfo.cvv}
              onChange={(e) => onPaymentChange('cvv', e.target.value)}
              placeholder="123"
              required
              disabled={isProcessing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
