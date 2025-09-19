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
        ? 'bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-gradient-x' 
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
          className={`flex items-center gap-2 transition-all duration-300 ${
            isDynamic 
              ? 'bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg hover:shadow-xl' 
              : 'hover:bg-accent'
          }`}
        >
          {isDynamic ? <Zap className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          {isDynamic ? 'Colorful' : 'Minimal'}
        </Button>
      </div>
      
      <div className="w-full flex justify-center">
        {/* Auth Form */}
        <Card className={`w-full max-w-sm mx-auto transition-all duration-500 ${
          isDynamic 
            ? 'shadow-2xl border-2 border-gradient bg-gradient-to-br from-background via-background to-primary/5 hover:shadow-primary/20' 
            : 'border-0 shadow-none bg-transparent'
        }`}>
          <CardHeader className="pb-8 text-center">
            <div className="mb-6">
              <h1 className={`text-3xl font-bold mb-2 transition-all duration-500 ${
                isDynamic 
                  ? 'bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse' 
                  : 'bg-gradient-primary bg-clip-text text-transparent'
              }`}>
                TinySteps
              </h1>
            </div>
            <CardTitle className="text-2xl font-normal">
              Welcome back
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to continue your focus journey
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 mb-6 h-12 transition-all duration-300 ${
              isDynamic 
                ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-accent/30' 
                : 'bg-muted/50'
            }`}>
              <TabsTrigger value="signin" className={`text-base py-3 transition-all duration-300 ${
                isDynamic ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white' : ''
              }`}>
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className={`text-base py-3 transition-all duration-300 ${
                isDynamic ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white' : ''
              }`}>
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-base font-medium">
                      Email
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`h-12 text-base border-2 focus:border-primary transition-all duration-300 ${
                        isDynamic ? 'border-primary/30 focus:border-gradient focus:shadow-lg focus:shadow-primary/20' : ''
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-base font-medium">
                      Password
                    </Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`h-12 text-base border-2 focus:border-primary transition-all duration-300 ${
                        isDynamic ? 'border-primary/30 focus:border-gradient focus:shadow-lg focus:shadow-primary/20' : ''
                      }`}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className={`w-full h-12 text-base transition-all duration-300 ${
                      isDynamic 
                        ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg hover:shadow-primary/30 hover:scale-105' 
                        : 'bg-foreground text-background hover:bg-foreground/90'
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
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-base font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className={`h-12 text-base border-2 focus:border-primary transition-all duration-300 ${
                        isDynamic ? 'border-primary/30 focus:border-gradient focus:shadow-lg focus:shadow-primary/20' : ''
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-base font-medium">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`h-12 text-base border-2 focus:border-primary transition-all duration-300 ${
                        isDynamic ? 'border-primary/30 focus:border-gradient focus:shadow-lg focus:shadow-primary/20' : ''
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-base font-medium">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`h-12 text-base border-2 focus:border-primary transition-all duration-300 ${
                        isDynamic ? 'border-primary/30 focus:border-gradient focus:shadow-lg focus:shadow-primary/20' : ''
                      }`}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className={`w-full h-12 text-base transition-all duration-300 ${
                      isDynamic 
                        ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg hover:shadow-primary/30 hover:scale-105' 
                        : 'bg-foreground text-background hover:bg-foreground/90'
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