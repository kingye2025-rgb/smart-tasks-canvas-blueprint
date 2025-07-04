
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Check,
  X,
  Key
} from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordChecks = [
    { text: '8 أحرف على الأقل', valid: formData.password.length >= 8 },
    { text: 'حرف صغير', valid: /[a-z]/.test(formData.password) },
    { text: 'حرف كبير', valid: /[A-Z]/.test(formData.password) },
    { text: 'رقم', valid: /[0-9]/.test(formData.password) }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="absolute top-6 right-6"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Key size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">إعادة تعيين كلمة المرور</h1>
          <p className="text-muted-foreground mt-1">أدخل كلمة مرور جديدة قوية</p>
        </div>

        {/* Reset Form */}
        <Card className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">كلمة المرور الجديدة</label>
              <div className="relative">
                <Lock size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pr-10 pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">قوة كلمة المرور</span>
                    <span className={`font-medium ${
                      passwordStrength(formData.password) < 50 ? 'text-destructive' :
                      passwordStrength(formData.password) < 75 ? 'text-warning' : 'text-success'
                    }`}>
                      {passwordStrength(formData.password) < 50 ? 'ضعيفة' :
                       passwordStrength(formData.password) < 75 ? 'متوسطة' : 'قوية'}
                    </span>
                  </div>
                  <Progress value={passwordStrength(formData.password)} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {passwordChecks.map((check, index) => (
                      <div key={index} className="flex items-center gap-1">
                        {check.valid ? (
                          <Check size={12} className="text-success" />
                        ) : (
                          <X size={12} className="text-muted-foreground" />
                        )}
                        <span className={check.valid ? 'text-success' : 'text-muted-foreground'}>
                          {check.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">تأكيد كلمة المرور</label>
              <div className="relative">
                <Lock size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pr-10 pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <X size={12} />
                  كلمات المرور غير متطابقة
                </p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
                <p className="text-xs text-success flex items-center gap-1">
                  <Check size={12} />
                  كلمات المرور متطابقة
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full gradient-bg text-white"
              size="lg"
              disabled={isSubmitting || formData.password !== formData.confirmPassword || !formData.password}
            >
              {isSubmitting ? 'جاري إعادة التعيين...' : 'إعادة تعيين كلمة المرور'}
            </Button>
          </form>
        </Card>

        {/* Security Tips */}
        <Card className="p-4 bg-accent/50">
          <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-success" />
            نصائح الأمان:
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• استخدم كلمة مرور فريدة لا تستخدمها في مواقع أخرى</li>
            <li>• تأكد من قوة كلمة المرور قبل الحفظ</li>
            <li>• احتفظ بكلمة المرور في مكان آمن</li>
          </ul>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="text-muted-foreground hover:text-foreground"
          >
            العودة لتسجيل الدخول
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
