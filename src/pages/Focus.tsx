
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Coffee,
  Brain,
  Target,
  Users
} from 'lucide-react';

const Focus = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [completedSessions, setCompletedSessions] = useState(2);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Switch between work and break
      if (sessionType === 'work') {
        setSessionType('break');
        setTimeLeft(5 * 60); // 5 minute break
        setCompletedSessions(prev => prev + 1);
      } else {
        setSessionType('work');
        setTimeLeft(25 * 60); // 25 minute work session
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, sessionType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(sessionType === 'work' ? 25 * 60 : 5 * 60);
  };

  const focusRooms = [
    { id: 1, name: 'غرفة الدراسة', participants: 12, topic: 'التحضير للامتحانات' },
    { id: 2, name: 'مطورو البرمجيات', participants: 8, topic: 'برمجة المشاريع' },
    { id: 3, name: 'الكتابة الإبداعية', participants: 5, topic: 'كتابة المقالات' },
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">وضع التركيز</h1>
          <p className="text-muted-foreground mt-1">حقق أقصى إنتاجية مع تقنية البومودورو</p>
        </div>

        {/* Current Session */}
        <Card className={`p-8 text-center relative overflow-hidden ${
          sessionType === 'work' 
            ? 'gradient-bg text-white' 
            : 'bg-success text-white'
        }`}>
          <div className="relative z-10">
            <div className="mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {sessionType === 'work' ? 'جلسة عمل' : 'استراحة'}
              </Badge>
            </div>
            
            <div className="text-6xl font-bold mb-6">
              {formatTime(timeLeft)}
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                onClick={toggleTimer}
                size="lg"
                variant="secondary"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                {isActive ? (
                  <>
                    <Pause size={20} className="ml-2" />
                    إيقاف
                  </>
                ) : (
                  <>
                    <Play size={20} className="ml-2" />
                    بدء
                  </>
                )}
              </Button>
              
              <Button
                onClick={resetTimer}
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <RotateCcw size={20} className="ml-2" />
                إعادة تعيين
              </Button>
            </div>

            <div className="text-white/80">
              الجلسات المكتملة: {completedSessions}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        </Card>

        {/* Today's Progress */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <Timer className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{completedSessions}</div>
            <div className="text-sm text-muted-foreground">جلسات اليوم</div>
          </Card>
          
          <Card className="p-4 text-center">
            <Brain className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">3.2</div>
            <div className="text-sm text-muted-foreground">ساعات التركيز</div>
          </Card>
          
          <Card className="p-4 text-center">
            <Target className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">85%</div>
            <div className="text-sm text-muted-foreground">الهدف المحقق</div>
          </Card>
        </div>

        {/* Focus Settings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">إعدادات الجلسة</h3>
            <Button variant="outline" size="sm">
              <Settings size={16} className="ml-2" />
              تخصيص
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-primary/10 border-2 border-primary/20">
              <Timer className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-sm font-medium">جلسة العمل</div>
              <div className="text-lg font-bold text-primary">25 دقيقة</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-success/10 border-2 border-success/20">
              <Coffee className="w-6 h-6 text-success mx-auto mb-2" />
              <div className="text-sm font-medium">الاستراحة</div>
              <div className="text-lg font-bold text-success">5 دقائق</div>
            </div>
          </div>
        </Card>

        {/* Focus Rooms */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">غرف التركيز الجماعي</h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Users size={12} className="ml-1" />
              متاح
            </Badge>
          </div>
          
          <div className="space-y-3">
            {focusRooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div>
                  <h4 className="font-medium text-foreground">{room.name}</h4>
                  <p className="text-sm text-muted-foreground">{room.topic}</p>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-primary">{room.participants} مشارك</div>
                  <Button size="sm" variant="outline" className="mt-1">
                    انضمام
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Focus Stats */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">إحصائيات الأسبوع</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">إجمالي الساعات</span>
              <span className="font-bold text-foreground">18.5 ساعة</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">متوسط الجلسة</span>
              <span className="font-bold text-foreground">24 دقيقة</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">أفضل يوم</span>
              <span className="font-bold text-foreground">الثلاثاء (4.2 ساعة)</span>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Focus;
