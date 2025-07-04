
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Mail, 
  CheckCircle2,
  Lock,
  Send
} from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEmailSent(true);
    }, 2000);
  };

  const handleResendEmail = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">تم إرسال البريد!</h1>
            <p className="text-muted-foreground mt-1">
              لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى
            </p>
            <p className="text-foreground font-medium">{email}</p>
          </div>

          <Card className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-accent/50 rounded-lg">
                <h3 className="font-medium text-foreground mb-2">الخطوات التالية:</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>تحقق من صندوق البريد الوارد</li>
                  <li>انقر على رابط إعادة التعيين</li>
                  <li>أدخل كلمة مرور جديدة</li>
                  <li>سجل دخولك بكلمة المرور الجديدة</li>
                </ol>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">لم تستلم البريد؟</p>
                <Button 
                  variant="outline"
                  onClick={handleResendEmail}
                  disabled={isSubmitting}
                >
                  <Send size={16} className="ml-2" />
                  {isSubmitting ? 'جاري الإرسال...' : 'إعادة الإرسال'}
                </Button>
              </div>
            </div>
          </Card>

          <div className="text-center space-y-2">
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
  }

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
          
          <div className="w-16 h-16 bg-warning rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">نسيت كلمة المرور؟</h1>
          <p className="text-muted-foreground mt-1">
            لا تقلق، سنرسل لك رابط إعادة تعيين كلمة المرور
          </p>
        </div>

        {/* Reset Form */}
        <Card className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full gradient-bg text-white"
              size="lg"
              disabled={isSubmitting}
            >
              <Send size={20} className="ml-2" />
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال رابط الإعادة'}
            </Button>
          </form>
        </Card>

        {/* Help */}
        <Card className="p-4 bg-accent/50">
          <h3 className="font-medium text-foreground mb-2">تذكر:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• تحقق من مجلد الرسائل المزعجة</li>
            <li>• الرابط صالح لمدة 24 ساعة</li>
            <li>• يمكنك طلب رابط جديد إذا انتهت صلاحية الأول</li>
          </ul>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <span className="text-muted-foreground">تذكرت كلمة المرور؟ </span>
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

export default ForgotPassword;
