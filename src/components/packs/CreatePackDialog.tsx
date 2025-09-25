import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Globe, Info } from 'lucide-react';

interface CreatePackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePackDialog: React.FC<CreatePackDialogProps> = ({ open, onOpenChange }) => {
  const [packType, setPackType] = useState<'family' | 'open'>('family');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para crear la manada
    console.log('Creating pack:', { ...formData, type: packType });
    onOpenChange(false);
    // Reset form
    setFormData({ name: '', description: '' });
    setPackType('family');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const packTypes = [
    {
      id: 'family',
      title: 'Manada Familiar',
      description: 'Para compartir el cuidado de mascotas con tu familia',
      icon: Heart,
      color: 'border-pack-primary bg-pack-primary/5',
      iconColor: 'text-pack-primary',
      features: [
        'Invitar solo a familiares',
        'Compartir mascotas de la familia',
        'Historial médico compartido',
        'Acceso completo a evaluaciones'
      ]
    },
    {
      id: 'open',
      title: 'Manada Abierta',
      description: 'Para conectar con otros dueños de mascotas',
      icon: Globe,
      color: 'border-pack-accent bg-pack-accent/5',
      iconColor: 'text-pack-accent',
      features: [
        'Invitar a cualquier dueño',
        'Compartir experiencias',
        'Intercambiar consejos',
        'Crear comunidad'
      ]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-pack-primary" />
            Crear Nueva Manada
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pack Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Tipo de Manada *</Label>
            <RadioGroup 
              value={packType} 
              onValueChange={(value) => setPackType(value as 'family' | 'open')}
              className="space-y-3"
            >
              {packTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <div key={type.id} className="flex items-start space-x-3">
                    <RadioGroupItem 
                      value={type.id} 
                      id={type.id}
                      className="mt-4"
                    />
                    <Card className={`flex-1 cursor-pointer transition-all ${
                      packType === type.id ? type.color : 'border-pack-border hover:border-pack-primary/20'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            packType === type.id ? 'bg-current/10' : 'bg-pack-muted'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              packType === type.id ? type.iconColor : 'text-pack-muted-foreground'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-pack-foreground mb-1">
                              {type.title}
                            </h3>
                            <p className="text-sm text-pack-muted-foreground mb-3">
                              {type.description}
                            </p>
                            <ul className="space-y-1">
                              {type.features.map((feature, index) => (
                                <li key={index} className="text-xs text-pack-muted-foreground flex items-center gap-2">
                                  <div className="w-1 h-1 bg-pack-muted-foreground rounded-full" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre de la Manada *</Label>
              <Input 
                id="name" 
                placeholder={packType === 'family' ? 'Ej: Familia García' : 'Ej: Amantes de los Golden'}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required 
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea 
                id="description" 
                placeholder={
                  packType === 'family' 
                    ? 'Describe cómo tu familia comparte el cuidado de las mascotas...'
                    : 'Describe el propósito de tu manada y qué tipo de miembros buscas...'
                }
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
          </div>

          {/* Information Card */}
          <Card className="bg-pack-muted/50 border-pack-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-pack-primary mt-0.5" />
                <div className="text-sm text-pack-foreground">
                  <p className="font-medium mb-1">¿Qué sucede después?</p>
                  <p className="text-pack-muted-foreground">
                    {packType === 'family' 
                      ? 'Podrás invitar a tus familiares por email y ellos tendrán acceso a las mascotas compartidas.'
                      : 'Podrás invitar a otros dueños de mascotas y compartir experiencias sobre el cuidado de las mascotas.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-pack-primary hover:bg-pack-primary/90"
              disabled={!formData.name.trim()}
            >
              Crear Manada
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};