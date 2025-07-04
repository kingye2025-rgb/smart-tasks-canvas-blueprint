
import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'primary' | 'success' | 'warning' | 'info';
  gradient?: boolean;
}

const StatsCard = ({ title, value, subtitle, icon: Icon, color, gradient }: StatsCardProps) => {
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    info: 'text-info bg-info/10',
  };

  return (
    <Card className={`${gradient ? 'gradient-bg text-white' : ''} card-hover relative overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className={`text-sm font-medium ${gradient ? 'text-white/80' : 'text-muted-foreground'}`}>
              {title}
            </p>
            <p className={`text-2xl font-bold mt-1 ${gradient ? 'text-white' : 'text-foreground'}`}>
              {value}
            </p>
            {subtitle && (
              <p className={`text-xs mt-1 ${gradient ? 'text-white/70' : 'text-muted-foreground'}`}>
                {subtitle}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${gradient ? 'bg-white/20' : colorClasses[color]}`}>
            <Icon size={24} className={gradient ? 'text-white' : ''} />
          </div>
        </div>
      </div>
      {gradient && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      )}
    </Card>
  );
};

export default StatsCard;
