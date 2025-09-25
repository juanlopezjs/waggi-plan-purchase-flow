import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Upload } from 'lucide-react';

interface AddPetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddPetDialog: React.FC<AddPetDialogProps> = ({ open, onOpenChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la mascota
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pet-primary" />
            Registrar nueva mascota
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm" type="button">
              Subir foto
            </Button>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre *</Label>
                <Input id="name" placeholder="Ej: Max" required />
              </div>
              <div>
                <Label htmlFor="type">Tipo *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Perro</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="bird">Ave</SelectItem>
                    <SelectItem value="rabbit">Conejo</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="breed">Raza</Label>
              <Input id="breed" placeholder="Ej: Golden Retriever" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age">Edad (años)</Label>
                <Input id="age" type="number" placeholder="0" min="0" max="30" />
              </div>
              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input id="weight" type="number" placeholder="0" min="0" step="0.1" />
              </div>
              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input id="height" type="number" placeholder="0" min="0" />
              </div>
            </div>
          </div>

          {/* Personality */}
          <div>
            <Label htmlFor="personality">Personalidad</Label>
            <Textarea 
              id="personality" 
              placeholder="Describe la personalidad de tu mascota (ej: juguetón, tranquilo, sociable...)"
              rows={3}
            />
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Información médica (opcional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastCheckup">Último chequeo</Label>
                <Input id="lastCheckup" type="date" />
              </div>
              <div>
                <Label htmlFor="veterinarian">Veterinario</Label>
                <Input id="veterinarian" placeholder="Nombre del veterinario" />
              </div>
            </div>
          </div>

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
              className="flex-1 bg-pet-primary hover:bg-pet-primary/90"
            >
              Registrar mascota
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};