
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Heart, ArrowLeft, Download } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            ¡Compra Exitosa!
          </CardTitle>
          <p className="text-gray-600">Tu plan ha sido activado correctamente</p>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <Heart className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <h3 className="font-semibold text-teal-800 mb-1">
              ¡Bienvenido a Waggi!
            </h3>
            <p className="text-sm text-teal-700">
              Tu mascota ahora tiene acceso a todos los beneficios de tu plan
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Confirmación enviada a tu email</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Plan activado inmediatamente</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Acceso completo a tu dashboard</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3"
            >
              <Heart className="w-4 h-4 mr-2" />
              Ir a mi Dashboard
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.print()}
              className="w-full border-teal-300 text-teal-700 hover:bg-teal-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar Factura
            </Button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <p className="mb-1">¿Necesitas ayuda?</p>
            <p>Contáctanos en <span className="font-semibold">soporte@waggi.com</span></p>
            <p className="mt-2">Serás redirigido automáticamente en unos segundos...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
