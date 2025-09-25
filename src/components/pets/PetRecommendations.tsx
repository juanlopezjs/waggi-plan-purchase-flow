import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Lightbulb, Heart, Shield, Dumbbell, Utensils } from 'lucide-react';

interface PetRecommendationsProps {
  pet: {
    name: string;
    breed: string;
    age: number;
    weight: number;
  };
}

export const PetRecommendations: React.FC<PetRecommendationsProps> = ({ pet }) => {
  const [isOpen, setIsOpen] = useState(false);

  const recommendations = [
    {
      category: 'Alimentación',
      icon: Utensils,
      color: 'bg-green-500',
      items: [
        'Comida premium para perros adultos',
        'Porciones de 2-3 tazas divididas en dos comidas',
        'Incorporar alimentos ricos en omega-3'
      ]
    },
    {
      category: 'Ejercicio',
      icon: Dumbbell,
      color: 'bg-blue-500',
      items: [
        'Paseos diarios de 45-60 minutos',
        'Sesiones de juego interactivo',
        'Entrenamiento de obediencia semanal'
      ]
    },
    {
      category: 'Salud Preventiva',
      icon: Shield,
      color: 'bg-red-500',
      items: [
        'Vacuna anual y desparasitación',
        'Revisiones dentales cada 6 meses',
        'Chequeo general cada 6-12 meses'
      ]
    }
  ];

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-pet-secondary" />
                Recomendaciones para {pet.name}
              </CardTitle>
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="p-3 bg-pet-accent rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-pet-primary" />
                  <span className="text-sm font-medium">Personalizado para {pet.breed}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recomendaciones especializadas basadas en la raza, edad y características de tu mascota.
                </p>
              </div>

              <div className="space-y-4">
                {recommendations.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${category.color}`} />
                      <h4 className="font-medium text-sm">{category.category}</h4>
                    </div>
                    <div className="ml-4 space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pet-primary animate-pulse" />
                    <span className="text-xs text-muted-foreground">
                      Actualizadas automáticamente
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver más detalles
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};