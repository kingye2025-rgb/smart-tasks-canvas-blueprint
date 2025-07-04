
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  CheckCircle2,
  Chrome,
  Shield,
  Check,
  X
} from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/verify-email');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/welcome')}
            className="absolute top-6 right-6"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">إنشاء حساب جديد</h1>
          <p className="text-muted-foreground mt-1">ابدأ رحلتك نحو الإنتاجية المثلى</p>
        </div>

        {/* Signup Form */}
        <Card className="p-6 space-y-4">
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الاسم الكامل</label>
              <div className="relative">
                <User size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">كلمة المرور</label>
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

            {/* Confirm Password Input */}
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
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms"
                checked={agreeTerms}
                onCheckedChange={setAgreeTerms}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                أوافق على{' '}
                <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                  الشروط والأحكام
                </Button>
                {' '}و{' '}
                <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                  سياسة الخصوصية
                </Button>
              </label>
            </div>

            {/* Signup Button */}
            <Button 
              type="submit" 
              className="w-full gradient-bg text-white"
              size="lg"
              disabled={isLoading || !agreeTerms}
            >
              {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">أو</span>
            </div>
          </div>

          {/* Social Signup */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => console.log('Google signup')}
          >
            <Chrome size={18} className="ml-2" />
            التسجيل بـ Google
          </Button>

          {/* Security Notice */}
          <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg">
            <Shield size={16} className="text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground">أمان وخصوصية</p>
              <p>نحن نحمي بياناتك ولا نشاركها مع أطراف خارجية</p>
            </div>
          </div>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
          <Button 
            variant="link" 
            onClick={() => navigate('/login')}
            className="text-primary hover:text-primary/80 p-0"
          >
            تسجيل الدخول
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
