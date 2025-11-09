import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, FileText, ChevronDown, ChevronUp, TrendingUp, DollarSign, Globe, PieChart, CheckCircle2 } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditHistory } from "@/components/AuditHistory";
import { KnowledgePanel } from "@/components/KnowledgePanel";
import { ScenarioSandbox } from "@/components/ScenarioSandbox";

const Dashboard = () => {
  const navigate = useNavigate();
  const [command, setCommand] = useState("");
  const [isContextOpen, setIsContextOpen] = useState(true);
  const [selectedQuotations, setSelectedQuotations] = useState<number[]>([]);

  const parsedQuotations = [
    { id: 1, issuer: "NVDA", product: "FCN", notional: "$5M", coupon: "8.5%", barrier: "70%", date: "Today" },
    { id: 2, issuer: "TSLA", product: "Autocallable", notional: "$3M", coupon: "12%", barrier: "65%", date: "Today" },
    { id: 3, issuer: "AAPL", product: "Reverse Convertible", notional: "$4M", coupon: "10%", barrier: "75%", date: "Yesterday" },
  ];

  const recentAnalyses = [
    { title: "DRAFT: NVDA FCN Analysis", status: "draft", date: "Today" },
    { title: "JPM Corporate Bonds - Sep 15", status: "completed", date: "Sep 15" },
    { title: "UOB Structured Note - Sep 14", status: "completed", date: "Sep 14" },
  ];

  const toggleQuotation = (id: number) => {
    setSelectedQuotations(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const portfolioContext = {
    totalDV01: 12500,
    keyRateBuckets: [
      { tenor: "2Y", dv01: 2800, limit: 3000, status: "ok" },
      { tenor: "5Y", dv01: 4200, limit: 5000, status: "ok" },
      { tenor: "10Y", dv01: 3800, limit: 4000, status: "ok" },
      { tenor: "30Y", dv01: 1700, limit: 2000, status: "ok" },
    ],
    topIssuers: [
      { name: "US Treasury", exposure: 4200000, percent: 28 },
      { name: "Apple Inc", exposure: 3800000, percent: 25 },
      { name: "Microsoft", exposure: 2100000, percent: 14 },
      { name: "JPMorgan", exposure: 1900000, percent: 13 },
      { name: "Goldman Sachs", exposure: 1500000, percent: 10 },
    ],
    currencies: [
      { code: "USD", percent: 72, status: "ok" },
      { code: "EUR", percent: 18, status: "ok" },
      { code: "GBP", percent: 10, status: "ok" },
    ],
    sectors: [
      { name: "US Equities", percent: 58, limit: 60, status: "warning" },
      { name: "Corporate Bonds", percent: 25, limit: 30, status: "ok" },
      { name: "Structured Products", percent: 17, limit: 20, status: "ok" },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok": return "text-success";
      case "warning": return "text-warning";
      case "breach": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Good afternoon, Asset Manager</h1>
            
            {/* Command Center - Highlighted */}
            <Card className="mb-8 border-2 border-primary shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">AI Command Center</h2>
                    <p className="text-sm text-muted-foreground">Start your analysis with natural language or select parsed quotations</p>
                  </div>
                </div>

                <Textarea 
                  placeholder="Describe what you want to analyze... E.g., 'Compare the risk-return profiles of these NVDA structured notes against our current portfolio limits'" 
                  className="mb-4 min-h-[100px] text-base"
                  value={command} 
                  onChange={(e) => setCommand(e.target.value)} 
                />

                {/* Parsed Quotations */}
                {parsedQuotations.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Select Parsed Quotations to Analyze</h3>
                    <div className="grid gap-2">
                      {parsedQuotations.map((quote) => (
                        <button
                          key={quote.id}
                          onClick={() => toggleQuotation(quote.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            selectedQuotations.includes(quote.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50 bg-card'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-foreground">{quote.issuer} {quote.product}</span>
                                <span className="text-xs text-muted-foreground">{quote.date}</span>
                              </div>
                              <div className="grid grid-cols-4 gap-3 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Notional: </span>
                                  <span className="text-foreground font-medium">{quote.notional}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Coupon: </span>
                                  <span className="text-foreground font-medium">{quote.coupon}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Barrier: </span>
                                  <span className="text-foreground font-medium">{quote.barrier}</span>
                                </div>
                              </div>
                            </div>
                            {selectedQuotations.includes(quote.id) && (
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => navigate("/processing")} 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-lg h-14"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start AI Analysis
                </Button>
              </CardContent>
            </Card>
            
            {/* Pre-Trade Context Snapshot */}
            <Collapsible open={isContextOpen} onOpenChange={setIsContextOpen} className="mb-6">
              <Card className="border-accent/20">
                <CardContent className="p-6">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-accent" />
                        <h2 className="text-xl font-semibold text-foreground">Current Portfolio Context</h2>
                      </div>
                      {isContextOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="space-y-6">
                      {/* DV01 and Key Rate Buckets */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-foreground">Interest Rate Exposure</h3>
                          <div className="text-lg font-bold text-foreground">
                            Total DV01: ${portfolioContext.totalDV01.toLocaleString()}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {portfolioContext.keyRateBuckets.map((bucket) => (
                            <div key={bucket.tenor} className="bg-muted/50 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">{bucket.tenor}</div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-foreground">${bucket.dv01.toLocaleString()}</span>
                                <span className={`text-xs ${getStatusColor(bucket.status)}`}>
                                  / ${bucket.limit.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top 5 Issuers */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <h3 className="text-sm font-semibold text-foreground">Top 5 Issuers by Exposure</h3>
                        </div>
                        <div className="space-y-2">
                          {portfolioContext.topIssuers.map((issuer, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <span className="text-sm text-foreground">{issuer.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  ${(issuer.exposure / 1000000).toFixed(1)}M
                                </span>
                                <Badge variant="outline" className="text-xs">{issuer.percent}%</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Currency Breakdown */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Globe className="w-4 h-4 text-accent" />
                            <h3 className="text-sm font-semibold text-foreground">Currency Breakdown</h3>
                          </div>
                          <div className="space-y-2">
                            {portfolioContext.currencies.map((currency) => (
                              <div key={currency.code} className="flex items-center justify-between">
                                <span className="text-sm text-foreground">{currency.code}</span>
                                <Badge variant="outline" className="text-xs">{currency.percent}%</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sector Breakdown */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <PieChart className="w-4 h-4 text-accent" />
                            <h3 className="text-sm font-semibold text-foreground">Sector & IPS Limits</h3>
                          </div>
                          <div className="space-y-2">
                            {portfolioContext.sectors.map((sector, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <span className="text-sm text-foreground">{sector.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm font-semibold ${getStatusColor(sector.status)}`}>
                                    {sector.percent}%
                                  </span>
                                  <span className="text-xs text-muted-foreground">/ {sector.limit}%</span>
                                  {sector.status === "warning" && <span className="text-warning">⚠️</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-4 border-t border-border">
                        <Button 
                          onClick={() => navigate("/processing")} 
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Run New Analysis with These Limits
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CardContent>
              </Card>
            </Collapsible>

            <Card className="mb-8 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Portfolio Health</h2>
                  <div className="text-4xl font-bold text-success">82/100</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span className="text-sm text-foreground">IR Exposure: $12,500 DV01 (Within Limit)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-warning">⚠️</span>
                    <span className="text-sm text-foreground">High Concentration Alert: US Equities (58%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="recent" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
                  <TabsTrigger value="audit">Audit History</TabsTrigger>
                </TabsList>
                <ScenarioSandbox />
              </div>

              <TabsContent value="recent" className="space-y-3">
                {recentAnalyses.map((analysis, index) => (
                  <Card key={index} className="cursor-pointer hover:border-accent transition-colors" onClick={() => analysis.status === "draft" ? navigate("/confirmation") : navigate("/comparative-analysis")}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-accent" />
                        <div><p className="font-medium text-foreground">{analysis.title}</p><p className="text-xs text-muted-foreground">{analysis.date}</p></div>
                      </div>
                      {analysis.status === "draft" && <Button variant="outline" size="sm">Resume</Button>}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="audit">
                <AuditHistory />
              </TabsContent>
            </Tabs>
            
            <KnowledgePanel />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
