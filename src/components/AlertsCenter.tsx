import { useState } from "react";
import { Bell, X, AlertTriangle, Mail, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface Alert {
  id: string;
  type: "quote" | "breach" | "digest";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: "info" | "warning" | "error";
}

export const AlertsCenter = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "breach",
      title: "IPS Limit Alert",
      message: "US Equities concentration exceeded 58% (limit: 60%)",
      timestamp: "2 hours ago",
      read: false,
      severity: "warning",
    },
    {
      id: "2",
      type: "quote",
      title: "New Quote Received",
      message: "JPMorgan FCN quote for NVDA parsed successfully",
      timestamp: "5 hours ago",
      read: false,
      severity: "info",
    },
    {
      id: "3",
      type: "digest",
      title: "Weekly Summary",
      message: "3 new quotes analyzed, 1 limit alert this week",
      timestamp: "1 day ago",
      read: true,
      severity: "info",
    },
  ]);

  const unreadCount = alerts.filter(a => !a.read).length;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const getIcon = (type: Alert["type"]) => {
    switch (type) {
      case "breach": return <AlertTriangle className="w-4 h-4" />;
      case "quote": return <Mail className="w-4 h-4" />;
      case "digest": return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "error": return "text-destructive";
      case "warning": return "text-warning";
      case "info": return "text-accent";
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </Card>
            ) : (
              alerts.map((alert) => (
                <Card 
                  key={alert.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    !alert.read ? "bg-accent/5 border-accent/20" : ""
                  }`}
                  onClick={() => markAsRead(alert.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${getSeverityColor(alert.severity)}`}>
                      {getIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-foreground">{alert.title}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mt-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAlert(alert.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                        {!alert.read && (
                          <Badge variant="secondary" className="h-4 px-1.5 text-xs">New</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        <Separator className="my-4" />
        
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            Notification Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
