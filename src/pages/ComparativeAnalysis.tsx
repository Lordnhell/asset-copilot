import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, TrendingUp, AlertTriangle, BarChart, Share2, Sliders, Download, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ScenarioSandbox } from "@/components/ScenarioSandbox";
import { KnowledgePanel } from "@/components/KnowledgePanel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const ComparativeAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [allocations, setAllocations] = useState([33, 33, 34]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  const allAnalyses = [
    {
      id: 1,
      bank: "J.P. Morgan",
      security: "UST 10Y 2034",
      category: "Sovereign" as const,
      score: null,
      scoreColor: "text-muted-foreground",
      metrics: {
        yieldToMaturity: "4.35%",
        duration: "8.9 years",
        dv01Per1mm: "$85",
        oasSpread: "12 bps",
      },
      creditInterestScore: 90,
      rating: "AAA",
      currency: "USD",
      insight: "Benchmark sovereign bond. Used for reference pricing and spread calculations.",
    },
    {
      id: 2,
      bank: "UOB Kay Hian",
      security: "SGS 10Y 2033",
      category: "Sovereign" as const,
      score: null,
      scoreColor: "text-muted-foreground",
      metrics: {
        yieldToMaturity: "2.95%",
        duration: "8.2 years",
        dv01Per1mm: "$78",
        oasSpread: "0 bps",
      },
      creditInterestScore: 88,
      rating: "AAA",
      currency: "SGD",
      insight: "Benchmark sovereign bond. Used for reference pricing and spread calculations.",
    },
    {
      id: 3,
      bank: "DBS Bank",
      security: "Temasek 2030",
      category: "Corporate" as const,
      score: 85,
      scoreColor: "text-success",
      metrics: {
        yieldToMaturity: "3.45%",
        duration: "5.4 years",
        dv01Per1mm: "$52",
        oasSpread: "45 bps",
      },
      creditInterestScore: 82,
      rating: "AAA",
      currency: "SGD",
      insight: "Quasi-sovereign credit with AAA rating. Moderate spread over SGS. Lower duration reduces interest rate risk with strong credit quality.",
    },
    {
      id: 4,
      bank: "J.P. Morgan",
      security: "DBS Senior 2030",
      category: "Corporate" as const,
      score: 78,
      scoreColor: "text-warning",
      metrics: {
        yieldToMaturity: "3.88%",
        duration: "5.8 years",
        dv01Per1mm: "$56",
        oasSpread: "88 bps",
      },
      creditInterestScore: 85,
      rating: "AA-",
      currency: "SGD",
      insight: "Strong banking credit with solid fundamentals. Higher spread reflects bank sector risk premium. Consider concentration limits on financial sector exposure.",
    },
    {
      id: 5,
      bank: "UOB Kay Hian",
      security: "CapitaLand 2031",
      category: "Corporate" as const,
      score: 72,
      scoreColor: "text-destructive",
      metrics: {
        yieldToMaturity: "4.25%",
        duration: "6.2 years",
        dv01Per1mm: "$61",
        oasSpread: "125 bps",
      },
      creditInterestScore: 75,
      rating: "A",
      currency: "SGD",
      insight: "Real estate corporate credit. Higher yield compensates for sector-specific risk and lower rating. Wider spread reflects property market dynamics.",
    },
  ];

  // Filter to show only corporate bonds in comparison
  const analyses = allAnalyses.filter(a => a.category === "Corporate");

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
    const weightedYield = analyses.reduce((sum, analysis, idx) => {
      const yieldPercent = parseFloat(analysis.metrics.yieldToMaturity);
      return sum + (yieldPercent * allocations[idx] / 100);
    }, 0);

    const weightedDuration = analyses.reduce((sum, analysis, idx) => {
      const durationYears = parseFloat(analysis.metrics.duration);
      return sum + (durationYears * allocations[idx] / 100);
    }, 0);

    const weightedDV01 = analyses.reduce((sum, analysis, idx) => {
      const dv01Value = parseFloat(analysis.metrics.dv01Per1mm.replace(/[$,]/g, ''));
      return sum + (dv01Value * allocations[idx] / 100);
    }, 0);

    const weightedSpread = analyses.reduce((sum, analysis, idx) => {
      const spreadBps = parseFloat(analysis.metrics.oasSpread);
      return sum + (spreadBps * allocations[idx] / 100);
    }, 0);

    return {
      weightedYield: weightedYield.toFixed(2),
      weightedDuration: weightedDuration.toFixed(1),
      weightedDV01: Math.round(weightedDV01).toLocaleString(),
      weightedSpread: Math.round(weightedSpread),
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

  const handleShareAnalysis = () => {
    if (!shareEmail) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to share the analysis.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Analysis Shared",
      description: `Report has been sent to ${shareEmail}`,
    });
    setShareEmail("");
    setShareMessage("");
  };

  const handleDownloadAuditPack = () => {
    toast({
      title: "Audit Pack Generated",
      description: "Downloading JSON + PDF audit pack with full analysis metadata.",
    });
  };

  const portfolioMetrics = calculatePortfolioMetrics();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6 md:p-12 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            {/* Header with Actions */}
            <div className="flex items-center justify-end mb-6">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleDownloadAuditPack}>
              <Download className="w-4 h-4" />
              Download Audit Pack
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleExportSummary}>
              <Download className="w-4 h-4" />
              Export Summary
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Report
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Share Analysis</SheetTitle>
                  <SheetDescription>
                    Send this analysis to team members or bankers
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Recipient Email
                    </label>
                    <Input
                      type="email"
                      placeholder="investor@example.com"
                      value={shareEmail}
                      onChange={(e) => setShareEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message (Optional)
                    </label>
                    <Textarea
                      placeholder="Add a note for the recipient..."
                      value={shareMessage}
                      onChange={(e) => setShareMessage(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button className="w-full" onClick={handleShareAnalysis}>
                    Send Analysis
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <ScenarioSandbox />
            <Button size="sm" onClick={() => navigate("/processing")}>
              Run New Analysis
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Comparative Bond Analysis</h1>
          <p className="text-muted-foreground">AI-powered comparison of corporate bond risk and yield metrics relative to sovereign benchmarks</p>
          <Badge variant="outline" className="mt-2 border-accent text-accent">
            Comparing Corporate Bonds Only — Sovereigns Used as Benchmarks
          </Badge>
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
                Based on your IPS and remaining DV01 headroom, <span className="font-semibold">Temasek 2030 (DBS Bank)</span> presents 
                the best risk-adjusted corporate bond choice. AAA quasi-sovereign credit with 45 bps spread over SGS benchmark. 
                Lower duration reduces interest rate risk while offering attractive yield pickup over government bonds.
              </p>
            </div>
          </div>
        </Card>

        {/* No Corporate Bonds Warning */}
        {analyses.length === 0 && (
          <Card className="bg-warning/10 border-warning p-8 mb-8">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Corporate Bond Quotes Found</h3>
              <p className="text-muted-foreground mb-4">
                Upload or connect data sources with corporate bond term sheets to compare. 
                Sovereign bonds are available as benchmarks but are not included in comparative analysis.
              </p>
              <Button onClick={() => navigate("/data-sources")}>
                Connect Data Sources
              </Button>
            </div>
          </Card>
        )}

        {/* Analysis Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="bg-card border-border p-6 space-y-6">
              {/* Header with Score */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{analysis.bank}</h3>
                    <Badge variant="outline" className="border-border">{analysis.security}</Badge>
                  </div>
                 </div>
                 {analysis.score !== null ? (
                   <>
                     <div className={`text-5xl font-bold ${analysis.scoreColor} mb-2`}>
                       {analysis.score}
                       <span className="text-2xl text-muted-foreground">/100</span>
                     </div>
                     <p className="text-sm text-muted-foreground">QuantAI Risk Score</p>
                   </>
                 ) : (
                   <div className="text-sm text-muted-foreground italic">
                     Benchmark Only - Not Scored
                   </div>
                 )}
               </div>

              {/* Key Metrics */}
              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Yield to Maturity
                  </span>
                  <span className="font-semibold text-foreground">{analysis.metrics.yieldToMaturity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">{analysis.metrics.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">DV01 per $1mm</span>
                  <span className="font-semibold text-foreground">{analysis.metrics.dv01Per1mm}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">OAS Spread</span>
                  <span className="font-semibold text-foreground">{analysis.metrics.oasSpread}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating / Currency</span>
                  <span className="font-semibold text-foreground">{analysis.rating} / {analysis.currency}</span>
                </div>
              </div>

              {/* Credit & Interest Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Credit & Interest Score</span>
                  <span className="text-sm font-semibold text-foreground">{analysis.creditInterestScore}/100</span>
                </div>
                <Progress value={analysis.creditInterestScore} className="h-2" />
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
                      <span className="text-sm text-muted-foreground">Weighted Yield</span>
                      <span className="text-lg font-bold text-success">{portfolioMetrics.weightedYield}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weighted Duration</span>
                      <span className="text-sm font-semibold text-foreground">{portfolioMetrics.weightedDuration} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weighted DV01 per $1mm</span>
                      <span className="text-sm font-semibold text-foreground">${portfolioMetrics.weightedDV01}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weighted OAS Spread</span>
                      <span className="text-sm font-semibold text-foreground">{portfolioMetrics.weightedSpread} bps</span>
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
                      <span className="text-sm text-foreground">Weighted yield meets target (3.25% / 3.00%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm text-foreground">USD exposure present - consider FX hedging</span>
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
      <KnowledgePanel />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ComparativeAnalysis;
