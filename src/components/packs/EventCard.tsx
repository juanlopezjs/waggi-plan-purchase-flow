import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trash2,
  Gift,
  Heart
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PackEvent {
  id: string | number;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  type: 'event' | 'birthday';
  attendees?: number;
  createdBy: string;
  canDelete: boolean;
}

interface EventCardProps {
  event: PackEvent;
  onDelete: (id: string | number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const eventDate = new Date(`${event.date}T${event.time}`);
  const isUpcoming = eventDate > new Date();
  const isBirthday = event.type === 'birthday';

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      onDelete(event.id);
    }
  };

  return (
    <Card className={`bg-white/80 backdrop-blur-sm border-pack-border ${!isUpcoming ? 'opacity-75' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              {isBirthday ? (
                <Gift className="w-4 h-4 text-pack-accent" />
              ) : (
                <Calendar className="w-4 h-4 text-pack-primary" />
              )}
              <h4 className="font-semibold text-pack-foreground text-sm">
                {event.title}
              </h4>
              <Badge 
                variant="secondary" 
                className={`${isBirthday ? 'bg-pack-accent/10 text-pack-accent' : 'bg-pack-primary/10 text-pack-primary'} text-xs`}
              >
                {isBirthday ? 'Cumpleaños' : 'Evento'}
              </Badge>
            </div>
            
            {event.description && (
              <p className="text-xs text-pack-muted-foreground">
                {event.description}
              </p>
            )}
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-pack-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>
                  {format(eventDate, "d 'de' MMMM, yyyy", { locale: es })}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-pack-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{format(eventDate, 'HH:mm')}</span>
              </div>
              
              {event.location && (
                <div className="flex items-center gap-2 text-xs text-pack-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{event.location}</span>
                </div>
              )}
              
              {event.attendees && (
                <div className="flex items-center gap-2 text-xs text-pack-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{event.attendees} asistentes</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-pack-muted-foreground">
                Por {event.createdBy}
              </span>
              
              {!isUpcoming && (
                <Badge variant="outline" className="text-xs">
                  Finalizado
                </Badge>
              )}
            </div>
          </div>
          
          {event.canDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};