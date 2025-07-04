
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import QuickActions from '@/components/Dashboard/QuickActions';
import RecentTasks from '@/components/Dashboard/RecentTasks';
import { CheckSquare, Target, Timer, TrendingUp, Calendar, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const currentHour = new Date().getHours();
  let greeting = 'مساء الخير';
  if (currentHour < 12) greeting = 'صباح الخير';
  else if (currentHour < 18) greeting = 'مساء الخير';
  else greeting = 'مساء الخير';

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-bg bg-clip-text text-transparent">
            Smart Tasks+
          </h1>
          <p className="text-muted-foreground mt-2">
            {greeting}، مرحباً بك في يوم إنتاجي جديد!
          </p>
        </div>

        {/* Today's Focus */}
        <Card className="gradient-bg text-white p-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-xl font-semibold mb-2">تركيز اليوم</h2>
              <p className="text-white/80">إنهاء 5 مهام مهمة</p>
              <p className="text-white/60 text-sm mt-1">التقدم: 2 من 5</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Star size={28} className="text-white" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title="المهام المكتملة"
            value="12"
            subtitle="من أصل 18"
            icon={CheckSquare}
            color="success"
          />
          <StatsCard
            title="العادات النشطة"
            value="6"
            subtitle="سلسلة 5 أيام"
            icon={Target}
            color="primary"
          />
          <StatsCard
            title="وقت التركيز"
            value="2.5"
            subtitle="ساعة اليوم"
            icon={Timer}
            color="warning"
          />
          <StatsCard
            title="الإنتاجية"
            value="85%"
            subtitle="+12% من الأمس"
            icon={TrendingUp}
            color="info"
          />
        </div>

        {/* Today's Schedule */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-primary" size={20} />
            <h3 className="text-lg font-semibold">جدول اليوم</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <div>
                <p className="font-medium">اجتماع الفريق</p>
                <p className="text-sm text-muted-foreground">10:00 - 11:00 ص</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg">
              <div className="w-2 h-8 bg-warning rounded-full" />
              <div>
                <p className="font-medium">جلسة تركيز</p>
                <p className="text-sm text-muted-foreground">2:00 - 3:30 م</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg">
              <div className="w-2 h-8 bg-success rounded-full" />
              <div>
                <p className="font-medium">مراجعة المشروع</p>
                <p className="text-sm text-muted-foreground">4:00 - 5:00 م</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Tasks */}
        <RecentTasks />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
