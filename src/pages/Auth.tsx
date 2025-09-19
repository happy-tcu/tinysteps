import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Brain, Focus, Timer, TrendingUp, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.png';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isDynamic, setIsDynamic] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/app');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/app');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${
      isDynamic 
        ? 'bg-gradient-to-br from-primary/10 via-background to-secondary/10' 
        : 'bg-background'
    }`}>
      {/* Header with back button and dynamic toggle */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-foreground hover:bg-background/10"
        >
          <img src={logo} alt="TinySteps" className="h-6 w-6" />
          <span className="font-semibold">TinySteps</span>
        </Button>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDynamic(!isDynamic)}
          className="flex items-center gap-2"
        >
          {isDynamic ? <Zap className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          {isDynamic ? 'Dynamic' : 'Minimal'}
        </Button>
      </div>
      
      <div className={`w-full max-w-4xl transition-all duration-500 ${
        isDynamic 
          ? 'grid lg:grid-cols-2 gap-8 items-center' 
          : 'flex justify-center'
      }`}>
        
        {/* Hero Section - only show in dynamic mode */}
        {isDynamic && (
          <div className="space-y-6 text-center lg:text-left animate-in slide-in-from-left duration-500">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TinySteps Focus
              </h1>
              <p className="text-xl text-muted-foreground">
                AI-powered productivity for minds that think differently
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-8">
              <div className="space-y-2 transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                  <Brain className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold">AI Task Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                  Break complex tasks into manageable steps
                </p>
              </div>
              
              <div className="space-y-2 transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-secondary-soft rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                  <Focus className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold">Smart Focus Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized timing for optimal focus
                </p>
              </div>
              
              <div className="space-y-2 transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-accent-soft rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                  <Timer className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold">Adaptive Timers</h3>
                <p className="text-sm text-muted-foreground">
                  Timers that adapt to your energy levels
                </p>
              </div>
              
              <div className="space-y-2 transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-warning-soft rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                  <TrendingUp className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold">Progress Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Insights to improve your productivity
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Auth Form */}
        <Card className={`w-full transition-all duration-500 ${
          isDynamic 
            ? 'max-w-md mx-auto shadow-focus animate-in slide-in-from-right duration-500' 
            : 'max-w-sm mx-auto border-0 shadow-none bg-transparent'
        }`}>
          <CardHeader className={isDynamic ? 'pb-6' : 'pb-8 text-center'}>
            {!isDynamic && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  TinySteps
                </h1>
              </div>
            )}
            <CardTitle className={isDynamic ? 'text-xl' : 'text-2xl font-normal'}>
              {isDynamic ? 'Welcome' : 'Welcome back'}
            </CardTitle>
            <CardDescription className={isDynamic ? '' : 'text-base'}>
              {isDynamic 
                ? 'Sign in to your account or create a new one'
                : 'Sign in to continue your focus journey'
              }
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 mb-6 ${
              isDynamic ? '' : 'bg-muted/50 h-12'
            }`}>
              <TabsTrigger value="signin" className={isDynamic ? '' : 'text-base py-3'}>
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className={isDynamic ? '' : 'text-base py-3'}>
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <CardContent className={`space-y-${isDynamic ? '4' : '6'}`}>
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className={isDynamic ? '' : 'text-base font-medium'}>
                      Email
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={isDynamic ? '' : 'h-12 text-base border-2 focus:border-primary'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className={isDynamic ? '' : 'text-base font-medium'}>
                      Password
                    </Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={isDynamic ? '' : 'h-12 text-base border-2 focus:border-primary'}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className={`w-full ${
                      isDynamic 
                        ? 'bg-gradient-primary' 
                        : 'h-12 text-base bg-foreground text-background hover:bg-foreground/90'
                    }`}
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <CardContent className={`space-y-${isDynamic ? '4' : '6'}`}>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className={isDynamic ? '' : 'text-base font-medium'}>
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className={isDynamic ? '' : 'h-12 text-base border-2 focus:border-primary'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className={isDynamic ? '' : 'text-base font-medium'}>
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={isDynamic ? '' : 'h-12 text-base border-2 focus:border-primary'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className={isDynamic ? '' : 'text-base font-medium'}>
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={isDynamic ? '' : 'h-12 text-base border-2 focus:border-primary'}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className={`w-full ${
                      isDynamic 
                        ? 'bg-gradient-primary' 
                        : 'h-12 text-base bg-foreground text-background hover:bg-foreground/90'
                    }`}
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;