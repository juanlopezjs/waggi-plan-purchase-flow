import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Scale, Ruler, Award, AlertCircle } from 'lucide-react';

interface PetCardProps {
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
  isSelected: boolean;
  onSelect: () => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, isSelected, onSelect }) => {
  const evaluationPercentage = (pet.evaluationsUsed / pet.evaluationsAvailable) * 100;
  const isLowEvaluations = evaluationPercentage > 80;

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-pet-primary shadow-lg scale-[1.02]' 
          : 'hover:scale-[1.01]'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={pet.avatar} alt={pet.name} />
              <AvatarFallback className="bg-pet-primary text-pet-primary-foreground">
                {pet.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{pet.name}</h3>
              <p className="text-sm text-muted-foreground">{pet.breed}</p>
            </div>
          </div>
          
          {isLowEvaluations && (
            <AlertCircle className="w-5 h-5 text-destructive" />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
            <Calendar className="w-4 h-4 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Edad</span>
            <span className="font-semibold text-sm">{pet.age} años</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
            <Scale className="w-4 h-4 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Peso</span>
            <span className="font-semibold text-sm">{pet.weight} kg</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
            <Award className="w-4 h-4 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Evaluaciones</span>
            <span className="font-semibold text-sm">
              {pet.evaluationsAvailable - pet.evaluationsUsed}
            </span>
          </div>
        </div>

        {/* Personality Traits Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Personalidad:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {pet.personalityTraits.slice(0, 2).map((trait, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1"
              >
                {trait.trait.split(' ')[0]}
              </Badge>
            ))}
            {pet.personalityTraits.length > 2 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{pet.personalityTraits.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Evaluation Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Evaluaciones</span>
            <span className="text-xs text-muted-foreground">
              {pet.evaluationsUsed}/{pet.evaluationsAvailable}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                isLowEvaluations ? 'bg-destructive' : 'bg-pet-primary'
              }`}
              style={{ width: `${evaluationPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};