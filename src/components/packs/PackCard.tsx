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
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg bg-white/80 backdrop-blur-sm border-pack-border ${
        isSelected 
          ? 'ring-2 ring-pack-primary shadow-lg scale-[1.02]' 
          : 'hover:scale-[1.01]'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.color.split(' ')[0]}`}>
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-pack-foreground">{pack.name}</h3>
                {pack.isOwner && (
                  <Crown className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={config.color}>
                  <IconComponent className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {petConfig.emoji} {petConfig.label}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-pack-muted-foreground line-clamp-2">
          {pack.description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center p-3 bg-pack-muted rounded-lg">
            <Users className="w-4 h-4 text-pack-muted-foreground mb-1" />
            <span className="text-xs text-pack-muted-foreground">Miembros</span>
            <span className="font-semibold text-sm text-pack-foreground">{pack.members.length}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-pack-muted rounded-lg">
            <Heart className="w-4 h-4 text-pack-muted-foreground mb-1" />
            <span className="text-xs text-pack-muted-foreground">Mascotas</span>
            <span className="font-semibold text-sm text-pack-foreground">{pack.pets.length}</span>
          </div>
        </div>

        {/* Members Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-pack-foreground">Miembros:</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {pack.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-pack-primary text-pack-primary-foreground text-xs">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {pack.members.length > 3 && (
              <span className="text-xs text-pack-muted-foreground ml-2">
                +{pack.members.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Creation Date */}
        <div className="flex items-center gap-2 pt-2 border-t border-pack-border">
          <Calendar className="w-3 h-3 text-pack-muted-foreground" />
          <span className="text-xs text-pack-muted-foreground">
            Creada el {new Date(pack.createdAt).toLocaleDateString('es-ES')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};