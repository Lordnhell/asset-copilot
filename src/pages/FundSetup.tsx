import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Home } from "lucide-react";
import ProgressSteps from "@/components/ProgressSteps";

const FundSetup = () => {
  const navigate = useNavigate();
  const [fundName, setFundName] = useState("");
  const [clientName, setClientName] = useState("");
  const [dv01, setDv01] = useState("500000");
  const [concentration, setConcentration] = useState("15");
  const [sharpeRatio, setSharpeRatio] = useState("1.5");

  const steps = [
    { label: "Account", status: "completed" as const },
    { label: "Fund Setup", status: "active" as const },
    { label: "Data Integration", status: "pending" as const },
  ];

  const handleNext = () => {
    navigate("/data-integration");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Cancel Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Exit to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Progress */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4">
                ONBOARDING PROGRESS
              </h2>
              <ProgressSteps steps={steps} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Set up your first fund
              </h1>
              <p className="text-muted-foreground">
                Configure your fund details and risk parameters
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fund & Policy Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fundName">Fund Name *</Label>
                    <Input
                      id="fundName"
                      placeholder="e.g., Global Equity Fund"
                      value={fundName}
                      onChange={(e) => setFundName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name (Optional)</Label>
                    <Input
                      id="clientName"
                      placeholder="e.g., Smith Family Office"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ips">Investment Policy Statement</Label>
                  <div className="border-2 border-dashed border-accent rounded-lg p-8 text-center hover:bg-accent/5 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-sm text-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF (MAX. 10MB)
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Set Risk Parameters
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="dv01">
                      Max Interest Rate Exposure (DV01)
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="dv01"
                        type="number"
                        value={dv01}
                        onChange={(e) => setDv01(e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-muted-foreground">USD</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="concentration">Max Equity Concentration</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="concentration"
                        type="number"
                        value={concentration}
                        onChange={(e) => setConcentration(e.target.value)}
                        className="flex-1"
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
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleNext}
                    disabled={!fundName}
                    className="flex-1"
                  >
                    Next: Connect Your Data
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundSetup;
