
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';

interface PetInfo {
  petName: string;
  petBreed: string;
}

interface PetFormProps {
  petInfo: PetInfo;
  onInputChange: (field: string, value: string) => void;
  isProcessing: boolean;
}

const PetForm: React.FC<PetFormProps> = ({
  petInfo,
  onInputChange,
  isProcessing
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-teal-600" />
          Información de tu mascota
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="petName">Nombre de tu mascota *</Label>
          <Input
            id="petName"
            value={petInfo.petName}
            onChange={(e) => onInputChange('petName', e.target.value)}
            placeholder="Nombre de tu mascota"
            required
            disabled={isProcessing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="petBreed">Raza</Label>
          <Input
            id="petBreed"
            value={petInfo.petBreed}
            onChange={(e) => onInputChange('petBreed', e.target.value)}
            placeholder="Raza de tu mascota"
            disabled={isProcessing}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PetForm;
