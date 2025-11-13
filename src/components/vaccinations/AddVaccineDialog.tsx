import React, { useState } from 'react';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Syringe, Bug } from 'lucide-react';

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
  const [treatmentType, setTreatmentType] = useState<'vaccine' | 'deworming'>('vaccine');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in production this would call backend
    console.log('Treatment added:', treatmentType);
    onOpenChange(false);
  };

  if (!pet) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Registrar Tratamiento Preventivo</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Registra vacunas o desparasitación para {pet.name}
          </p>
        </DialogHeader>

        <Tabs value={treatmentType} onValueChange={(v) => setTreatmentType(v as 'vaccine' | 'deworming')} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vaccine" className="flex items-center gap-2">
              <Syringe className="w-4 h-4" />
              Vacuna
            </TabsTrigger>
            <TabsTrigger value="deworming" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              Desparasitación
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="mt-6">
            <TabsContent value="vaccine" className="space-y-4 mt-0">
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
            </TabsContent>

            <TabsContent value="deworming" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="deworming-name">Tipo de Desparasitación *</Label>
                <Input
                  id="deworming-name"
                  placeholder="Ej: Interna, Externa, Pipeta, Comprimido"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deworming-product">Producto Utilizado *</Label>
                <Input
                  id="deworming-product"
                  placeholder="Ej: Drontal, Frontline, Bravecto"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deworming-date">Fecha de Aplicación *</Label>
                  <Input
                    id="deworming-date"
                    type="date"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deworming-next">Próxima Aplicación</Label>
                  <Input
                    id="deworming-next"
                    type="date"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deworming-vet">Veterinario *</Label>
                <Input
                  id="deworming-vet"
                  placeholder="Nombre del veterinario"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deworming-clinic">Clínica Veterinaria *</Label>
                <Input
                  id="deworming-clinic"
                  placeholder="Nombre de la clínica"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deworming-notes">Notas Adicionales</Label>
                <Textarea
                  id="deworming-notes"
                  placeholder="Observaciones, reacciones, etc."
                  rows={3}
                />
              </div>
            </TabsContent>

            <div className="flex gap-3 pt-6">
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
                Registrar {treatmentType === 'vaccine' ? 'Vacuna' : 'Desparasitación'}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
