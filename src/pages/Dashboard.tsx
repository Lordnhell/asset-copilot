import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Send, TrendingUp, AlertCircle, Shield } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [command, setCommand] = useState("");

  const handleAnalyze = () => {
    if (command.trim()) {
      navigate("/processing");
    }
  };

  const handleFileUpload = () => {
    navigate("/processing");
  };

  const recentAnalyses = [
    { id: 1, title: "FCN Analysis - NVDA", date: "2024-01-15", score: 82 },
    { id: 2, title: "ELN Quotes - AAPL", date: "2024-01-14", score: 76 },
    { id: 3, title: "DCI Comparison - TSLA", date: "2024-01-13", score: 68 },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Good afternoon, Portfolio Manager</h1>
          <p className="text-muted-foreground">Your QuantAI Risk Co-Pilot is ready to assist</p>
        </div>

        {/* Portfolio Health Widget */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Portfolio Health</p>
                <p className="text-3xl font-bold text-success">82/100</p>
              </div>
              <div className="bg-success/10 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Well within risk parameters</p>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">IR Exposure (DV01)</p>
                <p className="text-2xl font-bold text-foreground">$342K</p>
              </div>
              <div className="bg-warning/10 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">68% of max limit ($500K)</p>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Equity Concentration</p>
                <p className="text-2xl font-bold text-foreground">12.3%</p>
              </div>
              <div className="bg-success/10 p-2 rounded-lg">
                <AlertCircle className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Within target (15% max)</p>
          </Card>
        </div>

        {/* Command Bar */}
        <Card className="bg-card border-border p-6 mb-8">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="Paste an email, upload quotes, or ask a question... E.g., 'Analyze the 3 FCN quotes for NVDA I got today.'"
                className="flex-1 bg-input border-border text-foreground h-12 text-base"
              />
              <Button
                onClick={handleAnalyze}
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-6"
                disabled={!command.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleFileUpload}
                variant="outline"
                className="border-border"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Analyses */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Analyses</h2>
          <div className="space-y-3">
            {recentAnalyses.map((analysis) => (
              <Card
                key={analysis.id}
                className="bg-card border-border p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => navigate("/comparative-analysis")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{analysis.title}</h3>
                    <p className="text-sm text-muted-foreground">{analysis.date}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      analysis.score >= 80 ? "text-success" : 
                      analysis.score >= 60 ? "text-warning" : "text-destructive"
                    }`}>
                      {analysis.score}
                    </div>
                    <p className="text-xs text-muted-foreground">Risk Score</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
