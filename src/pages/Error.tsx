
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, RefreshCw, ArrowLeft, CreditCard, AlertTriangle } from 'lucide-react';

const Error = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorType = searchParams.get('type') || 'payment';

  const getErrorContent = () => {
    switch (errorType) {
      case 'cancelled':
        return {
          icon: <X className="w-8 h-8 text-orange-600" />,
          bgColor: 'bg-orange-100',
          title: 'Pago Cancelado',
          description: 'Has cancelado el proceso de pago',
          message: 'No te preocupes, puedes intentar nuevamente cuando quieras.'
        };
      case 'expired':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
          bgColor: 'bg-yellow-100',
          title: 'Sesión Expirada',
          description: 'Tu sesión de pago ha expirado',
          message: 'Por seguridad, las sesiones de pago expiran después de un tiempo.'
        };
      default:
        return {
          icon: <X className="w-8 h-8 text-red-600" />,
          bgColor: 'bg-red-100',
          title: 'Error en el Pago',
          description: 'Hubo un problema procesando tu pago',
          message: 'Por favor, verifica tus datos de pago e intenta nuevamente.'
        };
    }
  };

  const errorContent = getErrorContent();

  const handleRetry = () => {
    const plan = searchParams.get('plan') || 'huellito';
    navigate(`/checkout?plan=${plan}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className={`mx-auto w-16 h-16 ${errorContent.bgColor} rounded-full flex items-center justify-center mb-4`}>
            {errorContent.icon}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {errorContent.title}
          </CardTitle>
          <p className="text-gray-600">{errorContent.description}</p>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {errorContent.message}
            </AlertDescription>
          </Alert>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Posibles causas:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• Fondos insuficientes en la tarjeta</li>
              <li>• Datos de tarjeta incorrectos</li>
              <li>• Problemas de conexión</li>
              <li>• Tarjeta bloqueada por el banco</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleRetry}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar Nuevamente
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Planes
            </Button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <p className="mb-1">¿Sigues teniendo problemas?</p>
            <p>Contáctanos en <span className="font-semibold">soporte@waggi.com</span></p>
            <p>o llama al <span className="font-semibold">+57 (1) 234-5678</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Error;
