
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Palette, 
  Globe, 
  Shield,
  RefreshCw,
  HelpCircle,
  LogOut,
  Crown,
  Smartphone,
  Mail,
  Calendar,
  Moon,
  Sun,
  Volume2
} from 'lucide-react';

const Settings = () => {
  const settingsSections = [
    {
      title: 'الحساب والملف الشخصي',
      items: [
        { icon: User, label: 'تحرير الملف الشخصي', description: 'تحديث المعلومات الشخصية', action: 'navigate' },
        { icon: Crown, label: 'الاشتراك المميز', description: 'ترقية إلى الخطة المدفوعة', action: 'navigate', badge: 'جديد' },
        { icon: Shield, label: 'الخصوصية والأمان', description: 'إدارة إعدادات الأمان', action: 'navigate' },
      ]
    },
    {
      title: 'الإشعارات والتذكيرات',
      items: [
        { icon: Bell, label: 'إشعارات المهام', description: 'تذكيرات المهام المستحقة', action: 'toggle', enabled: true },
        { icon: Volume2, label: 'الأصوات', description: 'أصوات التنبيه والإشعارات', action: 'toggle', enabled: false },
        { icon: Smartphone, label: 'الإشعارات الفورية', description: 'إشعارات على الهاتف', action: 'toggle', enabled: true },
      ]
    },
    {
      title: 'المظهر واللغة',
      items: [
        { icon: Palette, label: 'السمة', description: 'الوضع الليلي/النهاري', action: 'theme' },
        { icon: Globe, label: 'اللغة', description: 'العربية', action: 'navigate' },
        { icon: Moon, label: 'الوضع الليلي', description: 'تفعيل الوضع المظلم', action: 'toggle', enabled: false },
      ]
    },
    {
      title: 'المزامنة والتكامل',
      items: [
        { icon: RefreshCw, label: 'مزامنة تلقائية', description: 'مزامنة البيانات مع السحابة', action: 'toggle', enabled: true },
        { icon: Calendar, label: 'تكامل التقويم', description: 'Google Calendar, Outlook', action: 'navigate' },
        { icon: Mail, label: 'البريد الإلكتروني', description: 'تحويل الإيميلات إلى مهام', action: 'toggle', enabled: false },
      ]
    },
    {
      title: 'المساعدة والدعم',
      items: [
        { icon: HelpCircle, label: 'المساعدة والأسئلة الشائعة', description: 'دليل الاستخدام والدعم', action: 'navigate' },
        { icon: Mail, label: 'تواصل معنا', description: 'إرسال تعليقات أو طلب مساعدة', action: 'navigate' },
        { icon: SettingsIcon, label: 'حول التطبيق', description: 'معلومات الإصدار والتحديثات', action: 'navigate' },
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
          <p className="text-muted-foreground mt-1">خصص تجربتك وإعداداتك</p>
        </div>

        {/* User Profile Card */}
        <Card className="p-6 gradient-bg text-white relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">أحمد محمد</h3>
              <p className="text-white/80">ahmed@example.com</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  المستخدم المجاني
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  منذ يناير 2024
                </Badge>
              </div>
            </div>
            <Button variant="secondary" className="bg-white/20 text-white border-white/30">
              تحرير
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">{section.title}</h3>
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{item.label}</h4>
                          {item.badge && (
                            <Badge variant="default" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    
                    {item.action === 'toggle' && (
                      <Switch 
                        checked={item.enabled} 
                        className="data-[state=checked]:bg-primary"
                      />
                    )}
                    
                    {item.action === 'navigate' && (
                      <Button variant="ghost" size="sm">
                        ←
                      </Button>
                    )}
                    
                    {item.action === 'theme' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Sun size={16} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Moon size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}

        {/* App Info */}
        <Card className="p-6 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <SettingsIcon size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Smart Tasks+</h3>
              <p className="text-muted-foreground">الإصدار 2.1.0</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" size="sm">
                ما الجديد
              </Button>
              <Button variant="outline" size="sm">
                تقييم التطبيق
              </Button>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Card className="p-6">
          <Button variant="destructive" className="w-full" size="lg">
            <LogOut size={20} className="ml-2" />
            تسجيل الخروج
          </Button>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
