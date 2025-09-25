import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Scale, Ruler, Edit, Heart, Award, Activity } from 'lucide-react';

interface PetDetailsProps {
  pet: {
    id: number;
    name: string;
    type: string;
    breed: string;
    age: number;
    weight: number;
    height: number;
    avatar: string;
    personalityTraits: Array<{ trait: string; color: string }>;
    evaluationsUsed: number;
    evaluationsAvailable: number;
    lastCheckup: string;
  };
}

export const PetDetails: React.FC<PetDetailsProps> = ({ pet }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pet-primary" />
            Detalles de {pet.name}
          </CardTitle>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pet Avatar and Basic Info */}
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={pet.avatar} alt={pet.name} />
            <AvatarFallback className="bg-pet-primary text-pet-primary-foreground text-xl">
              {pet.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">{pet.name}</h3>
            <p className="text-muted-foreground">{pet.breed}</p>
            <p className="text-sm text-muted-foreground">{pet.age} años</p>
          </div>
        </div>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="personality">Personalidad</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Scale className="w-5 h-5 text-pet-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Peso</p>
                  <p className="font-semibold">{pet.weight} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Ruler className="w-5 h-5 text-pet-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Altura</p>
                  <p className="font-semibold">{pet.height} cm</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Calendar className="w-5 h-5 text-pet-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Último chequeo</p>
                <p className="font-semibold">{new Date(pet.lastCheckup).toLocaleDateString('es-ES')}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personality" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">Rasgos de personalidad:</h4>
              <div className="space-y-2">
                {pet.personalityTraits.map((trait, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${trait.color}`} />
                    <span className="text-sm">{trait.trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Evaluaciones disponibles</h4>
                  <p className="text-sm text-muted-foreground">
                    {pet.evaluationsAvailable - pet.evaluationsUsed} de {pet.evaluationsAvailable} restantes
                  </p>
                </div>
                <Badge 
                  variant={pet.evaluationsAvailable - pet.evaluationsUsed > 2 ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  <Award className="w-3 h-3" />
                  {pet.evaluationsAvailable - pet.evaluationsUsed}
                </Badge>
              </div>
              
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="h-3 bg-pet-primary rounded-full transition-all"
                  style={{ 
                    width: `${((pet.evaluationsAvailable - pet.evaluationsUsed) / pet.evaluationsAvailable) * 100}%` 
                  }}
                />
              </div>

              <Button className="w-full bg-pet-primary hover:bg-pet-primary/90">
                <Activity className="w-4 h-4 mr-2" />
                Nueva Evaluación
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};