import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Users, HardDrive, Calendar } from "lucide-react";

const Usage = () => {
  const usageData = {
    reportsUsed: 32,
    reportsLimit: 50,
    activeCollaborators: 5,
    storageUsed: 2.4,
    storageLimit: 10,
    billingPeriod: "Jan 1 - Jan 31, 2025"
  };

  const usagePercentage = (usageData.reportsUsed / usageData.reportsLimit) * 100;
  const storagePercentage = (usageData.storageUsed / usageData.storageLimit) * 100;

  const stats = [
    {
      icon: FileText,
      label: "Reports Generated",
      value: `${usageData.reportsUsed}/${usageData.reportsLimit}`,
      percentage: usagePercentage,
      color: usagePercentage > 80 ? "bg-warning" : "bg-primary"
    },
    {
      icon: Users,
      label: "Active Collaborators",
      value: usageData.activeCollaborators,
      sublabel: "team members"
    },
    {
      icon: HardDrive,
      label: "Storage Used",
      value: `${usageData.storageUsed} GB`,
      sublabel: `of ${usageData.storageLimit} GB`,
      percentage: storagePercentage,
      color: storagePercentage > 80 ? "bg-warning" : "bg-accent"
    },
    {
      icon: Calendar,
      label: "Billing Period",
      value: usageData.billingPeriod,
      sublabel: "Current cycle"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Usage & Billing</h1>
          <p className="text-muted-foreground">
            Track your account usage and monitor your current billing cycle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                {stat.sublabel && (
                  <p className="text-sm text-muted-foreground">
                    {stat.sublabel}
                  </p>
                )}
                
                {stat.percentage !== undefined && (
                  <div className="pt-2">
                    <Progress 
                      value={stat.percentage} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.percentage.toFixed(0)}% used
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Warning if nearing limit */}
        {usagePercentage > 80 && (
          <Card className="mt-6 p-6 border-warning bg-warning/5">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-warning/20">
                <FileText className="w-5 h-5 text-warning-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Approaching Report Limit
                </h3>
                <p className="text-sm text-muted-foreground">
                  You've used {usageData.reportsUsed} out of {usageData.reportsLimit} reports this billing period. 
                  Consider upgrading your plan to continue generating reports.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Usage;
