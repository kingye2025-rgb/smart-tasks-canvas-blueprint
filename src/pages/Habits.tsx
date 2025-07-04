
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Calendar,
  Flame,
  CheckCircle2,
  Circle,
  BarChart3
} from 'lucide-react';

const Habits = () => {
  const habits = [
    {
      id: 1,
      name: 'قراءة 30 دقيقة يومياً',
      streak: 15,
      target: 30,
      completed: 22,
      category: 'تطوير شخصي',
      color: 'bg-blue-500',
      todayComplete: true
    },
    {
      id: 2,
      name: 'ممارسة الرياضة',
      streak: 8,
      target: 21,
      completed: 12,
      category: 'صحة',
      color: 'bg-green-500',
      todayComplete: false
    },
    {
      id: 3,
      name: 'شرب 8 أكواب ماء',
      streak: 12,
      target: 30,
      completed: 28,
      category: 'صحة',
      color: 'bg-cyan-500',
      todayComplete: true
    },
    {
      id: 4,
      name: 'تعلم لغة جديدة',
      streak: 5,
      target: 30,
      completed: 18,
      category: 'تعليم',
      color: 'bg-purple-500',
      todayComplete: false
    },
  ];

  const weekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const today = new Date().getDay();

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">تتبع العادات</h1>
          <p className="text-muted-foreground mt-1">اجعل العادات الإيجابية جزءاً من يومك</p>
        </div>

        {/* Today's Progress */}
        <Card className="gradient-bg text-white p-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-xl font-semibold mb-2">تقدم اليوم</h2>
              <p className="text-white/80">
                {habits.filter(h => h.todayComplete).length} من {habits.length} عادات
              </p>
              <div className="mt-3">
                <Progress 
                  value={(habits.filter(h => h.todayComplete).length / habits.length) * 100} 
                  className="bg-white/20"
                />
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Target size={28} className="text-white" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        </Card>

        {/* Weekly Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">نظرة أسبوعية</h3>
            <Button variant="outline" size="sm">
              <BarChart3 size={16} className="ml-2" />
              التفاصيل
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-2">{day}</div>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                  index === today 
                    ? 'bg-primary text-primary-foreground' 
                    : index < today 
                    ? 'bg-success text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index === today ? (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  ) : index < today ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Circle size={14} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Habits Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500 mb-1">
              {Math.max(...habits.map(h => h.streak))}
            </div>
            <div className="text-sm text-muted-foreground">أطول سلسلة</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {habits.filter(h => h.todayComplete).length}
            </div>
            <div className="text-sm text-muted-foreground">مكتملة اليوم</div>
          </Card>
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          {habits.map((habit) => (
            <Card key={habit.id} className="p-4 card-hover">
              <div className="flex items-center gap-4">
                <button className="flex-shrink-0">
                  {habit.todayComplete ? (
                    <CheckCircle2 size={24} className="text-success" />
                  ) : (
                    <Circle size={24} className="text-muted-foreground hover:text-primary" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{habit.name}</h3>
                    <div className="flex items-center gap-1 text-orange-500">
                      <Flame size={16} />
                      <span className="text-sm font-bold">{habit.streak}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">التقدم الشهري</span>
                      <span className="text-foreground">{habit.completed}/{habit.target}</span>
                    </div>
                    <Progress value={(habit.completed / habit.target) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="secondary" className="text-xs">
                      {habit.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {habit.todayComplete ? 'مكتملة اليوم' : 'لم تكتمل بعد'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Habit Button */}
        <div className="fixed bottom-24 left-6 z-40">
          <Button size="lg" className="rounded-full gradient-bg shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus size={24} />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Habits;
