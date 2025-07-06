
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<boolean>;
  isLoading: boolean;
  canSendMessage: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, canSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading || !canSendMessage) return;

    const success = await onSendMessage(message.trim());
    if (success) {
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            canSendMessage 
              ? "Escribe tu pregunta sobre el cuidado de tu mascota..." 
              : "Has alcanzado el límite de consultas diarias"
          }
          disabled={isLoading || !canSendMessage}
          className="min-h-[44px] max-h-32 resize-none"
          rows={1}
        />
      </div>
      <Button
        type="submit"
        disabled={!message.trim() || isLoading || !canSendMessage}
        className="bg-teal-600 hover:bg-teal-700 h-11 px-4"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
