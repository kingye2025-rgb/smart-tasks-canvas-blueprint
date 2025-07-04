
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Flag, 
  Calendar, 
  Clock, 
  User, 
  MessageSquare, 
  Paperclip,
  MoreVertical,
  CheckCircle2,
  Circle,
  Plus,
  Edit3,
  Trash2,
  Share,
  Star,
  Tag
} from 'lucide-react';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [newSubtask, setNewSubtask] = useState('');

  // Mock data - in real app would fetch based on id
  const task = {
    id: 1,
    title: 'تصميم واجهة المستخدم الجديدة',
    description: 'تصميم واجهة مستخدم حديثة ومتجاوبة للتطبيق الجديد مع التركيز على تجربة المستخدم وسهولة الاستخدام',
    completed: false,
    priority: 'عالي',
    category: 'تصميم',
    dueDate: '2024-01-15',
    assignee: 'أحمد محمد',
    progress: 65,
    tags: ['UI/UX', 'موبايل', 'تصميم'],
    subtasks: [
      { id: 1, title: 'بحث وتحليل المنافسين', completed: true },
      { id: 2, title: 'إنشاء wireframes', completed: true },
      { id: 3, title: 'تصميم النماذج الأولية', completed: false },
      { id: 4, title: 'اختبار المستخدمين', completed: false }
    ],
    comments: [
      { id: 1, author: 'سارة أحمد', text: 'تم الانتهاء من مرحلة البحث', time: 'منذ ساعتين' },
      { id: 2, author: 'محمد علي', text: 'يرجى مراجعة التصاميم المرفقة', time: 'منذ 4 ساعات' }
    ],
    attachments: [
      { id: 1, name: 'design-mockup.fig', size: '2.5 MB', type: 'figma' },
      { id: 2, name: 'user-research.pdf', size: '1.2 MB', type: 'pdf' }
    ]
  };

  const priorityColors = {
    'عالي': 'bg-destructive text-destructive-foreground',
    'متوسط': 'bg-warning text-warning-foreground',
    'منخفض': 'bg-success text-success-foreground',
  };

  const addComment = () => {
    if (newComment.trim()) {
      console.log('إضافة تعليق:', newComment);
      setNewComment('');
    }
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      console.log('إضافة مهمة فرعية:', newSubtask);
      setNewSubtask('');
    }
  };

  const toggleSubtask = (subtaskId: number) => {
    console.log('تبديل حالة المهمة الفرعية:', subtaskId);
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/tasks')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            العودة للمهام
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share size={16} className="ml-2" />
              مشاركة
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical size={16} />
            </Button>
          </div>
        </div>

        {/* Task Main Info */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-2">{task.title}</h1>
                <p className="text-muted-foreground">{task.description}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Edit3 size={16} />
              </Button>
            </div>

            {/* Task Meta */}
            <div className="flex flex-wrap items-center gap-4">
              <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                <Flag size={12} className="ml-1" />
                {task.priority}
              </Badge>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={14} />
                {new Date(task.dueDate).toLocaleDateString('ar-SA')}
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User size={14} />
                {task.assignee}
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock size={14} />
                في التقدم
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Tag size={10} className="ml-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">التقدم</span>
                <span className="text-foreground font-medium">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subtasks */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">المهام الفرعية</h3>
              <Badge variant="secondary">
                {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50">
                  <button onClick={() => toggleSubtask(subtask.id)}>
                    {subtask.completed ? (
                      <CheckCircle2 size={18} className="text-success" />
                    ) : (
                      <Circle size={18} className="text-muted-foreground" />
                    )}
                  </button>
                  <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {subtask.title}
                  </span>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={14} />
                  </Button>
                </div>
              ))}

              {/* Add Subtask */}
              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="إضافة مهمة فرعية..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={addSubtask}>
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </Card>

          {/* Activity & Comments */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">التعليقات والنشاط</h3>
            
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {task.comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="bg-accent/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                        </div>
                        <p className="text-sm text-foreground">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="اكتب تعليقاً..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-20"
              />
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <Paperclip size={16} className="ml-2" />
                  إرفاق ملف
                </Button>
                <Button size="sm" onClick={addComment}>
                  <MessageSquare size={16} className="ml-2" />
                  تعليق
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Attachments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">المرفقات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {task.attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Paperclip size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{attachment.name}</p>
                  <p className="text-xs text-muted-foreground">{attachment.size}</p>
                </div>
                <Button variant="ghost" size="sm">
                  تحميل
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Star size={16} className="ml-2" />
              إضافة للمفضلة
            </Button>
            <Button variant="outline">
              <Calendar size={16} className="ml-2" />
              جدولة
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Trash2 size={16} className="ml-2" />
              حذف
            </Button>
            <Button className="gradient-bg">
              {task.completed ? 'إعادة فتح' : 'إكمال المهمة'}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TaskDetails;
