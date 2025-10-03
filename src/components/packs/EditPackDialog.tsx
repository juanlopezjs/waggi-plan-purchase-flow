import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Info, Users } from 'lucide-react';

interface EditPackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pack: {
    id: number;
    name: string;
    type: 'family' | 'open';
    petType: 'dog' | 'cat' | 'any';
    description: string;
    allowedBreeds?: string[];
  };
}

const dogBreeds = ['Golden Retriever', 'Labrador', 'Bulldog', 'Poodle', 'Beagle'];
const catBreeds = ['Persa', 'Siamés', 'Maine Coon', 'Bengala', 'Sphynx'];

export const EditPackDialog: React.FC<EditPackDialogProps> = ({ open, onOpenChange, pack }) => {
  const [packType, setPackType] = useState<'family' | 'open'>(pack.type);
  const [petType, setPetType] = useState<'dog' | 'cat' | 'any'>(pack.petType);
  const [allowedBreeds, setAllowedBreeds] = useState<string[]>(pack.allowedBreeds || []);
  const [formData, setFormData] = useState({
    name: pack.name,
    description: pack.description || '',
  });

  useEffect(() => {
    // Si cambia el tipo de mascota, reiniciamos razas
    setAllowedBreeds([]);
  }, [petType]);

  const toggleBreed = (breed: string) => {
    setAllowedBreeds((prev) =>
      prev.includes(breed) ? prev.filter((b) => b !== breed) : [...prev, breed]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: pack.id,
      name: formData.name.trim(),
      description: formData.description.trim(),
      type: packType,
      petType,
      allowedBreeds: petType === 'any' ? [] : allowedBreeds,
    };

    console.log('Updating pack:', payload);
    onOpenChange(false);
  };

  const breeds = petType === 'dog' ? dogBreeds : catBreeds;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-pack-primary" />
            Editar Manada
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Manada */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Tipo de Manada *</Label>
            <RadioGroup 
              value={packType} 
              onValueChange={(value) => setPackType(value as 'family' | 'open')}
              className="grid grid-cols-2 gap-3"
            >
              <div>
                <RadioGroupItem value="family" id="edit-family" className="peer sr-only" />
                <Label
                  htmlFor="edit-family"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-pack-border cursor-pointer transition-all peer-data-[state=checked]:border-pack-primary peer-data-[state=checked]:bg-pack-primary/5"
                >
                  <span className="text-sm font-medium">Familiar</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="open" id="edit-open" className="peer sr-only" />
                <Label
                  htmlFor="edit-open"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-pack-border cursor-pointer transition-all peer-data-[state=checked]:border-pack-primary peer-data-[state=checked]:bg-pack-primary/5"
                >
                  <span className="text-sm font-medium">Abierta</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Tipo de Mascota */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Tipo de Mascota *</Label>
            <RadioGroup 
              value={petType} 
              onValueChange={(value) => setPetType(value as 'dog' | 'cat' | 'any')}
              className="grid grid-cols-3 gap-3"
            >
              <div>
                <RadioGroupItem value="dog" id="edit-dog" className="peer sr-only" />
                <Label
                  htmlFor="edit-dog"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-pack-border cursor-pointer transition-all peer-data-[state=checked]:border-pack-primary peer-data-[state=checked]:bg-pack-primary/5"
                >
                  <span className="text-2xl mb-2">🐕</span>
                  <span className="text-sm font-medium">Perros</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="cat" id="edit-cat" className="peer sr-only" />
                <Label
                  htmlFor="edit-cat"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-pack-border cursor-pointer transition-all peer-data-[state=checked]:border-pack-primary peer-data-[state=checked]:bg-pack-primary/5"
                >
                  <span className="text-2xl mb-2">🐈</span>
                  <span className="text-sm font-medium">Gatos</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="any" id="edit-any" className="peer sr-only" />
                <Label
                  htmlFor="edit-any"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-pack-border cursor-pointer transition-all peer-data-[state=checked]:border-pack-primary peer-data-[state=checked]:bg-pack-primary/5"
                >
                  <span className="text-2xl mb-2">🐾</span>
                  <span className="text-sm font-medium">Mixta</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Razas permitidas (opcional) */}
          {petType !== 'any' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Razas permitidas (opcional)</Label>
                <span className="text-xs text-pack-muted-foreground">{allowedBreeds.length} seleccionadas</span>
              </div>
              <ScrollArea className="h-36 rounded-md border border-pack-border p-3 bg-pack-muted/30">
                <div className="grid grid-cols-2 gap-2">
                  {breeds.map((breed) => (
                    <label key={breed} className="flex items-center gap-2 text-sm text-pack-foreground">
                      <Checkbox 
                        checked={allowedBreeds.includes(breed)} 
                        onCheckedChange={() => toggleBreed(breed)}
                        id={`breed-${breed}`}
                      />
                      <span>{breed}</span>
                    </label>
                  ))}
                </div>
              </ScrollArea>
              <p className="text-xs text-pack-muted-foreground">
                Si no seleccionas ninguna, se permitirán todas las razas de {petType === 'dog' ? 'perros' : 'gatos'}.
              </p>
            </div>
          )}

          {/* Información básica */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nombre *</Label>
              <Input 
                id="edit-name" 
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required 
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea 
                id="edit-description" 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              />
            </div>
          </div>

          {/* Info */}
          <Card className="bg-pack-muted/50 border-pack-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-pack-primary mt-0.5" />
                <div className="text-sm text-pack-foreground">
                  <p className="font-medium mb-1">Preferencias de la manada</p>
                  <p className="text-pack-muted-foreground">
                    Ajusta el tipo de mascota y razas permitidas para controlar quién puede unirse.
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
              Guardar cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
