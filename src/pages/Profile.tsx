
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Edit3,
  Save,
  Camera,
  Award,
  TrendingUp,
  Target,
  Clock,
  Star
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    location: 'الرياض، السعودية',
    bio: 'مطور برمجيات متخصص في تطبيقات الويب والجوال. أحب التعلم وتطوير الحلول التقنية المبتكرة.',
    joinDate: 'يناير 2024',
    avatar: ''
  });

  const stats = [
    { label: 'المهام المكتملة', value: '156', icon: Award, color: 'text-success' },
    { label: 'العادات النشطة', value: '8', icon: Target, color: 'text-primary' },
    { label: 'ساعات التركيز', value: '89', icon: Clock, color: 'text-warning' },
    { label: 'نقاط الإنتاجية', value: '2,450', icon: TrendingUp, color: 'text-info' }
  ];

  const achievements = [
    { id: 1, title: 'محارب الإنتاجية', icon: '🏆', earned: true },
    { id: 2, title: 'سيد العادات', icon: '🔥', earned: true },
    { id: 3, title: 'خبير التركيز', icon: '🧠', earned: false },
    { id: 4, title: 'المنظم المثالي', icon: '📋', earned: true }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1500);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              العودة
            </Button>
            <h1 className="text-2xl font-bold text-foreground">الملف الشخصي</h1>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="gradient-bg">
                  <Save size={16} className="ml-2" />
                  {isSaving ? 'جاري الحفظ...' : 'حفظ'}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit3 size={16} className="ml-2" />
                تحرير
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-xl font-bold">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/80 transition-colors">
                      <Camera size={16} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        placeholder="الاسم الكامل"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                      <Input
                        placeholder="البريد الإلكتروني"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      <Input
                        placeholder="رقم الهاتف"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                      <Input
                        placeholder="الموقع"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail size={16} />
                          <span>{profileData.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone size={16} />
                          <span>{profileData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={16} />
                          <span>{profileData.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={16} />
                          <span>عضو منذ {profileData.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Bio */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">نبذة شخصية</h3>
              {isEditing ? (
                <Textarea
                  placeholder="اكتب نبذة عنك..."
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="min-h-24"
                />
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {profileData.bio}
                </p>
              )}
            </Card>

            {/* Activity Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">إحصائيات النشاط</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center p-4 bg-accent/30 rounded-lg">
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Level */}
            <Card className="p-6 gradient-bg text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Star className="text-white" size={24} />
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    المستوى 3
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">منتج محترف</h3>
                <p className="text-white/80 text-sm mb-3">1,250 / 2,000 نقطة للمستوى التالي</p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '62.5%' }} />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4" />
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">الإنجازات</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      achievement.earned 
                        ? 'bg-accent/50 border-primary/20' 
                        : 'bg-muted/30 border-muted-foreground/20'
                    }`}
                  >
                    <div className="text-xl">
                      {achievement.earned ? achievement.icon : '🔒'}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${
                        achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </h4>
                    </div>
                    {achievement.earned && (
                      <Badge variant="default" className="bg-success text-white text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <User size={16} className="ml-2" />
                  تحديث الصورة الشخصية
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit3 size={16} className="ml-2" />
                  تحرير المعلومات
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award size={16} className="ml-2" />
                  عرض الإنجازات
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
