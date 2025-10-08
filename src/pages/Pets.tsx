import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Heart, Settings, BookOpen, Calendar, Award } from 'lucide-react';
import { PetCard } from '@/components/pets/PetCard';
import { PetDetails } from '@/components/pets/PetDetails';
import { AddPetDialog } from '@/components/pets/AddPetDialog';
import { PetRecommendations } from '@/components/pets/PetRecommendations';

const Pets = () => {
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);

  // Mock data - en producción esto vendría de una API
  const pets = [
    {
      id: 1,
      name: 'Lucos',
      type: 'Perro',
      breed: 'Cocker Spaniel',
      age: 25,
      weight: 50,
      height: 50,
      avatar: '/placeholder.svg',
      personalityTraits: [
        { trait: 'Sociable y extrovertido', color: 'bg-blue-500' },
        { trait: 'Tranquilo y relajado', color: 'bg-cyan-500' },
        { trait: 'Obediente y disciplinado', color: 'bg-green-500' }
      ],
      evaluationsUsed: 0,
      evaluationsAvailable: 10,
      lastCheckup: '2024-01-15'
    },
    {
      id: 2,
      name: 'Asdads',
      type: 'Perro',
      breed: 'Golden Retriever',
      age: 3,
      weight: 28,
      height: 45,
      avatar: '/placeholder.svg',
      personalityTraits: [
        { trait: 'Energético', color: 'bg-orange-500' },
        { trait: 'Juguetón', color: 'bg-yellow-500' }
      ],
      evaluationsUsed: 2,
      evaluationsAvailable: 10,
      lastCheckup: '2024-02-20'
    },
    {
      id: 3,
      name: 'Pepe',
      type: 'Gato',
      breed: 'Persa',
      age: 5,
      weight: 4,
      height: 25,
      avatar: '/placeholder.svg',
      personalityTraits: [
        { trait: 'Independiente', color: 'bg-purple-500' },
        { trait: 'Cariñoso', color: 'bg-pink-500' }
      ],
      evaluationsUsed: 1,
      evaluationsAvailable: 5,
      lastCheckup: '2024-01-30'
    }
  ];

  const handleSelectPet = (pet: any) => {
    setSelectedPet(pet);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pet-accent to-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pet-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-pet-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mis Mascotas</h1>
                <p className="text-muted-foreground">Gestiona el cuidado de tus compañeros</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setIsAddPetOpen(true)}
              className="bg-pet-primary hover:bg-pet-primary/90 text-pet-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Registrar Mascota
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Pets Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6 mb-6 lg:mb-0">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isSelected={selectedPet?.id === pet.id}
                  onSelect={() => handleSelectPet(pet)}
                />
              ))}
            </div>
          </div>

          {/* Pet Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedPet ? (
              <div className="space-y-6">
                <PetDetails pet={selectedPet} />
                <PetRecommendations pet={selectedPet} />
              </div>
            ) : (
              <Card className="h-fit">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Selecciona una mascota</h3>
                  <p className="text-muted-foreground text-sm">
                    Elige una mascota para ver sus detalles, evaluaciones y recomendaciones personalizadas
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Add Pet Dialog */}
      <AddPetDialog open={isAddPetOpen} onOpenChange={setIsAddPetOpen} />
    </div>
  );
};

export default Pets;