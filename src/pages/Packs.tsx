import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Users, Heart, Globe } from 'lucide-react';
import { PackCard } from '@/components/packs/PackCard';
import { CreatePackDialog } from '@/components/packs/CreatePackDialog';
import { PackDetails } from '@/components/packs/PackDetails';

// Mock data para demostración
// Nota: María López y Luna tienen cumpleaños HOY para testing
const today = new Date();
const currentMonth = String(today.getMonth() + 1).padStart(2, '0'); // Octubre = 10
const currentDay = String(today.getDate()).padStart(2, '0'); // 01

const mockPacks = [
  {
    id: 1,
    name: "Familia López",
    type: "family" as const,
    petType: "any" as const,
    description: "Manada familiar para compartir el cuidado de nuestras mascotas",
    allowedBreeds: [],
    members: [
      { id: 1, name: "María López", role: "owner" as const, avatar: "/placeholder.svg", birthDate: `1985-${currentMonth}-${currentDay}` }, // Cumpleaños HOY!
      { id: 2, name: "Carlos López", role: "member" as const, avatar: "/placeholder.svg", birthDate: "1982-11-03" },
      { id: 3, name: "Ana López", role: "member" as const, avatar: "/placeholder.svg", birthDate: "2010-08-22" }
    ],
    pets: [
      { id: 1, name: "Max", type: "Perro", avatar: "/placeholder.svg", birthDate: "2022-03-15" },
      { id: 2, name: "Luna", type: "Gato", avatar: "/placeholder.svg", birthDate: `2021-${currentMonth}-${currentDay}` } // Cumpleaños HOY!
    ],
    events: [],
    createdAt: "2024-01-15",
    isOwner: true
  },
  {
    id: 2,
    name: "Amantes de los Golden",
    type: "open" as const,
    petType: "dog" as const,
    description: "Comunidad para dueños de Golden Retrievers en Bogotá",
    allowedBreeds: ["Golden Retriever", "Labrador"],
    members: [
      { id: 1, name: "Pedro Martín", role: "owner" as const, avatar: "/placeholder.svg", birthDate: "1990-02-18" },
      { id: 4, name: "Sofia Chen", role: "member" as const, avatar: "/placeholder.svg", birthDate: "1995-06-30" },
      { id: 5, name: "Diego Ruiz", role: "member" as const, avatar: "/placeholder.svg", birthDate: "1988-09-14" }
    ],
    pets: [
      { id: 3, name: "Buddy", type: "Perro", avatar: "/placeholder.svg", birthDate: "2020-12-10" },
      { id: 4, name: "Goldie", type: "Perro", avatar: "/placeholder.svg", birthDate: "2019-09-05" },
      { id: 5, name: "Cooper", type: "Perro", avatar: "/placeholder.svg", birthDate: "2023-01-28" }
    ],
    events: [
      {
        id: 1,
        title: "Paseo grupal en el parque",
        description: "Encuentro semanal en el Parque Central para socializar nuestros Golden Retrievers",
        date: "2024-01-30",
        time: "16:00",
        location: "Parque Central - Entrada principal",
        type: "event" as const,
        attendees: 5,
        createdBy: "Pedro Martín",
        canDelete: false
      }
    ],
    createdAt: "2024-02-20",
    isOwner: false
  }
];

const Packs = () => {
  const navigate = useNavigate();
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleSelectPack = (packId: number) => {
    setSelectedPack(packId);
  };

  const selectedPackData = mockPacks.find(pack => pack.id === selectedPack);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pack-background to-pack-secondary">
      {/* Header */}
      <header className="border-b border-pack-border bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleGoBack}
                className="text-pack-muted-foreground hover:text-pack-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-pack-primary" />
                <h1 className="text-2xl font-bold text-pack-foreground">Mis Manadas</h1>
              </div>
            </div>
            
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-pack-primary hover:bg-pack-primary/90 text-pack-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Manada
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Manadas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Estadísticas rápidas */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Card className="bg-white/80 backdrop-blur-sm border-pack-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pack-primary/10 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-pack-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-pack-muted-foreground">Manadas Familiares</p>
                      <p className="text-2xl font-bold text-pack-foreground">
                        {mockPacks.filter(p => p.type === 'family').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-pack-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pack-accent/10 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-pack-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-pack-muted-foreground">Manadas Abiertas</p>
                      <p className="text-2xl font-bold text-pack-foreground">
                        {mockPacks.filter(p => p.type === 'open').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de manadas */}
            <div className="space-y-4">
              {mockPacks.length === 0 ? (
                <Card className="bg-white/80 backdrop-blur-sm border-pack-border">
                  <CardContent className="p-8 text-center">
                    <Users className="w-16 h-16 text-pack-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-pack-foreground mb-2">
                      No tienes manadas aún
                    </h3>
                    <p className="text-pack-muted-foreground mb-4">
                      Crea tu primera manada para comenzar a compartir el cuidado de tus mascotas
                    </p>
                    <Button 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="bg-pack-primary hover:bg-pack-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crear Primera Manada
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                mockPacks.map((pack) => (
                  <PackCard
                    key={pack.id}
                    pack={pack}
                    isSelected={selectedPack === pack.id}
                    onSelect={() => handleSelectPack(pack.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Panel de detalles */}
          <div className="lg:col-span-1">
            {selectedPackData ? (
              <PackDetails 
                pack={selectedPackData}
                onClose={() => setSelectedPack(null)}
              />
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-pack-border sticky top-24">
                <CardContent className="p-8 text-center">
                  <Users className="w-16 h-16 text-pack-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-pack-foreground mb-2">
                    Selecciona una manada
                  </h3>
                  <p className="text-pack-muted-foreground">
                    Haz clic en una manada para ver sus detalles, miembros y mascotas
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Dialog para crear manada */}
      <CreatePackDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default Packs;