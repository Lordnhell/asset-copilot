import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, FileText, TrendingUp, Shield } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleStartAnalysis = () => {
    if (!query.trim()) {
      toast.error("Please enter your analysis requirements");
      return;
    }
    toast.success("Starting portfolio analysis...");
    navigate("/processing");
  };

  const features = [
    {
      icon: TrendingUp,
      title: "Portfolio Health",
      description: "Real-time risk metrics and performance analysis"
    },
    {
      icon: Shield,
      title: "Compliance Check",
      description: "Automated regulatory compliance monitoring"
    },
    {
      icon: FileText,
      title: "Custom Reports",
      description: "Generate detailed analysis reports on demand"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Command Center */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Portfolio Analysis
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              Command Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your portfolio analysis with natural language. Describe what you need, and our AI will generate comprehensive insights.
            </p>
          </div>

          {/* Command Center Card */}
          <Card className="max-w-4xl mx-auto p-8 shadow-2xl border-2 border-primary/20 bg-card">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  What would you like to analyze?
                </label>
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Example: Analyze my portfolio's risk exposure across emerging markets, focusing on currency volatility and geopolitical factors..."
                  className="min-h-[160px] text-base resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Press Enter to start analysis
                </p>
                <Button
                  onClick={handleStartAnalysis}
                  size="lg"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Analysis
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-border/50">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
