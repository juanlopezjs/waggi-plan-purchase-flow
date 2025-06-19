
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerFormProps {
  customerInfo: CustomerInfo;
  onInputChange: (field: string, value: string) => void;
  isProcessing: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customerInfo,
  onInputChange,
  isProcessing
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-teal-600" />
          Información personal
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo *</Label>
          <Input
            id="name"
            value={customerInfo.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Tu nombre completo"
            required
            disabled={isProcessing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="tu@email.com"
            required
            disabled={isProcessing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono *</Label>
          <Input
            id="phone"
            value={customerInfo.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="+57 300 123 4567"
            required
            disabled={isProcessing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            value={customerInfo.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            placeholder="Tu dirección"
            disabled={isProcessing}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
