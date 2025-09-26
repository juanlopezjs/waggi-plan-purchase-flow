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
  Share2,
  Calendar,
  Plus,
  Gift,
  Cake
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EventCard } from './EventCard';
import { CreateEventDialog } from './CreateEventDialog';
import { format, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';

interface PackMember {
  id: number;
  name: string;
  role: 'owner' | 'member';
  avatar: string;
  birthDate?: string;
}

interface PackPet {
  id: number;
  name: string;
  type: string;
  avatar: string;
  birthDate?: string;
}

interface PackEvent {
  id: string | number;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  attendees?: number;
  createdBy: string;
  canDelete: boolean;
}

interface PackDetailsProps {
  pack: {
    id: number;
    name: string;
    type: 'family' | 'open';
    description: string;
    members: PackMember[];
    pets: PackPet[];
    events: PackEvent[];
    createdAt: string;
    isOwner: boolean;
  };
  onClose: () => void;
}

export const PackDetails: React.FC<PackDetailsProps> = ({ pack, onClose }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [events, setEvents] = useState<PackEvent[]>(pack.events);

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

  const handleCreateEvent = (eventData: any) => {
    const newEvent: PackEvent = {
      id: Date.now(), // En una app real, esto vendría del servidor
      ...eventData,
      createdBy: 'Usuario actual', // En una app real, esto vendría del contexto del usuario
      canDelete: true,
      attendees: 0
    };
    
    setEvents(prev => [...prev, newEvent]);
  };

  const handleDeleteEvent = (eventId: string | number) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // Generar información de cumpleaños para miembros y mascotas
  const getBirthdays = () => {
    const birthdays: Array<{
      id: string;
      name: string;
      date: string;
      type: 'member' | 'pet';
    }> = [];
    
    // Cumpleaños de miembros
    pack.members.forEach(member => {
      if (member.birthDate) {
        const currentYear = new Date().getFullYear();
        const birthDate = new Date(member.birthDate);
        const nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
        
        // Si ya pasó este año, usar el próximo año
        if (nextBirthday < new Date()) {
          nextBirthday.setFullYear(currentYear + 1);
        }
        
        birthdays.push({
          id: `member-birthday-${member.id}`,
          name: member.name,
          date: nextBirthday.toISOString().split('T')[0],
          type: 'member'
        });
      }
    });
    
    // Cumpleaños de mascotas
    pack.pets.forEach(pet => {
      if (pet.birthDate) {
        const currentYear = new Date().getFullYear();
        const birthDate = new Date(pet.birthDate);
        const nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
        
        // Si ya pasó este año, usar el próximo año
        if (nextBirthday < new Date()) {
          nextBirthday.setFullYear(currentYear + 1);
        }
        
        birthdays.push({
          id: `pet-birthday-${pet.id}`,
          name: pet.name,
          date: nextBirthday.toISOString().split('T')[0],
          type: 'pet'
        });
      }
    });
    
    return birthdays.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  // Solo eventos creados por usuarios (actividades)
  const sortedEvents = events.sort((a, b) => 
    new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
  );

  // Próximos eventos para mostrar en el resumen
  const upcomingEvents = sortedEvents.filter(event => 
    new Date(`${event.date}T${event.time}`) >= new Date()
  ).slice(0, 2);

  // Próximos cumpleaños para mostrar en el resumen
  const upcomingBirthdays = getBirthdays().filter(birthday => 
    new Date(birthday.date) >= new Date()
  ).slice(0, 2);

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

        {/* Próximos eventos y cumpleaños */}
        {(upcomingEvents.length > 0 || upcomingBirthdays.length > 0) && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-pack-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pack-primary" />
                Próximo
              </h3>
            </div>
            <div className="space-y-2">
              {/* Mostrar eventos */}
              {upcomingEvents.map((event) => {
                const eventDate = new Date(`${event.date}T${event.time}`);
                let dateLabel = format(eventDate, "d 'de' MMM", { locale: es });
                
                if (isToday(eventDate)) dateLabel = "Hoy";
                else if (isTomorrow(eventDate)) dateLabel = "Mañana";
                
                return (
                  <div 
                    key={event.id} 
                    className="flex items-center gap-3 p-2 bg-pack-muted/30 rounded-lg"
                  >
                    <Calendar className="w-4 h-4 text-pack-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-pack-foreground truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-pack-muted-foreground">
                        {dateLabel} • {event.time}
                      </p>
                    </div>
                  </div>
                );
              })}
              
              {/* Mostrar cumpleaños */}
              {upcomingBirthdays.map((birthday) => {
                const birthdayDate = new Date(birthday.date);
                let dateLabel = format(birthdayDate, "d 'de' MMM", { locale: es });
                
                if (isToday(birthdayDate)) dateLabel = "Hoy";
                else if (isTomorrow(birthdayDate)) dateLabel = "Mañana";
                
                return (
                  <div 
                    key={birthday.id} 
                    className="flex items-center gap-3 p-2 bg-pack-accent/10 rounded-lg"
                  >
                    <Cake className="w-4 h-4 text-pack-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-pack-foreground truncate">
                        Cumpleaños de {birthday.name}
                      </p>
                      <p className="text-xs text-pack-muted-foreground">
                        {dateLabel} • {birthday.type === 'member' ? 'Miembro' : 'Mascota'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Miembros</TabsTrigger>
            <TabsTrigger value="pets">Mascotas</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="birthdays">Cumpleaños</TabsTrigger>
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

          <TabsContent value="events" className="space-y-4">
            {/* Crear evento */}
            {pack.isOwner && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setIsCreateEventOpen(true)}
                  className="bg-pack-primary hover:bg-pack-primary/90 text-pack-primary-foreground"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Crear Evento
                </Button>
              </div>
            )}

            {/* Lista de eventos */}
            <div className="space-y-3">
              {sortedEvents.length === 0 ? (
                <div className="text-center py-6">
                  <Calendar className="w-12 h-12 text-pack-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-pack-muted-foreground">
                    No hay eventos programados
                  </p>
                </div>
              ) : (
                sortedEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onDelete={handleDeleteEvent}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="birthdays" className="space-y-4">
            {/* Lista de cumpleaños */}
            <div className="space-y-3">
              {getBirthdays().length === 0 ? (
                <div className="text-center py-6">
                  <Cake className="w-12 h-12 text-pack-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-pack-muted-foreground">
                    No hay cumpleaños registrados
                  </p>
                </div>
              ) : (
                getBirthdays().map((birthday) => {
                  const birthdayDate = new Date(birthday.date);
                  const isUpcoming = birthdayDate >= new Date();
                  
                  return (
                    <Card 
                      key={birthday.id} 
                      className={`bg-white/80 backdrop-blur-sm border-pack-border ${!isUpcoming ? 'opacity-75' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            birthday.type === 'member' 
                              ? 'bg-pack-primary/10' 
                              : 'bg-pack-accent/10'
                          }`}>
                            <Cake className={`w-5 h-5 ${
                              birthday.type === 'member' 
                                ? 'text-pack-primary' 
                                : 'text-pack-accent'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-pack-foreground text-sm">
                                Cumpleaños de {birthday.name}
                              </h4>
                              <Badge 
                                variant="secondary" 
                                className={`${
                                  birthday.type === 'member' 
                                    ? 'bg-pack-primary/10 text-pack-primary' 
                                    : 'bg-pack-accent/10 text-pack-accent'
                                } text-xs`}
                              >
                                {birthday.type === 'member' ? 'Miembro' : 'Mascota'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-pack-muted-foreground mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {format(birthdayDate, "d 'de' MMMM, yyyy", { locale: es })}
                              </span>
                              {!isUpcoming && (
                                <Badge variant="outline" className="text-xs ml-2">
                                  Pasado
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
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

      {/* Dialog para crear evento */}
      <CreateEventDialog 
        open={isCreateEventOpen}
        onOpenChange={setIsCreateEventOpen}
        onCreateEvent={handleCreateEvent}
      />
    </Card>
  );
};