import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Heart, Users, BookOpen, MessageCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'huellito',
      name: 'Plan Huellito',
      subtitle: 'Pet Grooming Services',
      price: 0,
      period: 'por mes',
      color: 'bg-slate-50',
      buttonColor: 'bg-slate-600 hover:bg-slate-700',
      features: [
        '10 consultas en WaggiBot',
        '1 evaluación en UW',
        'Registro 2 mascotas y recibe consejos prácticos',
        'Acceso a todos los blogs informativos',
        'Acceso a todas las comunidades de Waggi'
      ]
    },
    {
      id: 'bigotes',
      name: 'Plan Bigotes',
      subtitle: 'Pet Grooming Services',
      price: 28700,
      period: 'por mes',
      annualPrice: 287000,
      color: 'bg-amber-50',
      buttonColor: 'bg-teal-600 hover:bg-teal-700',
      popular: true,
      features: [
        '10 consultas en WaggiBot / Día',
        '10 evaluación en UW',
        'Registro todos tus mascotas y recibe consejos prácticos',
        'Acceso a 1 clase en UW',
        'Acceso a todos los blogs informativos',
        'Acceso a todas las comunidades de Waggi'
      ]
    },
    {
      id: 'colita',
      name: 'Plan Colita Feliz',
      subtitle: 'Pet Grooming Services',
      price: 61500,
      period: 'por mes',
      annualPrice: 615000,
      color: 'bg-slate-50',
      buttonColor: 'bg-slate-600 hover:bg-slate-700',
      features: [
        '25 consultas en WaggiBot / Día',
        'Evaluación ilimitadas en UW',
        'Registro todos tus mascotas y recibe consejos prácticos',
        'Acceso completo a UW',
        'Acceso a todos los blogs informativos',
        'Acceso a todas las comunidades de Waggi'
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleSelectPlan = (planId: string) => {
    navigate(`/checkout?plan=${planId}`);
  };

  const handleGoToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-teal-600" />
            <h1 className="text-4xl font-bold text-gray-900">Waggi</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Cuida a tu mascota con nuestros planes de grooming y servicios veterinarios especializados
          </p>
          
          {/* Chat Bot Button */}
          <Button 
            onClick={handleGoToChat}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg mb-8"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Consulta con WaggiBot
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Cuidado especializado</h3>
            <p className="text-gray-600">Servicios de grooming profesional para tu mascota</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comunidad</h3>
            <p className="text-gray-600">Conecta con otros dueños de mascotas</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Educación</h3>
            <p className="text-gray-600">Aprende sobre el cuidado de tu mascota</p>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Elige el plan perfecto para tu mascota
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Desde consultas básicas hasta cuidado completo, tenemos el plan ideal para cada necesidad
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`${plan.color} border-2 ${plan.popular ? 'border-teal-300 shadow-lg scale-105' : 'border-gray-200'} relative overflow-hidden transition-transform hover:scale-105`}
            >
              {plan.popular && (
                <Badge className="absolute top-4 right-4 bg-teal-600 text-white">
                  Más Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <p className="text-gray-600">{plan.subtitle}</p>
              </CardHeader>

              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-teal-600 mb-1">
                    {plan.price === 0 ? '$0' : formatPrice(plan.price)}
                  </div>
                  <div className="text-gray-600">{plan.period}</div>
                  {plan.annualPrice && (
                    <div className="text-sm text-gray-500 mt-1">
                      {formatPrice(plan.annualPrice)} / pago anual
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full mb-6 ${plan.buttonColor} text-white font-semibold py-3 rounded-lg transition-colors`}
                >
                  {plan.price === 0 ? 'Comenzar Gratis' : 'Book Now'}
                </Button>

                <div className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 Waggi. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
