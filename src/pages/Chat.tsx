
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import PlanLimits from '@/components/chat/PlanLimits';

const Chat = () => {
  const navigate = useNavigate();
  const { messages, isLoading, planLimits, sendMessage } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const canSendMessage = planLimits.questionsUsed < planLimits.dailyQuestions;

  useEffect(() => {
    // Auto-scroll al final cuando lleguen nuevos mensajes
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="flex items-center gap-2 text-teal-700 hover:bg-teal-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WaggiBot</h1>
                <p className="text-sm text-gray-600">Tu asistente para el cuidado de mascotas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border min-h-[calc(100vh-200px)] flex flex-col">
          {/* Plan Limits */}
          <div className="p-4 border-b bg-gray-50/50">
            <PlanLimits planLimits={planLimits} />
          </div>

          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="bg-gray-100 rounded-lg rounded-bl-sm px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t bg-gray-50/50">
            <ChatInput
              onSendMessage={sendMessage}
              isLoading={isLoading}
              canSendMessage={canSendMessage}
            />
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white/60 rounded-full px-4 py-2">
            <MessageCircle className="w-4 h-4" />
            Pregunta sobre alimentación, cuidados, comportamiento y salud de tu mascota
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
