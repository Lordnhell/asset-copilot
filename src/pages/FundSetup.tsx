import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

const FundSetup = () => {
  const navigate = useNavigate();
  const [fundName, setFundName] = useState("");
  const [clientName, setClientName] = useState("");
  const [dv01, setDv01] = useState("500000");
  const [concentration, setConcentration] = useState("15");
  const [sharpeRatio, setSharpeRatio] = useState("1.5");

  const handleNext = () => {
    navigate("/data-integration");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Fund & Policy Setup</h1>
          <p className="text-muted-foreground">Configure your fund parameters and risk policies</p>
        </div>

        <Card className="bg-card border-border p-8 space-y-8">
          {/* Fund Details Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Fund Details</h2>
            
            <div className="space-y-2">
              <Label htmlFor="fundName">Fund Name *</Label>
              <Input
                id="fundName"
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
                placeholder="e.g., Alpha Growth Fund"
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name (Optional)</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., Horizon Family Office"
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ips">Investment Policy Statement</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload IPS (PDF)
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Upload your investment policy document for AI analysis</p>
            </div>
          </div>

          {/* Risk Parameters Section */}
          <div className="space-y-6 pt-6 border-t border-border">
            <h2 className="text-xl font-semibold text-foreground">Set Risk Parameters</h2>

            <div className="space-y-2">
              <Label htmlFor="dv01">Max Interest Rate Exposure (DV01)</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="dv01"
                  type="number"
                  value={dv01}
                  onChange={(e) => setDv01(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
                <span className="text-muted-foreground min-w-fit">USD</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="concentration">Max Equity Concentration</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="concentration"
                  type="number"
                  value={concentration}
                  onChange={(e) => setConcentration(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
                <span className="text-muted-foreground">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sharpe">Target Sharpe Ratio</Label>
              <Input
                id="sharpe"
                type="number"
                step="0.1"
                value={sharpeRatio}
                onChange={(e) => setSharpeRatio(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>

          <Button 
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground text-lg h-12"
            disabled={!fundName}
          >
            Next: Connect Your Data
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default FundSetup;
