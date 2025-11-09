import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, FileText, Users, Calendar } from "lucide-react";

const Usage = () => {
  const usageData = {
    reportsUsed: 32,
    reportsTotal: 50,
    currentMonth: "November 2025",
    collaborators: 5,
    storageUsed: 2.3,
    storageTotal: 10,
  };

  const percentageUsed = (usageData.reportsUsed / usageData.reportsTotal) * 100;
  const storagePercentage = (usageData.storageUsed / usageData.storageTotal) * 100;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-6 bg-card">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold ml-4">Usage & Limits</h1>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Reports This Month
                    </CardDescription>
                    <CardTitle className="text-3xl">{usageData.reportsUsed}/{usageData.reportsTotal}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={percentageUsed} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {usageData.reportsTotal - usageData.reportsUsed} remaining
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Active Collaborators
                    </CardDescription>
                    <CardTitle className="text-3xl">{usageData.collaborators}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Team members</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Storage Used
                    </CardDescription>
                    <CardTitle className="text-3xl">{usageData.storageUsed}GB</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={storagePercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      of {usageData.storageTotal}GB total
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Billing Period
                    </CardDescription>
                    <CardTitle className="text-xl">{usageData.currentMonth}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Resets on Dec 1</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Details</CardTitle>
                  <CardDescription>
                    Your plan includes 50 analysis reports per month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Portfolio Health Reports</p>
                        <p className="text-sm text-muted-foreground">12 generated this month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Comparative Analyses</p>
                        <p className="text-sm text-muted-foreground">15 generated this month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">15</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Compliance Audits</p>
                        <p className="text-sm text-muted-foreground">5 generated this month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">5</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upgrade Notice */}
              <Card className="border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Need More Reports?
                  </CardTitle>
                  <CardDescription>
                    Upgrade your plan for unlimited reports and advanced features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      View Plans
                    </button>
                    <button className="px-4 py-2 border border-border rounded-md hover:bg-muted">
                      Contact Sales
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Usage;
