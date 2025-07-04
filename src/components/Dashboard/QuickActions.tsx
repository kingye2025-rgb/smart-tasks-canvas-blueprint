
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Target, Timer, TrendingUp } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { label: 'مهمة جديدة', icon: Plus, color: 'bg-primary' },
    { label: 'عادة جديدة', icon: Target, color: 'bg-success' },
    { label: 'جلسة تركيز', icon: Timer, color: 'bg-warning' },
    { label: 'مراجعة أسبوعية', icon: TrendingUp, color: 'bg-info' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent/50 transition-all duration-200"
            >
              <div className={`p-2 rounded-full ${action.color} text-white`}>
                <Icon size={16} />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;
