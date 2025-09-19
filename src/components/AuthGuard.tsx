import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Users, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your focus session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-focus">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Unlock AI-Powered Focus</CardTitle>
            <CardDescription className="text-base">
              Sign in to access personalized features and sync across devices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-primary-soft rounded-lg">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">AI Task Breakdown</p>
                  <p className="text-xs text-muted-foreground">Break complex tasks into manageable steps</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-secondary-soft rounded-lg">
                <Shield className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Cloud Sync</p>
                  <p className="text-xs text-muted-foreground">Access your data from any device</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-accent-soft rounded-lg">
                <Users className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Progress Analytics</p>
                  <p className="text-xs text-muted-foreground">Track your focus journey over time</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/auth')}
              className="w-full bg-gradient-primary"
              size="lg"
            >
              Sign In / Create Account
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Free to use • No credit card required
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;