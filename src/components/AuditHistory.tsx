import { FileText, Download, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuditRecord {
  id: string;
  timestamp: string;
  analysis: string;
  dataSources: string[];
  model: string;
  recommendation: string;
  status: "completed" | "draft" | "exported";
}

export const AuditHistory = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const auditRecords: AuditRecord[] = [
    {
      id: "A-2024-001",
      timestamp: "2024-01-15 14:23:45",
      analysis: "NVDA FCN Analysis",
      dataSources: ["UOB Email", "JPM Email", "DBS Email"],
      model: "QuantAI Risk Model v2.1",
      recommendation: "UOB Kay Hian - 82/100 Score",
      status: "completed",
    },
    {
      id: "A-2024-002",
      timestamp: "2024-01-14 10:15:22",
      analysis: "JPM Corporate Bonds",
      dataSources: ["JPM Portal", "Bloomberg"],
      model: "QuantAI Risk Model v2.1",
      recommendation: "Approved for booking",
      status: "completed",
    },
    {
      id: "A-2024-003",
      timestamp: "2024-01-13 16:45:11",
      analysis: "UOB Structured Note",
      dataSources: ["UOB Portal"],
      model: "QuantAI Risk Model v2.0",
      recommendation: "Requires IC review",
      status: "exported",
    },
  ];

  const filteredRecords = auditRecords.filter(record =>
    record.analysis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadAudit = (id: string) => {
    toast({
      title: "Download Started",
      description: `Audit pack ${id} is being prepared for download.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by analysis name or ID..."
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

      <div className="space-y-3">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="hover:border-accent/40 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{record.analysis}</h3>
                    <Badge variant="outline" className="text-xs">
                      {record.id}
                    </Badge>
                    {record.status === "exported" && (
                      <Badge variant="secondary" className="text-xs">Exported</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{record.timestamp}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadAudit(record.id)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Pack
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Data Sources</span>
                  <div className="flex flex-wrap gap-1">
                    {record.dataSources.map((source, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Model</span>
                  <span className="text-xs text-foreground">{record.model}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Recommendation</span>
                  <span className="text-xs text-foreground">{record.recommendation}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRecords.length === 0 && (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No audit records found</p>
          </Card>
        )}
      </div>
    </div>
  );
};
