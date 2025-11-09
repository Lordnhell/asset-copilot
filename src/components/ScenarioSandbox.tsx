import { useState } from "react";
import { Sliders, TrendingDown, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const ScenarioSandbox = () => {
  const { toast } = useToast();
  const [interestRate, setInterestRate] = useState([0]);
  const [creditSpread, setCreditSpread] = useState([0]);
  const [fxMove, setFxMove] = useState([0]);

  const calculateScenarioImpact = () => {
    // Mock calculations based on slider values
    const irImpact = interestRate[0] * -125; // $125 per bp
    const creditImpact = creditSpread[0] * -80; // $80 per bp
    const fxImpact = fxMove[0] * 500; // $500 per %
    
    const totalPnL = irImpact + creditImpact + fxImpact;
    const newDV01 = 12500 + (interestRate[0] * 10);
    const newSharpe = (1.62 - (Math.abs(interestRate[0]) * 0.005) - (Math.abs(creditSpread[0]) * 0.003)).toFixed(2);
    
    const ipsBreaches: string[] = [];
    if (newDV01 > 20000) ipsBreaches.push("DV01 limit exceeded");
    if (parseFloat(newSharpe) < 1.50) ipsBreaches.push("Below target Sharpe ratio");
    if (totalPnL < -50000) ipsBreaches.push("VaR limit breach");
    
    return {
      totalPnL,
      newDV01,
      newSharpe,
      ipsBreaches,
    };
  };

  const results = calculateScenarioImpact();

  const handleSaveScenario = () => {
    toast({
      title: "Scenario Saved",
      description: "Your what-if scenario has been saved as a report.",
    });
  };

  const handleReset = () => {
    setInterestRate([0]);
    setCreditSpread([0]);
    setFxMove([0]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Sliders className="w-4 h-4" />
          What-If Scenarios
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scenario Sandbox</DialogTitle>
          <DialogDescription>
            Adjust market parameters to see impact on portfolio P&L, risk scores, and IPS compliance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Scenario Sliders */}
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Interest Rate Shift</label>
                <Badge variant="outline">{interestRate[0] > 0 ? '+' : ''}{interestRate[0]} bp</Badge>
              </div>
              <Slider
                value={interestRate}
                onValueChange={setInterestRate}
                min={-100}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-100 bp</span>
                <span>+100 bp</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Credit Spread Change</label>
                <Badge variant="outline">{creditSpread[0] > 0 ? '+' : ''}{creditSpread[0]} bp</Badge>
              </div>
              <Slider
                value={creditSpread}
                onValueChange={setCreditSpread}
                min={-50}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-50 bp</span>
                <span>+50 bp</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">FX Movement</label>
                <Badge variant="outline">{fxMove[0] > 0 ? '+' : ''}{fxMove[0]}%</Badge>
              </div>
              <Slider
                value={fxMove}
                onValueChange={setFxMove}
                min={-10}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-10%</span>
                <span>+10%</span>
              </div>
            </div>
          </div>

          {/* Scenario Results */}
          <Card className={`${results.totalPnL < 0 ? 'bg-destructive/5 border-destructive/20' : 'bg-success/5 border-success/20'}`}>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Scenario Impact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Estimated ΔP&L
                  </span>
                  <div className="flex items-center gap-2">
                    {results.totalPnL >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span className={`text-lg font-bold ${results.totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
                      ${Math.abs(results.totalPnL).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">New DV01</span>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      ${results.newDV01.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">New Sharpe Ratio</span>
                    <p className="text-sm font-semibold text-foreground mt-1">{results.newSharpe}</p>
                  </div>
                </div>

                {results.ipsBreaches.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-warning">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-semibold">IPS Breaches</span>
                      </div>
                      {results.ipsBreaches.map((breach, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground ml-6">
                          <span>• {breach}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button onClick={handleSaveScenario} className="flex-1">
              Save as Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
