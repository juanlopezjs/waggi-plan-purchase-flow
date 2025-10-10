import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

interface AddVaccineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: any;
}

export const AddVaccineDialog: React.FC<AddVaccineDialogProps> = ({ 
  open, 
  onOpenChange, 
  pet 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in production this would call backend
    console.log('Vaccine added');
    onOpenChange(false);
  };

  if (!pet) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Vacuna</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Registra una vacuna aplicada para {pet.name}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="vaccine-name">Nombre de la Vacuna *</Label>
            <Input
              id="vaccine-name"
              placeholder="Ej: Rabia, Parvovirus, Triple Felina"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vaccine-date">Fecha de Aplicación *</Label>
              <Input
                id="vaccine-date"
                type="date"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vaccine-next">Próxima Dosis</Label>
              <Input
                id="vaccine-next"
                type="date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vaccine-vet">Veterinario *</Label>
            <Input
              id="vaccine-vet"
              placeholder="Nombre del veterinario"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vaccine-clinic">Clínica Veterinaria *</Label>
            <Input
              id="vaccine-clinic"
              placeholder="Nombre de la clínica"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vaccine-lot">Número de Lote</Label>
            <Input
              id="vaccine-lot"
              placeholder="Ej: PV2024-445"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vaccine-notes">Notas Adicionales</Label>
            <Textarea
              id="vaccine-notes"
              placeholder="Observaciones, reacciones, etc."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-vaccination-primary hover:bg-vaccination-primary/90">
              <Calendar className="w-4 h-4 mr-2" />
              Registrar Vacuna
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
