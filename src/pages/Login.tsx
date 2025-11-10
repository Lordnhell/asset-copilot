import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@quantintel.com");
  const [password, setPassword] = useState("demo123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/portfolio-setup");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-lg shadow-lg p-8 space-y-6 border border-border">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">QuantAI</h1>
            <h2 className="text-xl text-foreground">Risk Co-Pilot</h2>
            <p className="text-sm text-muted-foreground">
              Advanced portfolio analysis for institutional clients
            </p>
            <p className="text-xs text-accent mt-2">
              🚀 Dev Mode: Pre-filled credentials
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@institution.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <a href="#" className="text-sm text-accent hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          🔒 Secure login for institutional clients
        </p>
      </div>
    </div>
  );
};

export default Login;
