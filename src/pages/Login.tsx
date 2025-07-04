
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Chrome,
  Apple,
  Facebook
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/tasks');
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`تسجيل الدخول باستخدام ${provider}`);
    // Implement social login
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
          <h1 className="text-2xl font-bold text-foreground">أهلاً بك مرة أخرى!</h1>
          <p className="text-muted-foreground mt-1">سجل دخولك لمتابعة رحلة الإنتاجية</p>
        </div>

        {/* Login Form */}
        <Card className="p-6 space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground">
                  تذكرني
                </label>
              </div>
              <Button 
                variant="link" 
                size="sm"
                onClick={() => navigate('/forgot-password')}
                className="text-primary hover:text-primary/80"
              >
                نسيت كلمة المرور؟
              </Button>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full gradient-bg text-white"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
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

          {/* Social Login */}
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSocialLogin('Google')}
            >
              <Chrome size={18} className="ml-2" />
              تسجيل الدخول بـ Google
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('Apple')}
              >
                <Apple size={18} className="ml-2" />
                Apple
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('Facebook')}
              >
                <Facebook size={18} className="ml-2" />
                Facebook
              </Button>
            </div>
          </div>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-muted-foreground">ليس لديك حساب؟ </span>
          <Button 
            variant="link" 
            onClick={() => navigate('/signup')}
            className="text-primary hover:text-primary/80 p-0"
          >
            إنشاء حساب جديد
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
