import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Sparkles, Heart, Star, Crown, Bone } from 'lucide-react';
import { toast } from 'sonner';

interface VirtualGift {
  id: string;
  name: string;
  icon: typeof Gift;
  cost: number;
  senderPoints: number;
  receiverPoints: number;
  color: string;
  bgColor: string;
}

interface SendGiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName: string;
  recipientType: 'member' | 'pet';
  onGiftSent: (gift: VirtualGift) => void;
}

const virtualGifts: VirtualGift[] = [
  {
    id: 'heart',
    name: 'Corazón de Amor',
    icon: Heart,
    cost: 0,
    senderPoints: 5,
    receiverPoints: 10,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50'
  },
  {
    id: 'star',
    name: 'Estrella Brillante',
    icon: Star,
    cost: 1000,
    senderPoints: 15,
    receiverPoints: 25,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  },
  {
    id: 'bone',
    name: 'Hueso Dorado',
    icon: Bone,
    cost: 2500,
    senderPoints: 25,
    receiverPoints: 40,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'crown',
    name: 'Corona Imperial',
    icon: Crown,
    cost: 5000,
    senderPoints: 50,
    receiverPoints: 75,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'sparkles',
    name: 'Regalo Premium',
    icon: Sparkles,
    cost: 10000,
    senderPoints: 100,
    receiverPoints: 150,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  }
];

export const SendGiftDialog: React.FC<SendGiftDialogProps> = ({
  open,
  onOpenChange,
  recipientName,
  recipientType,
  onGiftSent
}) => {
  const [selectedGift, setSelectedGift] = useState<VirtualGift | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSendGift = async () => {
    if (!selectedGift) return;

    setIsSending(true);
    
    // Simular envío del regalo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onGiftSent(selectedGift);
    
    toast.success(
      `¡Regalo enviado! 🎁`,
      {
        description: `Has ganado ${selectedGift.senderPoints} puntos. ${recipientName} recibirá ${selectedGift.receiverPoints} puntos.`
      }
    );
    
    setIsSending(false);
    setSelectedGift(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-pack-primary" />
            Enviar Regalo a {recipientName}
          </DialogTitle>
          <DialogDescription>
            Selecciona un regalo virtual para celebrar el cumpleaños de {recipientName}.
            Ambos ganarán puntos que pueden redimir en descuentos.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {virtualGifts.map((gift) => {
            const IconComponent = gift.icon;
            const isSelected = selectedGift?.id === gift.id;

            return (
              <button
                key={gift.id}
                onClick={() => setSelectedGift(gift)}
                className={`w-full p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-pack-primary bg-pack-primary/5'
                    : 'border-gray-200 hover:border-pack-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full ${gift.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-6 h-6 ${gift.color}`} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-pack-foreground">
                        {gift.name}
                      </h4>
                      {gift.cost > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {gift.cost.toLocaleString('es-CO')} COP
                        </Badge>
                      )}
                      {gift.cost === 0 && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          Gratis
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-pack-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Tú ganas: <span className="font-semibold text-pack-primary">{gift.senderPoints} pts</span>
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        Recibe: <span className="font-semibold text-pack-accent">{gift.receiverPoints} pts</span>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1 bg-pack-primary hover:bg-pack-primary/90"
            onClick={handleSendGift}
            disabled={!selectedGift || isSending}
          >
            {isSending ? 'Enviando...' : `Enviar Regalo ${selectedGift ? '🎁' : ''}`}
          </Button>
        </div>

        <div className="bg-pack-muted/30 rounded-lg p-3 text-xs text-pack-muted-foreground">
          <p className="font-medium mb-1">💡 Acumula puntos y canjéalos por:</p>
          <ul className="space-y-0.5 ml-4 list-disc">
            <li>Descuentos en planes premium</li>
            <li>Acceso a contenido exclusivo</li>
            <li>Productos y servicios para tu mascota</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
