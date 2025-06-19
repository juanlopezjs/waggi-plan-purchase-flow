
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CheckoutHeaderProps {
  onBack: () => void;
  isProcessing: boolean;
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ onBack, isProcessing }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="flex items-center gap-2 text-teal-700 hover:bg-teal-100"
        disabled={isProcessing}
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a planes
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Confirma tu plan</h1>
        <p className="text-gray-600">Estás a un paso de cuidar mejor a tu mascota</p>
      </div>
    </div>
  );
};

export default CheckoutHeader;
