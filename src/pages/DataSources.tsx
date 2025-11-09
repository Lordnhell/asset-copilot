import { ArrowLeft, Plus, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataSources = () => {
  const navigate = useNavigate();

  const connectedSources = [
    {
      name: "J.P. Morgan Email",
      email: "connected@email.com",
      status: "connected",
    },
    {
      name: "UOB Kay Hian Email",
      email: "trading@uob.com",
      status: "connected",
    },
    {
      name: "Bloomberg API",
      email: "",
      status: "not_connected",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

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
              <CardContent className="flex items-center justify-between p-6">
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
                {source.status === "not_connected" && (
                  <Button variant="outline">Connect</Button>
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
    </div>
  );
};

export default DataSources;
