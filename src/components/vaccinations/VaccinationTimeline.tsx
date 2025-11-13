import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertCircle, Syringe, Bug } from 'lucide-react';

interface VaccinationTimelineProps {
  appliedVaccines: Array<{
    id: number;
    name: string;
    type: 'vaccine' | 'deworming';
    date: string;
    veterinarian: string;
    clinic: string;
    lot?: string;
    product?: string;
    nextDose: string | null;
  }>;
  upcomingVaccines: Array<{
    id: number;
    name: string;
    type: 'vaccine' | 'deworming';
    dueDate: string;
    recommendedAge: string;
    importance: string;
    description: string;
    daysUntil: number;
  }>;
}

export const VaccinationTimeline: React.FC<VaccinationTimelineProps> = ({ 
  appliedVaccines, 
  upcomingVaccines 
}) => {
  // Combine and sort all vaccines by date
  const allEvents = [
    ...appliedVaccines.map(v => ({
      ...v,
      type: 'applied' as const,
      sortDate: new Date(v.date)
    })),
    ...upcomingVaccines.map(v => ({
      ...v,
      type: 'upcoming' as const,
      sortDate: new Date(v.dueDate)
    }))
  ].sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial Completo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border" />

          <div className="space-y-6">
            {allEvents.map((event, index) => (
              <div key={`${event.type}-${event.id}`} className="relative pl-12">
                {/* Timeline Dot */}
                <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  event.type === 'applied' 
                    ? 'bg-green-500/10 border-green-500 text-green-600'
                    : event.type === 'upcoming' && (event as any).daysUntil <= 30
                    ? 'bg-red-500/10 border-red-500 text-red-600'
                    : 'bg-amber-500/10 border-amber-500 text-amber-600'
                }`}>
                  {event.type === 'applied' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (event as any).daysUntil <= 30 ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>

                {/* Event Card */}
                <div className={`p-4 rounded-lg border ${
                  event.type === 'applied'
                    ? 'bg-card border-border'
                    : 'bg-muted/30 border-dashed border-muted-foreground/30'
                }`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {(event as any).type === 'vaccine' ? (
                          <Syringe className="w-4 h-4 text-green-600" />
                        ) : (
                          <Bug className="w-4 h-4 text-blue-600" />
                        )}
                        <h4 className="font-semibold text-foreground">{event.name}</h4>
                      </div>
                      {event.type === 'applied' ? (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Fecha:</span> {new Date((event as any).date).toLocaleDateString('es-ES')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Veterinario:</span> {(event as any).veterinarian}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Clínica:</span> {(event as any).clinic}
                          </p>
                          {(event as any).lot && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Lote: {(event as any).lot}
                            </p>
                          )}
                          {(event as any).product && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Producto: {(event as any).product}
                            </p>
                          )}
                          {(event as any).nextDose && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Próximo refuerzo: {new Date((event as any).nextDose).toLocaleDateString('es-ES')}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground mb-2">{(event as any).description}</p>
                          <p className="text-sm font-medium text-foreground">
                            Fecha recomendada: {new Date((event as any).dueDate).toLocaleDateString('es-ES')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Edad recomendada: {(event as any).recommendedAge}
                          </p>
                        </div>
                      )}
                    </div>
                    <Badge 
                      variant={
                        event.type === 'applied' 
                          ? 'secondary' 
                          : (event as any).importance === 'high' 
                          ? 'destructive' 
                          : 'secondary'
                      }
                      className="flex-shrink-0"
                    >
                      {event.type === 'applied' ? 'Aplicada' : `En ${(event as any).daysUntil}d`}
                    </Badge>
                  </div>

                  {event.type === 'upcoming' && (event as any).importance === 'high' && (
                    <div className="mt-3 p-2 rounded bg-red-500/5 border border-red-200 text-xs text-red-700">
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      Vacuna obligatoria - Programa tu cita pronto
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
