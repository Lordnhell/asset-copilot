import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, TrendingUp, AlertTriangle, BarChart, Home, Share2, Sliders, Download, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const ComparativeAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [allocations, setAllocations] = useState([33, 33, 34]);
  const [isSimulating, setIsSimulating] = useState(false);

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

  const handleAllocationChange = (index: number, value: number[]) => {
    const newAllocations = [...allocations];
    newAllocations[index] = value[0];
    
    // Auto-adjust other allocations proportionally
    const remaining = 100 - value[0];
    const otherIndices = allocations.map((_, i) => i).filter(i => i !== index);
    const otherTotal = otherIndices.reduce((sum, i) => sum + allocations[i], 0);
    
    otherIndices.forEach(i => {
      newAllocations[i] = otherTotal > 0 ? Math.round((allocations[i] / otherTotal) * remaining) : 0;
    });
    
    // Ensure total is exactly 100
    const sum = newAllocations.reduce((a, b) => a + b, 0);
    if (sum !== 100 && newAllocations.length > 0) {
      newAllocations[0] += (100 - sum);
    }
    
    setAllocations(newAllocations);
  };

  const calculatePortfolioMetrics = () => {
    const weightedReturn = analyses.reduce((sum, analysis, idx) => {
      const returnPercent = parseFloat(analysis.metrics.estimatedReturn);
      return sum + (returnPercent * allocations[idx] / 100);
    }, 0);

    const weightedVolatility = analyses.reduce((sum, analysis, idx) => {
      const volPercent = parseFloat(analysis.metrics.estimatedVolatility);
      return sum + (volPercent * allocations[idx] / 100);
    }, 0);

    const weightedVaR = analyses.reduce((sum, analysis, idx) => {
      const varValue = parseFloat(analysis.metrics.varImpact.replace(/[$,]/g, ''));
      return sum + (varValue * allocations[idx] / 100);
    }, 0);

    const sharpeRatio = weightedReturn / weightedVolatility;

    return {
      weightedReturn: weightedReturn.toFixed(1),
      weightedVolatility: weightedVolatility.toFixed(1),
      weightedVaR: Math.round(weightedVaR).toLocaleString(),
      sharpeRatio: sharpeRatio.toFixed(2),
      newDV01: 15200, // Mock value
    };
  };

  const handleExportSummary = () => {
    toast({
      title: "Export Started",
      description: "Your trade summary PDF is being generated and will download shortly.",
    });
    
    // Mock PDF generation
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Trade summary has been downloaded successfully.",
      });
    }, 2000);
  };

  const portfolioMetrics = calculatePortfolioMetrics();

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header with Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleExportSummary}>
              <Download className="w-4 h-4" />
              Export Trade Summary
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share Report
            </Button>
            <Button size="sm" onClick={() => navigate("/processing")}>
              Run New Analysis
            </Button>
          </div>
        </div>

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

      {/* Post-Analysis Action Layer */}
      <div className="mt-8 flex gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Sliders className="w-5 h-5 mr-2" />
              Simulate Allocation
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Portfolio Allocation Simulator</SheetTitle>
              <SheetDescription>
                Adjust quote weights to see combined portfolio metrics and IPS compliance
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Allocation Sliders */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Adjust Allocations</h3>
                {analyses.map((analysis, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{analysis.bank}</span>
                      <span className="text-sm font-semibold text-foreground">{allocations[idx]}%</span>
                    </div>
                    <Slider
                      value={[allocations[idx]]}
                      onValueChange={(value) => handleAllocationChange(idx, value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              <Separator />

              {/* Combined Metrics */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Combined Portfolio Metrics</h3>
                
                <Card className="bg-accent/10 border-accent/20 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Combined Sharpe Ratio</span>
                      <span className="text-lg font-bold text-success">{portfolioMetrics.sharpeRatio}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weighted Return</span>
                      <span className="text-sm font-semibold text-foreground">{portfolioMetrics.weightedReturn}% p.a.</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weighted Volatility</span>
                      <span className="text-sm font-semibold text-foreground">{portfolioMetrics.weightedVolatility}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Combined VaR (95%)</span>
                      <span className="text-sm font-semibold text-foreground">${portfolioMetrics.weightedVaR}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Portfolio DV01</span>
                      <span className="text-sm font-semibold text-foreground">${portfolioMetrics.newDV01.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>

                {/* IPS Compliance Check */}
                <Card className="bg-muted/50 p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">IPS Compliance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground">DV01 within limit (15,200 / 20,000)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground">Target Sharpe ratio exceeded (1.62 / 1.50)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm text-foreground">High volatility - consider 70-80% sizing</span>
                    </div>
                  </div>
                </Card>
              </div>

              <Button className="w-full" onClick={() => {
                toast({
                  title: "Allocation Saved",
                  description: "Your simulated allocation has been saved for review.",
                });
              }}>
                Save Simulation
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <Button size="lg" variant="outline" className="flex-1" onClick={handleExportSummary}>
          <Download className="w-5 h-5 mr-2" />
          Export Trade Summary
        </Button>
      </div>
    </div>
  </div>
);
};

export default ComparativeAnalysis;
