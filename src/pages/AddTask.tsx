
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  Save, 
  Calendar as CalendarIcon, 
  Flag, 
  Tag, 
  User, 
  Clock,
  Repeat,
  Bell,
  Paperclip,
  Plus,
  X,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
    assignee: '',
    dueDate: undefined as Date | undefined,
    reminderEnabled: false,
    reminderTime: '30',
    isRecurring: false,
    recurringPattern: '',
    location: '',
    estimatedTime: ''
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtask, setNewSubtask] = useState('');

  const priorities = [
    { value: 'عالي', label: 'عالي', color: 'text-destructive' },
    { value: 'متوسط', label: 'متوسط', color: 'text-warning' },
    { value: 'منخفض', label: 'منخفض', color: 'text-success' }
  ];

  const categories = [
    'عمل', 'شخصي', 'دراسة', 'صحة', 'أسرة', 'مشاريع', 'اجتماعات', 'تسوق'
  ];

  const teamMembers = [
    'أحمد محمد', 'سارة أحمد', 'محمد علي', 'نور فادي', 'علي حسن'
  ];

  const recurringPatterns = [
    { value: 'daily', label: 'يومياً' },
    { value: 'weekly', label: 'أسبوعياً' },
    { value: 'monthly', label: 'شهرياً' },
    { value: 'yearly', label: 'سنوياً' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks(prev => [...prev, newSubtask.trim()]);
      setNewSubtask('');
    }
  };

  const removeSubtask = (index: number) => {
    setSubtasks(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log('حفظ المهمة:', { ...formData, tags, subtasks });
    navigate('/tasks');
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/tasks')}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">إضافة مهمة جديدة</h1>
          </div>
          <Button onClick={handleSave} className="gradient-bg">
            <Save size={16} className="ml-2" />
            حفظ
          </Button>
        </div>

        {/* Basic Information */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">المعلومات الأساسية</h3>
          
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">عنوان المهمة *</label>
            <Input
              placeholder="اكتب عنوان المهمة..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">الوصف</label>
            <Textarea
              placeholder="اكتب وصف المهمة..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Priority & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الأولوية</label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center gap-2">
                        <Flag size={14} className={priority.color} />
                        {priority.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الفئة</label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Scheduling */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">الجدولة والتوقيت</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">تاريخ الاستحقاق</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {formData.dueDate ? (
                      format(formData.dueDate, "PPP", { locale: ar })
                    ) : (
                      "اختر التاريخ"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => handleInputChange('dueDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Estimated Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الوقت المتوقع</label>
              <div className="relative">
                <Clock size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="مثال: 2 ساعة"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
          </div>

          {/* Reminder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">تذكير</label>
              </div>
              <Switch
                checked={formData.reminderEnabled}
                onCheckedChange={(checked) => handleInputChange('reminderEnabled', checked)}
              />
            </div>
            
            {formData.reminderEnabled && (
              <Select value={formData.reminderTime} onValueChange={(value) => handleInputChange('reminderTime', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 دقائق قبل</SelectItem>
                  <SelectItem value="15">15 دقيقة قبل</SelectItem>
                  <SelectItem value="30">30 دقيقة قبل</SelectItem>
                  <SelectItem value="60">ساعة قبل</SelectItem>
                  <SelectItem value="1440">يوم قبل</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Recurring */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat size={16} className="text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">مهمة متكررة</label>
              </div>
              <Switch
                checked={formData.isRecurring}
                onCheckedChange={(checked) => handleInputChange('isRecurring', checked)}
              />
            </div>
            
            {formData.isRecurring && (
              <Select value={formData.recurringPattern} onValueChange={(value) => handleInputChange('recurringPattern', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نمط التكرار" />
                </SelectTrigger>
                <SelectContent>
                  {recurringPatterns.map((pattern) => (
                    <SelectItem key={pattern.value} value={pattern.value}>
                      {pattern.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </Card>

        {/* Assignment & Location */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">التخصيص والموقع</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assignee */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">مسند إلى</label>
              <Select value={formData.assignee} onValueChange={(value) => handleInputChange('assignee', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="لا أحد" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member} value={member}>
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        {member}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الموقع</label>
              <div className="relative">
                <MapPin size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="مثال: مكتب الرياض"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Tags */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">الوسوم</h3>
          
          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <Tag size={12} />
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add Tag */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="إضافة وسم..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              className="flex-1"
            />
            <Button size="sm" onClick={addTag}>
              <Plus size={16} />
            </Button>
          </div>
        </Card>

        {/* Subtasks */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">المهام الفرعية</h3>
          
          {/* Current Subtasks */}
          {subtasks.length > 0 && (
            <div className="space-y-2">
              {subtasks.map((subtask, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-accent/30 rounded-lg">
                  <span className="flex-1 text-sm">{subtask}</span>
                  <button onClick={() => removeSubtask(index)} className="text-muted-foreground hover:text-destructive">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Subtask */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="إضافة مهمة فرعية..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSubtask()}
              className="flex-1"
            />
            <Button size="sm" onClick={addSubtask}>
              <Plus size={16} />
            </Button>
          </div>
        </Card>

        {/* Attachments */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">المرفقات</h3>
          <Button variant="outline" className="w-full">
            <Paperclip size={16} className="ml-2" />
            إضافة مرفقات
          </Button>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={() => navigate('/tasks')}>
            إلغاء
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              حفظ كمسودة
            </Button>
            <Button onClick={handleSave} className="gradient-bg">
              <Save size={16} className="ml-2" />
              إنشاء المهمة
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddTask;
