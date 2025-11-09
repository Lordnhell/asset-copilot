import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const PortfolioHealth = () => {
  const navigate = useNavigate();

  const trendData = [
    { month: "Sep", dv01: 11200, sharpe: 1.58, concentration: 52 },
    { month: "Oct", dv01: 11800, sharpe: 1.61, concentration: 54 },
    { month: "Nov", dv01: 12100, sharpe: 1.62, concentration: 56 },
    { month: "Dec", dv01: 12500, sharpe: 1.62, concentration: 58 },
  ];

  const sectorGeo = [
    { name: "US Equities", region: "North America", percent: 58, status: "warning" },
    { name: "EU Corporates", region: "Europe", percent: 15, status: "ok" },
    { name: "Asia Bonds", region: "Asia", percent: 12, status: "ok" },
    { name: "Emerging Markets", region: "Global", percent: 8, status: "ok" },
    { name: "Alternatives", region: "Global", percent: 7, status: "ok" },
  ];

  const issuerBreakdown = [
    { issuer: "US Treasury", exposure: 4200000, change: 5 },
    { issuer: "Apple Inc", exposure: 3800000, change: -2 },
    { issuer: "Microsoft", exposure: 2100000, change: 8 },
    { issuer: "JPMorgan", exposure: 1900000, change: 3 },
    { issuer: "Goldman Sachs", exposure: 1500000, change: -1 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-6">
          Portfolio Health Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-success">82/100</div>
              <p className="text-sm text-muted-foreground mt-2">
                Your portfolio is in good health
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IR Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                $12,500 DV01
              </div>
              <p className="text-sm text-success mt-2">✓ Within Limit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equity Concentration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">58%</div>
              <p className="text-sm text-warning mt-2">⚠️ US Equities High</p>
            </CardContent>
          </Card>
        </div>

        {/* Trend Lines */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Portfolio Metrics Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">DV01 Trend</h3>
                <div className="space-y-2">
                  {trendData.map((data, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{data.month}</span>
                      <span className="font-semibold text-foreground">${data.dv01.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Sharpe Ratio Trend</h3>
                <div className="space-y-2">
                  {trendData.map((data, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{data.month}</span>
                      <span className="font-semibold text-success">{data.sharpe}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">US Equity Concentration</h3>
                <div className="space-y-2">
                  {trendData.map((data, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{data.month}</span>
                      <span className={`font-semibold ${data.concentration >= 58 ? 'text-warning' : 'text-foreground'}`}>
                        {data.concentration}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sector/Geo Heatmap */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sector & Geographic Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sectorGeo.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <Badge variant="outline" className="text-xs">{item.region}</Badge>
                    </div>
                    <span className={`text-sm font-semibold ${item.status === 'warning' ? 'text-warning' : 'text-foreground'}`}>
                      {item.percent}%
                    </span>
                  </div>
                  <Progress value={item.percent} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Drill-down: Per-Issuer Contribution */}
        <Card>
          <CardHeader>
            <CardTitle>Top Issuer Contributions (Click to Drill Down)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {issuerBreakdown.map((issuer, idx) => (
                <Card 
                  key={idx} 
                  className="p-4 cursor-pointer hover:border-accent/40 transition-colors"
                  onClick={() => {/* Drill down logic */}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground">{issuer.issuer}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        ${(issuer.exposure / 1000000).toFixed(1)}M exposure
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {issuer.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className={`text-sm font-semibold ${issuer.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {issuer.change >= 0 ? '+' : ''}{issuer.change}%
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioHealth;
