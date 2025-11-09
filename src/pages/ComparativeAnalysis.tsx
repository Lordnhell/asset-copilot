import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, TrendingUp, AlertTriangle, BarChart } from "lucide-react";

const ComparativeAnalysis = () => {
  const analyses = [
    {
      id: 1,
      bank: "UOB Kay Hian",
      score: 82,
      scoreColor: "text-success",
      metrics: {
        estimatedReturn: "13.2% p.a.",
        estimatedVolatility: "28.5%",
        varImpact: "$42,300",
      },
      liquidityScore: 78,
      insight: "Best risk-adjusted profile with optimal strike positioning. High coupon compensates for moderate volatility exposure.",
    },
    {
      id: 2,
      bank: "J.P. Morgan",
      score: 76,
      scoreColor: "text-warning",
      metrics: {
        estimatedReturn: "12.5% p.a.",
        estimatedVolatility: "26.2%",
        varImpact: "$38,900",
      },
      liquidityScore: 85,
      insight: "Lower volatility but slightly lower coupon. Excellent liquidity profile makes this suitable for shorter holding periods.",
    },
    {
      id: 3,
      bank: "DBS Bank",
      score: 68,
      scoreColor: "text-destructive",
      metrics: {
        estimatedReturn: "11.8% p.a.",
        estimatedVolatility: "24.8%",
        varImpact: "$36,500",
      },
      liquidityScore: 72,
      insight: "Conservative strike with lower coupon. Best suited for risk-averse mandates but below target Sharpe ratio.",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Comparative Analysis: Your NVDA FCN Quotes</h1>
          <p className="text-muted-foreground">AI-powered risk assessment and recommendations</p>
        </div>

        {/* Co-Pilot Insight Banner */}
        <Card className="bg-accent/10 border-accent p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-lg">
              <BarChart className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-2">Co-Pilot Insight</h2>
              <p className="text-foreground">
                Based on your IPS, <span className="font-semibold">Quote B (UOB Kay Hian)</span> presents the best 
                risk-adjusted profile with a Sharpe ratio of 1.62, exceeding your target of 1.50. However, note the 
                high volatility (28.5%) which brings you close to your concentration limit. Consider sizing this position 
                at 70-80% of your typical allocation.
              </p>
            </div>
          </div>
        </Card>

        {/* Analysis Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="bg-card border-border p-6 space-y-6">
              {/* Header with Score */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{analysis.bank}</h3>
                    <Badge variant="outline" className="border-border">FCN - NVDA</Badge>
                  </div>
                </div>
                <div className={`text-5xl font-bold ${analysis.scoreColor} mb-2`}>
                  {analysis.score}
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                <p className="text-sm text-muted-foreground">QuantAI Risk Score</p>
              </div>

              {/* Key Metrics */}
              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Estimated Return
                  </span>
                  <span className="font-semibold text-foreground">{analysis.metrics.estimatedReturn}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Est. Volatility
                  </span>
                  <span className="font-semibold text-foreground">{analysis.metrics.estimatedVolatility}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">VaR Impact (95%)</span>
                  <span className="font-semibold text-foreground">{analysis.metrics.varImpact}</span>
                </div>
              </div>

              {/* Liquidity Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Liquidity Score</span>
                  <span className="text-sm font-semibold text-foreground">{analysis.liquidityScore}/100</span>
                </div>
                <Progress value={analysis.liquidityScore} className="h-2" />
              </div>

              {/* Co-Pilot Insight */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-foreground mb-2">Co-Pilot Insight</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{analysis.insight}</p>
              </div>

              {/* Action Button */}
              <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                <FileText className="mr-2 h-4 w-4" />
                View Detailed PDF Report
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;
