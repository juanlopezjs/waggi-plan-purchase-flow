import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateEvent: (event: NewEvent) => void;
}

interface NewEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export const CreateEventDialog: React.FC<CreateEventDialogProps> = ({
  open,
  onOpenChange,
  onCreateEvent,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<NewEvent>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof NewEvent, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El título del evento es requerido",
      });
      return false;
    }

    if (!formData.date) {
      toast({
        variant: "destructive",
        title: "Error", 
        description: "La fecha del evento es requerida",
      });
      return false;
    }

    if (!formData.time) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "La hora del evento es requerida", 
      });
      return false;
    }

    // Validar que la fecha no sea en el pasado
    const eventDateTime = new Date(`${formData.date}T${formData.time}`);
    if (eventDateTime <= new Date()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El evento debe ser programado para una fecha futura",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular llamada API
      
      onCreateEvent(formData);
      
      toast({
        title: "Evento creado",
        description: `El evento "${formData.title}" ha sido creado exitosamente`,
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el evento. Inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-pack-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-pack-foreground">
            <Calendar className="w-5 h-5 text-pack-primary" />
            Crear Evento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-pack-foreground">
              Título del evento *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ej: Paseo en el parque"
              className="border-pack-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-pack-foreground">
              Descripción
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe el evento..."
              rows={3}
              className="border-pack-border resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-pack-foreground">
                Fecha *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="border-pack-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-pack-foreground">
                Hora *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="border-pack-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-pack-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Ubicación
              </div>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Ej: Parque Central, Calle 123"
              className="border-pack-border"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="border-pack-border"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-pack-primary hover:bg-pack-primary/90 text-pack-primary-foreground"
          >
            {isSubmitting ? (
              <>Creando...</>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Crear Evento
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};