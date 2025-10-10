import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QrCode, Download, Share2 } from 'lucide-react';

interface VaccinationCardProps {
  pet: {
    name: string;
    type: string;
    breed: string;
    birthDate: string;
    avatar: string;
  };
  appliedVaccines: Array<{
    name: string;
    date: string;
    veterinarian: string;
    clinic: string;
    lot: string;
  }>;
}

export const VaccinationCard: React.FC<VaccinationCardProps> = ({ pet, appliedVaccines }) => {
  return (
    <div className="space-y-4">
      {/* Digital Vaccination Card */}
      <Card className="overflow-hidden border-2 border-vaccination-primary/20 shadow-lg">
        <div className="bg-gradient-to-r from-vaccination-primary to-vaccination-secondary p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Carnet de Vacunación</h2>
              <p className="text-sm opacity-90">Certificado Digital Waggi</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <QrCode className="w-12 h-12 text-vaccination-primary" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white/30">
              <img src={pet.avatar} alt={pet.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{pet.name}</h3>
              <p className="text-sm opacity-90">{pet.breed}</p>
              <p className="text-xs opacity-75 mt-1">Nacimiento: {new Date(pet.birthDate).toLocaleDateString('es-ES')}</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm text-muted-foreground">VACUNAS APLICADAS</h4>
              <Badge variant="secondary" className="bg-green-500/10 text-green-700 border-green-200">
                {appliedVaccines.length} Registradas
              </Badge>
            </div>

            {appliedVaccines.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No hay vacunas registradas aún
              </div>
            ) : (
              <div className="space-y-3">
                {appliedVaccines.map((vaccine, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold text-foreground">{vaccine.name}</h5>
                          <Badge variant="outline" className="text-xs">
                            Lote: {vaccine.lot}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Fecha:</span> {new Date(vaccine.date).toLocaleDateString('es-ES')}
                          </div>
                          <div>
                            <span className="font-medium">Veterinario:</span> {vaccine.veterinarian}
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">Clínica:</span> {vaccine.clinic}
                          </div>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-lg">✓</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Verification Footer */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>
                  <p className="font-medium">Certificado ID:</p>
                  <p className="font-mono">WAG-{pet.name.toUpperCase()}-{Date.now().toString().slice(-6)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Emitido:</p>
                  <p>{new Date().toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Button variant="outline" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Descargar PDF
        </Button>
        <Button variant="outline" className="w-full">
          <Share2 className="w-4 h-4 mr-2" />
          Compartir Carnet
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">
            <strong>Nota:</strong> Este carnet digital puede ser presentado en cualquier clínica veterinaria. 
            Mantén el código QR visible para verificación rápida.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
