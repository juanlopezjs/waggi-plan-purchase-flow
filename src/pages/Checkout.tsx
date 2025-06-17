
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Check, CreditCard, User, Heart, Calendar } from 'lucide-react';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planType = searchParams.get('plan') || 'huellito';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petBreed: '',
    address: ''
  });

  const plans = {
    huellito: {
      name: 'Plan Huellito',
      price: 0,
      period: 'por mes',
      annualPrice: 0,
      color: 'bg-slate-50',
      features: [
        '10 consultas en WaggiBot',
        '1 evaluación en UW',
        'Registro 2 mascotas y recibe consejos prácticos',
        'Acceso a todos los blogs informativos',
        'Acceso a todas las comunidades de Waggi'
      ]
    },
    bigotes: {
      name: 'Plan Bigotes',
      price: 28700,
      period: 'por mes',
      annualPrice: 287000,
      color: 'bg-amber-50',
      features: [
        '10 consultas en WaggiBot / Día',
        '10 evaluación en UW',
        'Registro todos tus mascotas y recibe consejos prácticos',
        'Acceso a 1 clase en UW',
        'Acceso a todos los blogs informativos',
        'Acceso a todas las comunidades de Waggi'
      ]
    },
    colita: {
      name: 'Plan Colita Feliz',
      price: 61500,
      period: 'por mes',
      annualPrice: 615000,
      color: 'bg-slate-50',
      features: [
        '25 consultas en WaggiBot / Día',
        'Evaluación ilimitadas en UW',
        'Registro todos tus mascotas y recibe consejos prácticos',
        'Acceso completo a UW',
        'Acceso a todos los blogs informativos',
        'Acceso a todas las comunidades de Waggi'
      ]
    }
  };

  const selectedPlan = plans[planType as keyof typeof plans];

  const getCurrentPrice = () => {
    if (selectedPlan.price === 0) return 0;
    return billingCycle === 'monthly' ? selectedPlan.price : selectedPlan.annualPrice;
  };

  const getAnnualDiscount = () => {
    if (selectedPlan.price === 0) return 0;
    const monthlyYearly = selectedPlan.price * 12;
    const annualPrice = selectedPlan.annualPrice;
    return monthlyYearly - annualPrice;
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Procesando compra:', { 
      plan: selectedPlan, 
      billingCycle, 
      finalPrice: getCurrentPrice(),
      customer: customerInfo 
    });
    alert('¡Compra exitosa! Bienvenido a Waggi');
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-teal-700 hover:bg-teal-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a planes
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Confirma tu plan</h1>
            <p className="text-gray-600">Estás a un paso de cuidar mejor a tu mascota</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Summary */}
          <div className="lg:col-span-1">
            <Card className={`${selectedPlan.color} border-teal-200`}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">{selectedPlan.name}</CardTitle>
                <p className="text-gray-600">Pet Grooming Services</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Billing Cycle Selection */}
                {selectedPlan.price > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900">Ciclo de facturación</Label>
                    <RadioGroup value={billingCycle} onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annual')}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-white/50 transition-colors">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span>Mensual</span>
                            <span className="font-semibold">{formatPrice(selectedPlan.price)}</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-white/50 transition-colors">
                        <RadioGroupItem value="annual" id="annual" />
                        <Label htmlFor="annual" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <span>Anual</span>
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                  Ahorra {formatPrice(getAnnualDiscount())}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatPrice(selectedPlan.annualPrice / 12)}/mes
                              </div>
                            </div>
                            <span className="font-semibold">{formatPrice(selectedPlan.annualPrice)}</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">
                    {selectedPlan.price === 0 ? 'Gratis' : formatPrice(getCurrentPrice())}
                  </div>
                  <div className="text-gray-600">
                    {selectedPlan.price === 0 ? selectedPlan.period : (billingCycle === 'monthly' ? 'por mes' : 'por año')}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Incluye:</h4>
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-teal-600" />
                    Información personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+57 300 123 4567"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Tu dirección"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pet Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-teal-600" />
                    Información de tu mascota
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Nombre de tu mascota *</Label>
                    <Input
                      id="petName"
                      value={customerInfo.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      placeholder="Nombre de tu mascota"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="petBreed">Raza</Label>
                    <Input
                      id="petBreed"
                      value={customerInfo.petBreed}
                      onChange={(e) => handleInputChange('petBreed', e.target.value)}
                      placeholder="Raza de tu mascota"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              {selectedPlan.price > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-teal-600" />
                      Información de pago
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <p className="text-teal-800 text-sm">
                        🔒 Pago seguro procesado por Stripe. Tus datos están protegidos.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número de tarjeta *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nombre en la tarjeta *</Label>
                        <Input
                          id="cardName"
                          placeholder="Como aparece en tu tarjeta"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Fecha de vencimiento *</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {selectedPlan.name} ({billingCycle === 'monthly' ? 'Mensual' : 'Anual'})
                    </span>
                    <span className="font-semibold">
                      {selectedPlan.price === 0 ? 'Gratis' : formatPrice(getCurrentPrice())}
                    </span>
                  </div>
                  {billingCycle === 'annual' && selectedPlan.price > 0 && (
                    <div className="flex justify-between items-center text-sm text-green-600">
                      <span>Descuento anual</span>
                      <span>-{formatPrice(getAnnualDiscount())}</span>
                    </div>
                  )}
                  {selectedPlan.price > 0 && (
                    <>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>IVA (19%)</span>
                        <span>{formatPrice(getCurrentPrice() * 0.19)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-teal-600">
                          {formatPrice(getCurrentPrice() * 1.19)}
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-lg font-semibold rounded-lg transition-colors"
              >
                {selectedPlan.price === 0 ? 'Activar plan gratuito' : 'Completar compra'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Al continuar, aceptas nuestros términos y condiciones y política de privacidad
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
