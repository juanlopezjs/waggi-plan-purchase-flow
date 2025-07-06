
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Crown, ArrowUpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PlanLimits as PlanLimitsType } from '@/hooks/useChat';

interface PlanLimitsProps {
  planLimits: PlanLimitsType;
}

const PlanLimits: React.FC<PlanLimitsProps> = ({ planLimits }) => {
  const navigate = useNavigate();
  const percentage = (planLimits.questionsUsed / planLimits.dailyQuestions) * 100;
  const remaining = planLimits.dailyQuestions - planLimits.questionsUsed;

  const handleUpgrade = () => {
    navigate('/');
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-sm">{planLimits.planName}</span>
          </div>
          {remaining === 0 && (
            <Button
              size="sm"
              onClick={handleUpgrade}
              className="bg-teal-600 hover:bg-teal-700 text-xs h-7"
            >
              <ArrowUpCircle className="w-3 h-3 mr-1" />
              Mejorar Plan
            </Button>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Consultas diarias</span>
            <span className="font-medium">
              {planLimits.questionsUsed}/{planLimits.dailyQuestions}
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-gray-500">
            {remaining > 0 
              ? `Te quedan ${remaining} consultas hoy`
              : 'Has alcanzado el límite diario. Mejora tu plan para más consultas.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanLimits;
