import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import PlanSummary from '@/components/checkout/PlanSummary';
import CustomerForm from '@/components/checkout/CustomerForm';
import PetForm from '@/components/checkout/PetForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planType = searchParams.get('plan') || 'huellito';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petBreed: '',
    address: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
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

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const simulatePaymentProcessing = async () => {
    // Simular diferentes escenarios de pago
    const scenarios = [
      { success: true, probability: 0.7 }, // 70% éxito
      { success: false, error: 'payment', probability: 0.15 }, // 15% error de pago
      { success: false, error: 'cancelled', probability: 0.1 }, // 10% cancelado
      { success: false, error: 'expired', probability: 0.05 }, // 5% expirado
    ];

    const random = Math.random();
    let cumulative = 0;
    
    for (const scenario of scenarios) {
      cumulative += scenario.probability;
      if (random <= cumulative) {
        // Simular tiempo de procesamiento
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        return scenario;
      }
    }
    
    return scenarios[0]; // fallback a éxito
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    console.log('Procesando compra:', { 
      plan: selectedPlan, 
      billingCycle, 
      finalPrice: getCurrentPrice(),
      customer: customerInfo,
      payment: paymentInfo
    });

    try {
      // Para plan gratuito, siempre es exitoso
      if (selectedPlan.price === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/success');
        return;
      }

      // Simular procesamiento de pago
      const result = await simulatePaymentProcessing();
      
      if (result.success) {
        navigate('/success');
      } else {
        const errorType = result.error || 'payment';
        navigate(`/error?type=${errorType}&plan=${planType}`);
      }
    } catch (error) {
      console.error('Error procesando pago:', error);
      navigate(`/error?type=payment&plan=${planType}`);
    } finally {
      setIsProcessing(false);
    }
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
        <CheckoutHeader 
          onBack={() => navigate('/')} 
          isProcessing={isProcessing} 
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PlanSummary
              selectedPlan={selectedPlan}
              billingCycle={billingCycle}
              onBillingCycleChange={(value) => setBillingCycle(value as 'monthly' | 'annual')}
              formatPrice={formatPrice}
            />
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <CustomerForm
                customerInfo={customerInfo}
                onInputChange={handleInputChange}
                isProcessing={isProcessing}
              />

              <PetForm
                petInfo={{ petName: customerInfo.petName, petBreed: customerInfo.petBreed }}
                onInputChange={handleInputChange}
                isProcessing={isProcessing}
              />

              <PaymentForm
                paymentInfo={paymentInfo}
                onPaymentChange={handlePaymentChange}
                isProcessing={isProcessing}
                showPayment={selectedPlan.price > 0}
              />

              <OrderSummary
                selectedPlan={selectedPlan}
                billingCycle={billingCycle}
                getCurrentPrice={getCurrentPrice}
                getAnnualDiscount={getAnnualDiscount}
                formatPrice={formatPrice}
              />

              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-lg font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Procesando pago...
                  </>
                ) : (
                  selectedPlan.price === 0 ? 'Activar plan gratuito' : 'Completar compra'
                )}
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
