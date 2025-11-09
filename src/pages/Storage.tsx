import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Download, Search, FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const Storage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const reports = [
    {
      id: 1,
      title: "Temasek 2030 Analysis",
      type: "Corporate Bond Analysis",
      date: "2024-12-01",
      quotation: "DBS Bank - Temasek Holdings $1M YTM 3.45%",
      category: "Corporate",
      status: "completed",
      size: "2.1 MB",
    },
    {
      id: 2,
      title: "DBS Senior 2030 Comparison",
      type: "Corporate Bond Analysis",
      date: "2024-11-28",
      quotation: "J.P. Morgan - DBS Bank Senior $1M YTM 3.88%",
      category: "Corporate",
      status: "completed",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "CapitaLand 2031 Quote Review",
      type: "Corporate Bond Analysis",
      date: "2024-11-25",
      quotation: "UOB Kay Hian - CapitaLand $1M YTM 4.25%",
      category: "Corporate",
      status: "completed",
      size: "2.3 MB",
    },
    {
      id: 4,
      title: "Corporate Bond Portfolio Review",
      type: "Portfolio Analysis",
      date: "2024-11-20",
      quotation: "Multiple Issuers - SG Corporate Bonds",
      category: "Corporate",
      status: "completed",
      size: "3.2 MB",
    },
    {
      id: 5,
      title: "DRAFT: UOB 2028 Senior Bond",
      type: "Corporate Bond Analysis",
      date: "2024-11-15",
      quotation: "UOB Bank - Senior Unsecured $1M",
      category: "Corporate",
      status: "draft",
      size: "1.5 MB",
    },
    {
      id: 6,
      title: "Singtel 2032 Analysis",
      type: "Corporate Bond Analysis",
      date: "2024-11-10",
      quotation: "DBS Bank - Singapore Telecom $1M YTM 3.38%",
      category: "Corporate",
      status: "completed",
      size: "1.9 MB",
    },
  ];

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.quotation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "draft":
        return <Clock className="w-4 h-4 text-warning" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "draft":
        return "Draft";
      case "error":
        return "Error";
      default:
        return status;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analysis Reports</h1>
                <p className="text-muted-foreground mt-1">
                  {filteredReports.length} reports available
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title, type, or quotation..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Reports List */}
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <Card
                  key={report.id}
                  className="hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-foreground text-lg">
                            {report.title}
                          </h3>
                          {getStatusIcon(report.status)}
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                        </div>
                        
                        <div className="ml-8 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Quotation:</span> {report.quotation}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{report.date}</span>
                            <span>•</span>
                            <span>{report.size}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              {getStatusLabel(report.status)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        disabled={report.status === "draft"}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No reports found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Storage;
