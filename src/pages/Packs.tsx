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
    events: [
      {
        id: 'fam-1',
        title: "Visita al veterinario",
        description: "Chequeo anual para Max",
        date: "2025-11-05",
        time: "10:30",
        location: "Clínica Veterinaria San Francisco, Calle 45 #12-34",
        attendees: 2,
        createdBy: "María López",
        canDelete: true
      },
      {
        id: 'fam-2',
        title: "Sesión de peluquería",
        description: "Corte y baño para Luna",
        date: "2025-11-10",
        time: "15:00",
        location: "Pet Spa Bogotá, Carrera 7 #85-23",
        attendees: 1,
        createdBy: "Carlos López",
        canDelete: true
      }
    ],
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
        date: "2025-11-02",
        time: "16:00",
        location: "Parque El Virrey, Bogotá",
        attendees: 5,
        createdBy: "Pedro Martín",
        canDelete: false
      },
      {
        id: 2,
        title: "Entrenamiento de obediencia",
        description: "Clase grupal de entrenamiento básico",
        date: "2025-11-08",
        time: "09:00",
        location: "Parque Simón Bolívar, Zona Deportiva",
        attendees: 8,
        createdBy: "Sofia Chen",
        canDelete: false
      },
      {
        id: 3,
        title: "Cumpleaños de Buddy",
        description: "Celebración del cumpleaños de Buddy con todos los amigos peludos",
        date: "2025-12-10",
        time: "14:00",
        location: "Cafetería Pet Friendly La Estación, Calle 85",
        attendees: 12,
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
      {/* Header - Mobile optimized */}
      <header className="border-b border-pack-border bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleGoBack}
                className="text-pack-muted-foreground hover:text-pack-foreground shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <div className="flex items-center gap-2 min-w-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-pack-primary shrink-0" />
                <h1 className="text-lg sm:text-2xl font-bold text-pack-foreground truncate">Mis Manadas</h1>
              </div>
            </div>
            
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              size="sm"
              className="bg-pack-primary hover:bg-pack-primary/90 text-pack-primary-foreground shrink-0"
            >
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Crear</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Mobile: Stack layout, Desktop: 2/3 + 1/3 grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Lista de Manadas - Full width on mobile */}
          <div className="w-full lg:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Estadísticas rápidas - Horizontal scroll on small screens */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Card className="bg-white/90 backdrop-blur-md border-pack-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pack-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pack-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-pack-muted-foreground truncate">Familiares</p>
                      <p className="text-xl sm:text-2xl font-bold text-pack-foreground">
                        {mockPacks.filter(p => p.type === 'family').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-md border-pack-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pack-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-pack-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-pack-muted-foreground truncate">Abiertas</p>
                      <p className="text-xl sm:text-2xl font-bold text-pack-foreground">
                        {mockPacks.filter(p => p.type === 'open').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de manadas - Optimized spacing */}
            <div className="space-y-3 sm:space-y-4">
              {mockPacks.length === 0 ? (
                <Card className="bg-white/90 backdrop-blur-md border-pack-border shadow-sm">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <Users className="w-12 h-12 sm:w-16 sm:h-16 text-pack-muted-foreground mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-pack-foreground mb-2">
                      No tienes manadas aún
                    </h3>
                    <p className="text-sm text-pack-muted-foreground mb-4 max-w-sm mx-auto">
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

          {/* Panel de detalles - Hidden on mobile when nothing selected, sticky on desktop */}
          {selectedPackData ? (
            <div className="w-full lg:col-span-1 lg:sticky lg:top-24 lg:h-fit">
              <PackDetails 
                pack={selectedPackData}
                onClose={() => setSelectedPack(null)}
              />
            </div>
          ) : (
            <div className="hidden lg:block lg:col-span-1">
              <Card className="bg-white/90 backdrop-blur-md border-pack-border shadow-sm sticky top-24">
                <CardContent className="p-8 text-center">
                  <Users className="w-16 h-16 text-pack-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-pack-foreground mb-2">
                    Selecciona una manada
                  </h3>
                  <p className="text-sm text-pack-muted-foreground">
                    Haz clic en una manada para ver sus detalles, miembros y mascotas
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
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