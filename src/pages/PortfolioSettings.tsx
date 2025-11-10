import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const PortfolioSettings = () => {
  const navigate = useNavigate();
  const [maxDV01, setMaxDV01] = useState("15000");
  const [maxEquityConcentration, setMaxEquityConcentration] = useState("30");
  const [targetSharpe, setTargetSharpe] = useState("1.5");

  const handleSave = () => {
    toast.success("Portfolio settings saved successfully!");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              Portfolio Configuration
            </h1>

        <Tabs defaultValue="risk" className="w-full">
          <TabsList>
            <TabsTrigger value="risk">Risk Parameters</TabsTrigger>
            <TabsTrigger value="policy">Investment Policy</TabsTrigger>
            <TabsTrigger value="team">Team Access</TabsTrigger>
          </TabsList>

          <TabsContent value="risk">
            <Card>
              <CardHeader>
                <CardTitle>Risk Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="maxDV01">
                    Max Interest Rate Exposure (DV01)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="maxDV01"
                      type="number"
                      value={maxDV01}
                      onChange={(e) => setMaxDV01(e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-muted-foreground">USD</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxEquity">Max Equity Concentration</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="maxEquity"
                      type="number"
                      value={maxEquityConcentration}
                      onChange={(e) => setMaxEquityConcentration(e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetSharpe">Target Sharpe Ratio</Label>
                  <Input
                    id="targetSharpe"
                    type="number"
                    step="0.1"
                    value={targetSharpe}
                    onChange={(e) => setTargetSharpe(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline">Add New Portfolio</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policy">
            <Card>
              <CardHeader>
                <CardTitle>Investment Policy Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload and manage your Investment Policy Statement documents.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Access Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage team member access to this portfolio.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PortfolioSettings;
