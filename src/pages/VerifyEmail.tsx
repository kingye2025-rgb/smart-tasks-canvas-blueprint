
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Mail, 
  CheckCircle2,
  RotateCcw,
  Timer
} from 'lucide-react';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length === 6) {
      setIsVerifying(true);
      
      // Simulate verification
      setTimeout(() => {
        setIsVerifying(false);
        navigate('/tasks');
      }, 2000);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    
    // Simulate resend
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(300);
      setVerificationCode(['', '', '', '', '', '']);
    }, 1500);
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/signup')}
            className="absolute top-6 right-6"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">تحقق من بريدك الإلكتروني</h1>
          <p className="text-muted-foreground mt-1">
            لقد أرسلنا رمز التحقق إلى
          </p>
          <p className="text-foreground font-medium">example@email.com</p>
        </div>

        {/* Verification Form */}
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground text-center block">
              أدخل رمز التحقق المكون من 6 أرقام
            </label>
            
            <div className="flex justify-center gap-3">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-bold"
                />
              ))}
            </div>

            {timeLeft > 0 && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Timer size={16} />
                <span>انتهاء الصلاحية خلال {formatTime(timeLeft)}</span>
              </div>
            )}
          </div>

          <Button 
            onClick={handleVerify}
            className="w-full gradient-bg text-white"
            size="lg"
            disabled={!isCodeComplete || isVerifying}
          >
            {isVerifying ? 'جاري التحقق...' : 'تحقق من الرمز'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">لم تستلم الرمز؟</p>
            <Button 
              variant="link" 
              onClick={handleResendCode}
              disabled={timeLeft > 0 || isResending}
              className="text-primary hover:text-primary/80"
            >
              <RotateCcw size={16} className="ml-2" />
              {isResending ? 'جاري الإرسال...' : 'إعادة إرسال الرمز'}
            </Button>
          </div>
        </Card>

        {/* Help */}
        <Card className="p-4 bg-accent/50">
          <h3 className="font-medium text-foreground mb-2">نصائح:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• تحقق من صندوق البريد الوارد والرسائل المزعجة</li>
            <li>• تأكد من إدخال الرمز خلال 5 دقائق</li>
            <li>• الرمز مكون من 6 أرقام فقط</li>
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

export default VerifyEmail;
