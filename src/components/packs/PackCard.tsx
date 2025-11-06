import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Heart, Globe, Crown, Calendar } from 'lucide-react';

interface PackMember {
  id: number;
  name: string;
  role: 'owner' | 'member';
  avatar: string;
}

interface PackPet {
  id: number;
  name: string;
  type: string;
  avatar: string;
}

interface PackCardProps {
  pack: {
    id: number;
    name: string;
    type: 'family' | 'open';
    petType: 'dog' | 'cat' | 'any';
    description: string;
    members: PackMember[];
    pets: PackPet[];
    createdAt: string;
    isOwner: boolean;
    allowedBreeds?: string[];
  };
  isSelected: boolean;
  onSelect: () => void;
}

export const PackCard: React.FC<PackCardProps> = ({ pack, isSelected, onSelect }) => {
  const packTypeConfig = {
    family: {
      icon: Heart,
      label: 'Familiar',
      color: 'bg-pack-primary/10 text-pack-primary',
      iconColor: 'text-pack-primary'
    },
    open: {
      icon: Globe,
      label: 'Abierta',
      color: 'bg-pack-accent/10 text-pack-accent',
      iconColor: 'text-pack-accent'
    }
  };

  const config = packTypeConfig[pack.type];
  const IconComponent = config.icon;

  const petTypeConfig = {
    dog: { emoji: '🐕', label: 'Solo Perros' },
    cat: { emoji: '🐈', label: 'Solo Gatos' },
    any: { emoji: '🐾', label: 'Cualquier Mascota' }
  };

  const petConfig = petTypeConfig[pack.petType];

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-md border-pack-border active:scale-[0.98] ${
        isSelected 
          ? 'ring-2 ring-pack-primary shadow-xl scale-[1.01] lg:scale-[1.02]' 
          : 'hover:scale-[1.005] lg:hover:scale-[1.01]'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${config.color.split(' ')[0]} shadow-sm`}>
              <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${config.iconColor}`} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <h3 className="font-semibold text-base sm:text-lg text-pack-foreground truncate">{pack.name}</h3>
                {pack.isOwner && (
                  <Crown className="w-4 h-4 text-amber-500 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <Badge variant="secondary" className={`${config.color} text-xs`}>
                  <IconComponent className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {petConfig.emoji} <span className="hidden sm:inline">{petConfig.label}</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4">
        {/* Description */}
        <p className="text-xs sm:text-sm text-pack-muted-foreground line-clamp-2 leading-relaxed">
          {pack.description}
        </p>

        {/* Allowed Breeds */}
        {pack.allowedBreeds && pack.allowedBreeds.length > 0 && (
          <div className="pt-2 border-t border-pack-border">
            <p className="text-xs font-medium text-pack-muted-foreground mb-1.5">Razas permitidas:</p>
            <div className="flex flex-wrap gap-1">
              {pack.allowedBreeds.slice(0, 3).map((breed) => (
                <Badge key={breed} variant="outline" className="text-xs">
                  {breed}
                </Badge>
              ))}
              {pack.allowedBreeds.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{pack.allowedBreeds.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Quick Stats - Touch friendly */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="flex flex-col items-center p-2.5 sm:p-3 bg-pack-muted/50 rounded-xl">
            <Users className="w-4 h-4 text-pack-primary mb-1" />
            <span className="text-xs text-pack-muted-foreground">Miembros</span>
            <span className="font-bold text-base sm:text-lg text-pack-foreground">{pack.members.length}</span>
          </div>
          <div className="flex flex-col items-center p-2.5 sm:p-3 bg-pack-muted/50 rounded-xl">
            <Heart className="w-4 h-4 text-pack-accent mb-1" />
            <span className="text-xs text-pack-muted-foreground">Mascotas</span>
            <span className="font-bold text-base sm:text-lg text-pack-foreground">{pack.pets.length}</span>
          </div>
        </div>

        {/* Members Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-pack-foreground">Miembros:</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {pack.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-white shadow-sm">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-pack-primary text-pack-primary-foreground text-xs font-semibold">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {pack.members.length > 3 && (
              <span className="text-xs text-pack-muted-foreground ml-1">
                +{pack.members.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Creation Date */}
        <div className="flex items-center gap-2 pt-2 border-t border-pack-border">
          <Calendar className="w-3 h-3 text-pack-muted-foreground shrink-0" />
          <span className="text-xs text-pack-muted-foreground">
            Creada el {new Date(pack.createdAt).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};