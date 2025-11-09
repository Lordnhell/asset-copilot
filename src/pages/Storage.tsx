import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Search, FileText, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";

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
  const [searchQuery, setSearchQuery] = useState("");

  const reports: Report[] = [
    {
      id: "1",
      title: "Emerging Markets Risk Analysis Q4 2024",
      type: "Risk Assessment",
      date: "2024-12-15",
      quotation: "Analyze portfolio exposure to emerging market volatility",
      status: "completed",
      size: "2.4 MB"
    },
    {
      id: "2",
      title: "ESG Compliance Report - December",
      type: "Compliance",
      date: "2024-12-10",
      quotation: "Review ESG compliance across all holdings",
      status: "completed",
      size: "1.8 MB"
    },
    {
      id: "3",
      title: "Portfolio Rebalancing Recommendations",
      type: "Strategy",
      date: "2024-12-05",
      quotation: "Suggest optimal rebalancing strategy for Q1 2025",
      status: "completed",
      size: "3.1 MB"
    },
    {
      id: "4",
      title: "Currency Hedging Analysis - EUR/USD",
      type: "Risk Assessment",
      date: "2024-11-28",
      quotation: "Evaluate currency hedging strategies for European exposure",
      status: "completed",
      size: "1.5 MB"
    },
    {
      id: "5",
      title: "Technology Sector Deep Dive",
      type: "Sector Analysis",
      date: "2024-11-20",
      quotation: "Comprehensive analysis of technology sector holdings",
      status: "completed",
      size: "4.2 MB"
    }
  ];

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.quotation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (reportId: string, title: string) => {
    toast.success(`Downloading: ${title}`);
    // Implement actual download logic here
  };

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "processing":
        return "bg-warning text-warning-foreground";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Report Storage</h1>
          <p className="text-muted-foreground">
            Access and download your past analysis reports
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title, type, or description..."
              className="pl-10"
            />
          </div>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reports found</p>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {report.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <Badge variant="outline" className="font-normal">
                            {report.type}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                          <span className="text-xs">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pl-11">
                      <div className="flex items-start gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground italic">
                          "{report.quotation}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDownload(report.id, report.title)}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Storage;
