
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const RecentTasks = () => {
  const tasks = [
    { id: 1, title: 'مراجعة التقرير الشهري', completed: false, priority: 'عالي', due: 'اليوم' },
    { id: 2, title: 'اجتماع الفريق', completed: true, priority: 'متوسط', due: 'أمس' },
    { id: 3, title: 'تحديث الموقع الإلكتروني', completed: false, priority: 'منخفض', due: 'غداً' },
    { id: 4, title: 'إعداد العرض التقديمي', completed: false, priority: 'عالي', due: 'بعد يومين' },
  ];

  const priorityColors = {
    'عالي': 'bg-destructive/10 text-destructive',
    'متوسط': 'bg-warning/10 text-warning',
    'منخفض': 'bg-success/10 text-success',
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">المهام الأخيرة</h3>
        <Badge variant="secondary" className="text-xs">
          {tasks.filter(t => !t.completed).length} متبقية
        </Badge>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
          >
            {task.completed ? (
              <CheckCircle2 size={20} className="text-success" />
            ) : (
              <Circle size={20} className="text-muted-foreground" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                >
                  {task.priority}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  {task.due}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTasks;
