
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Timer,
  CheckSquare,
  Award,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Stats = () => {
  const weeklyData = [
    { day: 'الأحد', tasks: 5, habits: 4, focus: 2.5 },
    { day: 'الإثنين', tasks: 8, habits: 5, focus: 3.2 },
    { day: 'الثلاثاء', tasks: 6, habits: 4, focus: 4.1 },
    { day: 'الأربعاء', tasks: 7, habits: 6, focus: 2.8 },
    { day: 'الخميس', tasks: 9, habits: 5, focus: 3.5 },
    { day: 'الجمعة', tasks: 4, habits: 3, focus: 1.8 },
    { day: 'السبت', tasks: 3, habits: 4, focus: 2.2 },
  ];

  const achievements = [
    { id: 1, title: 'محارب الإنتاجية', description: 'أكمل 100 مهمة', earned: true, icon: '🏆' },
    { id: 2, title: 'سيد العادات', description: 'حافظ على سلسلة 30 يوم', earned: true, icon: '🔥' },
    { id: 3, title: 'خبير التركيز', description: 'اقض 50 ساعة في وضع التركيز', earned: false, icon: '🧠' },
    { id: 4, title: 'المنظم المثالي', description: 'رتب 10 مشاريع', earned: true, icon: '📋' },
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">الإحصائيات والتحليلات</h1>
          <p className="text-muted-foreground mt-1">تتبع تقدمك وحلل أداءك</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 gradient-bg text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <CheckSquare size={24} />
                <Badge variant="secondary" className="bg-white/20 text-white">هذا الأسبوع</Badge>
              </div>
              <div className="text-2xl font-bold">42</div>
              <div className="text-white/80 text-sm">مهمة مكتملة</div>
              <div className="text-white/60 text-xs mt-1">+18% من الأسبوع الماضي</div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-4 translate-x-4" />
          </Card>

          <Card className="p-4 bg-success text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <Target size={24} />
                <Badge variant="secondary" className="bg-white/20 text-white">العادات</Badge>
              </div>
              <div className="text-2xl font-bold">89%</div>
              <div className="text-white/80 text-sm">معدل الإنجاز</div>
              <div className="text-white/60 text-xs mt-1">6 من 7 عادات يومية</div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-4 translate-x-4" />
          </Card>

          <Card className="p-4 bg-warning text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <Timer size={24} />
                <Badge variant="secondary" className="bg-white/20 text-white">التركيز</Badge>
              </div>
              <div className="text-2xl font-bold">18.2</div>
              <div className="text-white/80 text-sm">ساعة هذا الأسبوع</div>
              <div className="text-white/60 text-xs mt-1">متوسط 2.6 ساعة/يوم</div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-4 translate-x-4" />
          </Card>

          <Card className="p-4 bg-info text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp size={24} />
                <Badge variant="secondary" className="bg-white/20 text-white">الإنتاجية</Badge>
              </div>
              <div className="text-2xl font-bold">92%</div>
              <div className="text-white/80 text-sm">نقاط الإنتاجية</div>
              <div className="text-white/60 text-xs mt-1">أداء ممتاز!</div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-4 translate-x-4" />
          </Card>
        </div>

        {/* Weekly Progress Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">الأداء الأسبوعي</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BarChart3 size={16} className="ml-2" />
                أعمدة
              </Button>
              <Button variant="outline" size="sm">
                <PieChart size={16} className="ml-2" />
                دائري
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{day.day}</span>
                  <span className="text-muted-foreground">
                    {day.tasks} مهام • {day.habits} عادات • {day.focus}س تركيز
                  </span>
                </div>
                
                <div className="flex gap-1 h-6">
                  <div 
                    className="bg-primary rounded-sm"
                    style={{ width: `${(day.tasks / 10) * 100}%` }}
                    title={`${day.tasks} مهام`}
                  />
                  <div 
                    className="bg-success rounded-sm"
                    style={{ width: `${(day.habits / 6) * 100}%` }}
                    title={`${day.habits} عادات`}
                  />
                  <div 
                    className="bg-warning rounded-sm"
                    style={{ width: `${(day.focus / 5) * 100}%` }}
                    title={`${day.focus} ساعات تركيز`}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span>المهام</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span>العادات</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span>التركيز</span>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">الإنجازات</h3>
            <Badge variant="secondary">
              <Award size={12} className="ml-1" />
              {achievements.filter(a => a.earned).length}/{achievements.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  achievement.earned 
                    ? 'bg-accent/50 border-primary/20' 
                    : 'bg-muted/30 border-muted-foreground/20'
                }`}
              >
                <div className="text-2xl">
                  {achievement.earned ? achievement.icon : '🔒'}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned ? (
                  <Badge variant="default" className="bg-success text-white">
                    مكتمل
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    قيد التقدم
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Time Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">تحليل الوقت</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="text-primary" size={20} />
                <div>
                  <div className="font-medium">أكثر الأوقات إنتاجية</div>
                  <div className="text-sm text-muted-foreground">10:00 ص - 12:00 م</div>
                </div>
              </div>
              <div className="text-primary font-bold">85%</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="text-success" size={20} />
                <div>
                  <div className="font-medium">أفضل يوم في الأسبوع</div>
                  <div className="text-sm text-muted-foreground">الثلاثاء</div>
                </div>
              </div>
              <div className="text-success font-bold">92%</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Timer className="text-warning" size={20} />
                <div>
                  <div className="font-medium">متوسط فترة التركيز</div>
                  <div className="text-sm text-muted-foreground">24 دقيقة</div>
                </div>
              </div>
              <div className="text-warning font-bold">+8%</div>
            </div>
          </div>
        </Card>

        {/* Export Data */}
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">تصدير البيانات</h3>
          <p className="text-muted-foreground text-sm mb-4">احصل على تقرير مفصل عن أدائك</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline">
              تقرير أسبوعي
            </Button>
            <Button variant="outline">
              تقرير شهري
            </Button>
            <Button>
              تصدير PDF
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Stats;
