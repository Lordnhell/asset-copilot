import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [command, setCommand] = useState("");

  const recentAnalyses = [
    { title: "DRAFT: NVDA FCN Analysis", status: "draft", date: "Today" },
    { title: "JPM Corporate Bonds - Sep 15", status: "completed", date: "Sep 15" },
    { title: "UOB Structured Note - Sep 14", status: "completed", date: "Sep 14" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Good afternoon, Asset Manager</h1>
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
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Command Center</h2>
                <div className="flex gap-2">
                  <Input placeholder="Paste an email, upload quotes, or ask a question... E.g., 'Analyze the 3 FCN quotes for NVDA I got today'" className="flex-1" value={command} onChange={(e) => setCommand(e.target.value)} />
                  <Button onClick={() => navigate("/processing")}><Upload className="w-4 h-4 mr-2" />Upload</Button>
                </div>
              </CardContent>
            </Card>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Analyses</h2>
              <div className="space-y-3">
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
