
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Target, Timer, BarChart3, Globe, ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CheckCircle2,
      title: 'إدارة المهام الذكية',
      description: 'نظم مهامك وحقق أهدافك بكفاءة عالية'
    },
    {
      icon: Target,
      title: 'تتبع العادات',
      description: 'ابن عادات إيجابية واحتفظ بها'
    },
    {
      icon: Timer,
      title: 'جلسات التركيز',
      description: 'تقنية البومودورو لتركيز أفضل'
    },
    {
      icon: BarChart3,
      title: 'تحليلات متقدمة',
      description: 'راقب تقدمك وحسن أداءك'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Smart Tasks+</h1>
          <p className="text-muted-foreground">مرحباً بك في عالم الإنتاجية الذكية</p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/login')}
            className="w-full gradient-bg text-white"
            size="lg"
          >
            تسجيل الدخول
            <ArrowRight size={20} className="mr-2" />
          </Button>
          
          <Button 
            onClick={() => navigate('/signup')}
            variant="outline"
            className="w-full"
            size="lg"
          >
            إنشاء حساب جديد
          </Button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Globe size={16} className="text-muted-foreground" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/language')}
              className="text-muted-foreground hover:text-foreground"
            >
              تغيير اللغة
            </Button>
          </div>
        </div>

        {/* Quick Start */}
        <div className="text-center pt-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/tasks')}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            تجربة سريعة بدون حساب ←
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
