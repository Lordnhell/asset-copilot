import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FileText, Users, HardDrive, Calendar } from "lucide-react";

const Usage = () => {
  const usageData = {
    reportsUsed: 32,
    reportsLimit: 50,
    activeCollaborators: 5,
    storageUsed: 2.4,
    storageLimit: 10,
    billingPeriod: "Dec 1 - Dec 31, 2024",
  };

  const usagePercent = (usageData.reportsUsed / usageData.reportsLimit) * 100;
  const storagePercent = (usageData.storageUsed / usageData.storageLimit) * 100;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Usage & Billing</h1>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Reports Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Analysis Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">
                        {usageData.reportsUsed} / {usageData.reportsLimit}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {usageData.reportsLimit - usageData.reportsUsed} remaining
                      </span>
                    </div>
                    <Progress value={usagePercent} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {usagePercent.toFixed(0)}% of monthly allocation used
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Collaborators */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Active Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">
                        {usageData.activeCollaborators}
                      </span>
                      <span className="text-sm text-muted-foreground">team members</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      All collaborators have access to generated reports and can create new analyses
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Storage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-primary" />
                    Storage Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">
                        {usageData.storageUsed} GB
                      </span>
                      <span className="text-sm text-muted-foreground">
                        of {usageData.storageLimit} GB
                      </span>
                    </div>
                    <Progress value={storagePercent} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {(usageData.storageLimit - usageData.storageUsed).toFixed(1)} GB available
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Period */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Current Billing Period
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-foreground">
                      {usageData.billingPeriod}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Usage resets at the start of each billing period
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Reports include all comparative analyses, risk assessments, and portfolio health checks</li>
                  <li>• Storage includes all uploaded documents, parsed quotations, and generated reports</li>
                  <li>• Collaborators can view and download all reports but create analyses against the shared quota</li>
                  <li>• Upgrade your plan to increase limits and access additional features</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Usage;
