import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Scale, Ruler, Edit, Heart, Play, CheckCircle2, BookOpen } from 'lucide-react';

// Mock data for courses - in production this would come from an API
const mockCourses = [
  {
    id: 1,
    title: "Obediencia Básica",
    description: "Comandos fundamentales para tu mascota",
    status: "available" as const,
    duration: "4 semanas",
    level: "Básico"
  },
  {
    id: 2,
    title: "Socialización Canina",
    description: "Aprende a socializar con otras mascotas",
    status: "available" as const,
    duration: "3 semanas",
    level: "Intermedio"
  },
  {
    id: 3,
    title: "Comportamiento Avanzado",
    description: "Técnicas avanzadas de comportamiento",
    status: "available" as const,
    duration: "6 semanas",
    level: "Avanzado"
  },
  {
    id: 4,
    title: "Trucos y Habilidades",
    description: "Enseña trucos divertidos a tu mascota",
    status: "completed" as const,
    duration: "2 semanas",
    level: "Básico",
    completedDate: "2024-01-15"
  },
  {
    id: 5,
    title: "Agilidad y Ejercicio",
    description: "Entrenamiento físico y mental",
    status: "completed" as const,
    duration: "5 semanas",
    level: "Intermedio",
    completedDate: "2023-12-20"
  }
];

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
  const availableCourses = mockCourses.filter(c => c.status === 'available');
  const completedCourses = mockCourses.filter(c => c.status === 'completed');
  
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
            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{availableCourses.length}</div>
                <div className="text-xs text-muted-foreground">Disponibles</div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{completedCourses.length}</div>
                <div className="text-xs text-muted-foreground">Completados</div>
              </div>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {/* Available Courses */}
                {availableCourses.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-sm">Cursos Disponibles</h4>
                    </div>
                    {availableCourses.map((course) => (
                      <Card key={course.id} className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-semibold text-sm">{course.title}</h5>
                                <Badge variant="outline" className="text-xs">
                                  {course.level}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{course.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            <Play className="w-3 h-3 mr-2" />
                            Presentar Evaluación
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Completed Courses */}
                {completedCourses.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-sm">Completados</h4>
                    </div>
                    {completedCourses.map((course) => (
                      <Card key={course.id} className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <h5 className="font-semibold text-sm">{course.title}</h5>
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                                  Completado
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{course.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Completado el {new Date(course.completedDate!).toLocaleDateString('es-ES')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};