import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Calendar,
  Flag,
  MoreVertical,
  Kanban,
  List,
  Layout,
  Eye
} from 'lucide-react';

const Tasks = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = [
    { 
      id: 1, 
      title: 'تصميم واجهة المستخدم الجديدة', 
      completed: false, 
      priority: 'عالي', 
      category: 'تصميم',
      dueDate: '2024-01-15',
      assignee: 'أحمد محمد'
    },
    { 
      id: 2, 
      title: 'مراجعة كود التطبيق', 
      completed: true, 
      priority: 'متوسط', 
      category: 'برمجة',
      dueDate: '2024-01-14',
      assignee: 'سارة أحمد'
    },
    { 
      id: 3, 
      title: 'إعداد اجتماع العميل', 
      completed: false, 
      priority: 'عالي', 
      category: 'اجتماعات',
      dueDate: '2024-01-16',
      assignee: 'محمد علي'
    },
    { 
      id: 4, 
      title: 'كتابة التقرير الشهري', 
      completed: false, 
      priority: 'منخفض', 
      category: 'تقارير',
      dueDate: '2024-01-20',
      assignee: 'نور فادي'
    },
  ];

  const priorityColors = {
    'عالي': 'bg-destructive/10 text-destructive border-destructive/20',
    'متوسط': 'bg-warning/10 text-warning border-warning/20',
    'منخفض': 'bg-success/10 text-success border-success/20',
  };

  const categoryColors = {
    'تصميم': 'bg-purple-100 text-purple-700',
    'برمجة': 'bg-blue-100 text-blue-700',
    'اجتماعات': 'bg-green-100 text-green-700',
    'تقارير': 'bg-orange-100 text-orange-700',
  };

  const viewModeButtons = [
    { mode: 'list' as const, icon: List, label: 'قائمة' },
    { mode: 'kanban' as const, icon: Kanban, label: 'كانبان' },
    { mode: 'calendar' as const, icon: Calendar, label: 'تقويم' },
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">إدارة المهام</h1>
          <p className="text-muted-foreground mt-1">نظم مهامك بكفاءة وذكاء</p>
        </div>

        {/* Search and Controls */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="البحث في المهام..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {viewModeButtons.map((button) => {
                const Icon = button.icon;
                return (
                  <Button
                    key={button.mode}
                    variant={viewMode === button.mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode(button.mode)}
                    className="flex items-center gap-2"
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{button.label}</span>
                  </Button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="ml-2" />
                فلترة
              </Button>
              <Button size="sm" className="gradient-bg" onClick={() => navigate('/add-task')}>
                <Plus size={16} className="ml-2" />
                مهمة جديدة
              </Button>
            </div>
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {tasks.filter(t => !t.completed).length}
            </div>
            <div className="text-sm text-muted-foreground">قيد التنفيذ</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {tasks.filter(t => t.completed).length}
            </div>
            <div className="text-sm text-muted-foreground">مكتملة</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {tasks.filter(t => t.priority === 'عالي' && !t.completed).length}
            </div>
            <div className="text-sm text-muted-foreground">عالية الأولوية</div>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card key={task.id} className="p-4 card-hover">
              <div className="flex items-start gap-3">
                <button className="mt-1">
                  {task.completed ? (
                    <CheckCircle2 size={20} className="text-success" />
                  ) : (
                    <Circle size={20} className="text-muted-foreground hover:text-primary" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 
                      className={`font-medium cursor-pointer hover:text-primary ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                      onClick={() => navigate(`/tasks/${task.id}`)}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/tasks/${task.id}`)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge 
                      variant="outline" 
                      className={priorityColors[task.priority as keyof typeof priorityColors]}
                    >
                      <Flag size={12} className="ml-1" />
                      {task.priority}
                    </Badge>
                    
                    <Badge 
                      variant="secondary" 
                      className={categoryColors[task.category as keyof typeof categoryColors]}
                    >
                      {task.category}
                    </Badge>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">
                      مُسند إلى: {task.assignee}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Task Button (Floating) */}
        <div className="fixed bottom-24 left-6 z-40">
          <Button 
            size="lg" 
            className="rounded-full gradient-bg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/add-task')}
          >
            <Plus size={24} />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Tasks;
