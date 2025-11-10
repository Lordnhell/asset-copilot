import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, Plug, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ProgressSteps from "@/components/ProgressSteps";

const DataIntegration = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const steps = [
    { label: "Account", status: "completed" as const },
    { label: "Portfolio Setup", status: "completed" as const },
    { label: "Data Integration", status: "active" as const },
  ];

  const integrationMethods = [
    {
      id: "email",
      icon: Mail,
      title: "Email Integration",
      description: "We securely connect to your mailbox to auto-ingest quotes from your banks.",
      bestFor: "Private bank emails, term sheets",
    },
    {
      id: "pdf",
      icon: FileText,
      title: "PDF Upload",
      description: "Manually upload term sheets and pricing emails in PDF format.",
      bestFor: "One-time analysis, ad-hoc quotes",
    },
    {
      id: "api",
      icon: Plug,
      title: "API Feeds",
      description: "Connect directly to premium data feeds (Bloomberg, Refinitiv).",
      bestFor: "Bloomberg, Refinitiv, institutional feeds",
    },
  ];

  const handleSubmit = () => {
    if (!selectedMethod) {
      toast.error("Please select a data integration method");
      return;
    }

    toast.success("Our integration team will contact you within 24 hours!");
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleBack = () => {
    navigate("/portfolio-setup");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back and Cancel Buttons */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
          >
            Cancel Setup
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Progress */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4">
                ONBOARDING PROGRESS
              </h2>
              <ProgressSteps steps={steps} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Connect Your Data Sources
              </h1>
              <p className="text-muted-foreground">
                How do you receive quotations from your banks? We'll handle the
                integration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {integrationMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;

                return (
                  <Card
                    key={method.id}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "border-accent ring-2 ring-accent" : "hover:border-accent"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle className="text-foreground">
                        {method.title}
                      </CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Best for:
                        </span>{" "}
                        {method.bestFor}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!selectedMethod}
              size="lg"
              className="w-full"
            >
              Submit Request to Our Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataIntegration;
