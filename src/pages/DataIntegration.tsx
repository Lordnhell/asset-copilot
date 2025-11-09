import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, FileText, Plug, Check } from "lucide-react";
import { toast } from "sonner";

const DataIntegration = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const integrationMethods = [
    {
      id: "email",
      icon: Mail,
      title: "Email Integration",
      description: "We securely connect to your mailbox to auto-ingest quotes from your banks.",
      recommended: true,
    },
    {
      id: "pdf",
      icon: FileText,
      title: "PDF Upload",
      description: "Manually upload term sheets and pricing emails in PDF format.",
      recommended: false,
    },
    {
      id: "api",
      icon: Plug,
      title: "API Feeds",
      description: "Connect directly to premium data feeds (Bloomberg, Refinitiv).",
      recommended: false,
    },
  ];

  const handleSubmit = () => {
    if (!selectedMethod) {
      toast.error("Please select a data integration method");
      return;
    }

    toast.success("Our integration team will contact you within 24 hours.");
    
    // Simulate a delay before navigation
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Connect Your Data Sources</h1>
          <p className="text-muted-foreground">How do you receive quotations from your banks? We'll handle the integration.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {integrationMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;

            return (
              <Card
                key={method.id}
                className={`relative p-6 cursor-pointer transition-all hover:border-primary ${
                  isSelected ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                {method.recommended && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-success text-success-foreground text-xs font-semibold rounded-full">
                    Recommended
                  </div>
                )}
                
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="bg-card border-border p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-accent/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Integration Requirements</h3>
              <p className="text-sm text-muted-foreground">
                Our team will work with you to securely set up the integration. This typically takes 1-2 business days.
                We support major email providers and can handle custom API integrations.
              </p>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selectedMethod}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground text-lg h-12"
          >
            Submit Request to Our Team
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default DataIntegration;
