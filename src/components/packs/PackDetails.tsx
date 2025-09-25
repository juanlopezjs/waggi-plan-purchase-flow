import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  X, 
  Users, 
  Heart, 
  Globe, 
  Crown, 
  UserPlus, 
  Mail, 
  Settings,
  MoreVertical,
  Copy,
  Share2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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

interface PackDetailsProps {
  pack: {
    id: number;
    name: string;
    type: 'family' | 'open';
    description: string;
    members: PackMember[];
    pets: PackPet[];
    createdAt: string;
    isOwner: boolean;
  };
  onClose: () => void;
}

export const PackDetails: React.FC<PackDetailsProps> = ({ pack, onClose }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

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

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    
    setIsInviting(true);
    // Simular envío de invitación
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsInviting(false);
    setInviteEmail('');
    // Aquí iría la lógica real de invitación
  };

  const handleSharePack = () => {
    // Lógica para compartir la manada
    navigator.clipboard.writeText(`https://waggi.app/packs/${pack.id}`);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-pack-border sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.color.split(' ')[0]}`}>
              <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
            </div>
            <div>
              <CardTitle className="text-lg text-pack-foreground">{pack.name}</CardTitle>
              <Badge variant="secondary" className={`${config.color} mt-1`}>
                <IconComponent className="w-3 h-3 mr-1" />
                {config.label}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {pack.isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSharePack}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        {pack.description && (
          <p className="text-sm text-pack-muted-foreground">
            {pack.description}
          </p>
        )}

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="members">Miembros</TabsTrigger>
            <TabsTrigger value="pets">Mascotas</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            {/* Invite Section */}
            {pack.isOwner && (
              <div className="space-y-3 p-3 bg-pack-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-pack-primary" />
                  <span className="text-sm font-medium text-pack-foreground">
                    Invitar {pack.type === 'family' ? 'familiar' : 'miembro'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Email del invitado"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={handleInvite}
                    disabled={!inviteEmail.trim() || isInviting}
                    className="bg-pack-primary hover:bg-pack-primary/90"
                  >
                    {isInviting ? 'Enviando...' : 'Invitar'}
                  </Button>
                </div>
              </div>
            )}

            {/* Members List */}
            <div className="space-y-3">
              {pack.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-pack-muted/50">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-pack-primary text-pack-primary-foreground">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-pack-foreground">{member.name}</p>
                      {member.role === 'owner' && (
                        <Crown className="w-3 h-3 text-amber-500" />
                      )}
                    </div>
                    <p className="text-xs text-pack-muted-foreground">
                      {member.role === 'owner' ? 'Propietario' : 'Miembro'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pets" className="space-y-4">
            {/* Pets List */}
            <div className="space-y-3">
              {pack.pets.length === 0 ? (
                <div className="text-center py-6">
                  <Heart className="w-12 h-12 text-pack-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-pack-muted-foreground">
                    No hay mascotas en esta manada aún
                  </p>
                </div>
              ) : (
                pack.pets.map((pet) => (
                  <div key={pet.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-pack-muted/50">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={pet.avatar} alt={pet.name} />
                      <AvatarFallback className="bg-pack-accent text-pack-accent-foreground">
                        {pet.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-pack-foreground">{pet.name}</p>
                      <p className="text-xs text-pack-muted-foreground">{pet.type}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-pack-border">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Mail className="w-3 h-3 mr-1" />
              Contactar
            </Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={handleSharePack}>
              <Copy className="w-3 h-3 mr-1" />
              Compartir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};