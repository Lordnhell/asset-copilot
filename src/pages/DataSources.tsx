import { Plus, Check, X, RefreshCw, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const DataSources = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const connectedSources = [
    {
      name: "J.P. Morgan Email",
      email: "connected@email.com",
      status: "connected",
      lastSync: "Today, 09:15 AM",
      syncStatus: "success",
      parsedRows: 3,
      errorRows: 0,
    },
    {
      name: "UOB Kay Hian Email",
      email: "trading@uob.com",
      status: "connected",
      lastSync: "Today, 08:42 AM",
      syncStatus: "success",
      parsedRows: 5,
      errorRows: 0,
    },
    {
      name: "DBS Email",
      email: "desk@dbs.com",
      status: "connected",
      lastSync: "Yesterday, 4:30 PM",
      syncStatus: "warning",
      parsedRows: 2,
      errorRows: 1,
    },
    {
      name: "Bloomberg API",
      email: "",
      status: "not_connected",
      lastSync: "Never",
      syncStatus: "error",
      parsedRows: 0,
      errorRows: 0,
    },
  ];

  const handleResync = (sourceName: string) => {
    toast({
      title: "Sync Started",
      description: `Re-syncing ${sourceName}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Sync Complete",
        description: `${sourceName} has been synchronized successfully.`,
      });
    }, 2000);
  };

  const handleReParse = (sourceName: string) => {
    toast({
      title: "Re-parsing File",
      description: `Re-parsing data from ${sourceName}...`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-foreground">
                Connected Data Sources
              </h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Source
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {connectedSources.map((source) => (
            <Card key={source.name}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        source.status === "connected"
                          ? "bg-success/10"
                          : "bg-muted"
                      }`}
                    >
                      {source.status === "connected" ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {source.name}
                      </h3>
                      {source.email && (
                        <p className="text-sm text-muted-foreground">
                          {source.email}
                        </p>
                      )}
                      {!source.email && (
                        <p className="text-sm text-muted-foreground">
                          Not connected - click to setup
                        </p>
                      )}
                    </div>
                  </div>
                  {source.status === "not_connected" ? (
                    <Button variant="outline">Connect</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleReParse(source.name)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Re-parse
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleResync(source.name)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Re-sync
                      </Button>
                    </div>
                  )}
                </div>

                {source.status === "connected" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Last Sync</span>
                      <span className="text-sm text-foreground">{source.lastSync}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Status</span>
                      <Badge variant={source.syncStatus === "success" ? "outline" : "destructive"} className="text-xs">
                        {source.syncStatus === "success" ? "Success" : "Warning"}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Parsed Rows</span>
                      <span className="text-sm font-semibold text-success">{source.parsedRows}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Error Rows</span>
                      <div className="flex items-center gap-1">
                        {source.errorRows > 0 && <AlertCircle className="w-3 h-3 text-warning" />}
                        <span className={`text-sm font-semibold ${source.errorRows > 0 ? 'text-warning' : 'text-foreground'}`}>
                          {source.errorRows}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-foreground">
                <span className="font-medium">Last sync:</span> Today, 09:15 AM
              </p>
              <p className="text-sm text-foreground">
                <span className="font-medium">Next auto-sync:</span> 4:00 PM
              </p>
            </div>
          </CardContent>
        </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DataSources;
