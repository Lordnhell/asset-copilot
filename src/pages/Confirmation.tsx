import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, Home } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState<number[]>([]);

  const quotations = [
    {
      id: 1,
      bank: "J.P. Morgan",
      product: "U.S. Treasury 10Y 2034",
      terms: {
        issuer: "United States Treasury",
        currency: "USD",
        notional: "$1,000,000",
        priceClean: "98.20",
        yieldToMaturity: "4.35%",
        couponRate: "4.25%",
        couponFreq: "Semiannual",
        maturityDate: "2034-11-15",
        rating: "AAA",
      },
      source: "Email: 'UST 10Y Pricing'",
    },
    {
      id: 2,
      bank: "UOB Kay Hian",
      product: "SGS 10Y 2033",
      terms: {
        issuer: "Singapore Government",
        currency: "SGD",
        notional: "$1,000,000",
        priceClean: "101.10",
        yieldToMaturity: "2.95%",
        couponRate: "3.00%",
        couponFreq: "Semiannual",
        maturityDate: "2033-06-01",
        rating: "AAA",
      },
      source: "Email: 'SGS 2033 Quote'",
    },
    {
      id: 3,
      bank: "DBS Bank",
      product: "Temasek 2030",
      terms: {
        issuer: "Temasek Holdings",
        currency: "SGD",
        notional: "$1,000,000",
        priceClean: "100.40",
        yieldToMaturity: "3.45%",
        couponRate: "3.50%",
        couponFreq: "Semiannual",
        maturityDate: "2030-08-15",
        rating: "AAA",
      },
      source: "PDF: 'temasek_2030.pdf'",
    },
  ];

  const toggleConfirm = (id: number) => {
    setConfirmed(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleProceed = () => {
    navigate("/calculating");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back to Dashboard */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDashboard}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Confirm Bond Quotation Details</h1>
          <p className="text-muted-foreground">Please verify the bond details we extracted before risk analysis</p>
        </div>

        <div className="space-y-6 mb-8">
          {quotations.map((quote) => {
            const isConfirmed = confirmed.includes(quote.id);

            return (
              <Card
                key={quote.id}
                className={`bg-card border-border p-6 transition-all ${
                  isConfirmed ? "border-success" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{quote.bank}</h3>
                    <p className="text-muted-foreground">{quote.product}</p>
                  </div>
                  <Badge variant="outline" className="border-border">
                    <Mail className="mr-1 h-3 w-3" />
                    {quote.source}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-5 gap-4 mb-4">
                  {Object.entries(quote.terms).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-muted-foreground uppercase mb-1">{key}</p>
                      <p className="text-sm font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => toggleConfirm(quote.id)}
                    className={`flex-1 ${
                      isConfirmed
                        ? "bg-success hover:bg-success/90 text-success-foreground"
                        : "bg-primary hover:bg-primary-hover text-primary-foreground"
                    }`}
                  >
                    {isConfirmed ? "✓ Confirmed" : "Confirm"}
                  </Button>
                  <Button variant="outline" className="border-border">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="sticky bottom-6 flex gap-3">
          <Button
            variant="outline"
            onClick={handleBackToDashboard}
            className="w-auto"
          >
            Save & Exit
          </Button>
          <Button
            onClick={handleProceed}
            disabled={confirmed.length === 0}
            className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground text-lg h-12"
          >
            Proceed to Risk Analysis for {confirmed.length} Confirmed Quote{confirmed.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
