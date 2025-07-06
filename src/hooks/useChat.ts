
import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface PlanLimits {
  dailyQuestions: number;
  questionsUsed: number;
  planName: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '¡Hola! Soy WaggiBot, tu asistente virtual para el cuidado de mascotas. ¿En qué puedo ayudarte hoy?',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [planLimits, setPlanLimits] = useState<PlanLimits>({
    dailyQuestions: 10,
    questionsUsed: 3,
    planName: 'Plan Huellito'
  });

  const sendMessage = useCallback(async (content: string) => {
    if (planLimits.questionsUsed >= planLimits.dailyQuestions) {
      return false; // No se puede enviar más mensajes
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setPlanLimits(prev => ({
        ...prev,
        questionsUsed: prev.questionsUsed + 1
      }));
      setIsLoading(false);
    }, 1500);

    return true;
  }, [planLimits]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      'Para el cuidado de tu mascota, te recomiendo mantener una rutina de ejercicio regular y una alimentación balanceada.',
      'Es importante llevar a tu mascota al veterinario regularmente para chequeos preventivos.',
      'El cepillado regular ayuda a mantener el pelaje de tu mascota saludable y reduce la caída de pelo.',
      'Asegúrate de que tu mascota tenga acceso constante a agua fresca y limpia.',
      'La socialización temprana es clave para el desarrollo saludable de tu mascota.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return {
    messages,
    isLoading,
    planLimits,
    sendMessage,
  };
};
