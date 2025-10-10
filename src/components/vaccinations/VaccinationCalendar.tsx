import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Bell, AlertCircle } from 'lucide-react';

interface VaccinationCalendarProps {
  upcomingVaccines: Array<{
    id: number;
    name: string;
    dueDate: string;
    recommendedAge: string;
    importance: string;
    description: string;
    daysUntil: number;
  }>;
}

export const VaccinationCalendar: React.FC<VaccinationCalendarProps> = ({ upcomingVaccines }) => {
  // Group vaccines by urgency
  const urgent = upcomingVaccines.filter(v => v.daysUntil <= 7);
  const soon = upcomingVaccines.filter(v => v.daysUntil > 7 && v.daysUntil <= 30);
  const later = upcomingVaccines.filter(v => v.daysUntil > 30);

  return (
    <div className="space-y-6">
      {/* Urgent Vaccines */}
      {urgent.length > 0 && (
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <CardTitle className="text-red-900">Urgentes (Próximos 7 días)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgent.map((vaccine) => (
              <div key={vaccine.id} className="p-4 rounded-lg bg-white border border-red-200">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{vaccine.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{vaccine.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>📅 {new Date(vaccine.dueDate).toLocaleDateString('es-ES')}</span>
                      <span>⏰ En {vaccine.daysUntil} días</span>
                    </div>
                  </div>
                  <Badge variant="destructive">{vaccine.daysUntil}d</Badge>
                </div>
                <Button size="sm" className="w-full mt-3 bg-red-600 hover:bg-red-700">
                  <Calendar className="w-3 h-3 mr-2" />
                  Agendar Ahora
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Soon Vaccines */}
      {soon.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-amber-900">Próximamente (7-30 días)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {soon.map((vaccine) => (
              <div key={vaccine.id} className="p-4 rounded-lg bg-white border border-amber-200">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{vaccine.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{vaccine.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>📅 {new Date(vaccine.dueDate).toLocaleDateString('es-ES')}</span>
                      <span>⏰ En {vaccine.daysUntil} días</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                    {vaccine.daysUntil}d
                  </Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  <Bell className="w-3 h-3 mr-2" />
                  Recordarme 3 días antes
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Later Vaccines */}
      {later.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <CardTitle>Más Adelante (30+ días)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {later.map((vaccine) => (
              <div key={vaccine.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{vaccine.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{vaccine.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>📅 {new Date(vaccine.dueDate).toLocaleDateString('es-ES')}</span>
                      <span>⏰ En {vaccine.daysUntil} días</span>
                      <span>🎂 {vaccine.recommendedAge}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{vaccine.daysUntil}d</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {upcomingVaccines.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No hay vacunas programadas</h3>
            <p className="text-sm text-muted-foreground">
              Todas las vacunas están al día
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
