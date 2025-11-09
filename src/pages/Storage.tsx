import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Search, FileText, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  quotation: string;
  status: "completed" | "processing" | "failed";
  size: string;
}

const Storage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const reports: Report[] = [
    {
      id: "R-2025-001",
      title: "Q4 Fixed Income Portfolio Analysis",
      type: "Portfolio Health",
      date: "2025-11-08",
      quotation: "Q-BND-2025-047",
      status: "completed",
      size: "2.3 MB",
    },
    {
      id: "R-2025-002",
      title: "Deutsche Bank vs UBS Quote Comparison",
      type: "Comparative Analysis",
      date: "2025-11-07",
      quotation: "Q-BND-2025-048, Q-BND-2025-049",
      status: "completed",
      size: "1.8 MB",
    },
    {
      id: "R-2025-003",
      title: "November Compliance Audit Report",
      type: "Compliance & Audit",
      date: "2025-11-06",
      quotation: "Multiple Sources",
      status: "completed",
      size: "3.1 MB",
    },
    {
      id: "R-2025-004",
      title: "Emerging Markets Bond Allocation",
      type: "Scenario Analysis",
      date: "2025-11-05",
      quotation: "Q-BND-2025-051",
      status: "completed",
      size: "2.7 MB",
    },
    {
      id: "R-2025-005",
      title: "Credit Risk Assessment - October",
      type: "Portfolio Health",
      date: "2025-10-28",
      quotation: "Q-BND-2025-045",
      status: "completed",
      size: "2.9 MB",
    },
  ];

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.quotation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (reportId: string, title: string) => {
    toast({
      title: "Downloading Report",
      description: `${title} - ${reportId}.pdf`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "processing":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "failed":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Portfolio Health":
        return <TrendingUp className="w-4 h-4" />;
      case "Comparative Analysis":
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-6 bg-card">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold ml-4">Report Storage</h1>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports by title, ID, or quotation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Reports</p>
                        <p className="text-2xl font-bold">{reports.length}</p>
                      </div>
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold">4</p>
                      </div>
                      <Calendar className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Size</p>
                        <p className="text-2xl font-bold">12.8 GB</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reports List */}
              <div className="space-y-3">
                {filteredReports.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No reports found</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="mt-1">{getTypeIcon(report.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg truncate">
                                  {report.title}
                                </h3>
                                <Badge className={getStatusColor(report.status)}>
                                  {report.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                <p>
                                  <span className="font-medium">ID:</span> {report.id}
                                </p>
                                <p>
                                  <span className="font-medium">Type:</span> {report.type}
                                </p>
                                <p>
                                  <span className="font-medium">Date:</span>{" "}
                                  {new Date(report.date).toLocaleDateString()}
                                </p>
                                <p>
                                  <span className="font-medium">Size:</span> {report.size}
                                </p>
                                <p className="sm:col-span-2">
                                  <span className="font-medium">Quotation:</span>{" "}
                                  {report.quotation}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(report.id, report.title)}
                            className="lg:ml-4"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Storage;
