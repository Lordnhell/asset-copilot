import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState<number[]>([]);

  const quotations = [
    {
      id: 1,
      bank: "J.P. Morgan",
      product: "FCN on NVDA",
      terms: {
        underlying: "NVIDIA Corp",
        notional: "$1,000,000",
        strike: "$485.00",
        maturity: "6 months",
        coupon: "12.5% p.a.",
      },
      source: "Email: 'FCN Pricing - NVDA'",
    },
    {
      id: 2,
      bank: "UOB Kay Hian",
      product: "FCN on NVDA",
      terms: {
        underlying: "NVIDIA Corp",
        notional: "$1,000,000",
        strike: "$480.00",
        maturity: "6 months",
        coupon: "13.2% p.a.",
      },
      source: "Email: 'NVDA FCN Terms'",
    },
    {
      id: 3,
      bank: "DBS Bank",
      product: "FCN on NVDA",
      terms: {
        underlying: "NVIDIA Corp",
        notional: "$1,000,000",
        strike: "$490.00",
        maturity: "6 months",
        coupon: "11.8% p.a.",
      },
      source: "PDF Upload: 'dbs_fcn_quote.pdf'",
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

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Confirm Quotation Details</h1>
          <p className="text-muted-foreground">Please verify the details we extracted before risk analysis</p>
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

        <div className="sticky bottom-6">
          <Button
            onClick={handleProceed}
            disabled={confirmed.length === 0}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground text-lg h-12"
          >
            Proceed to Risk Analysis for {confirmed.length} Confirmed Quote{confirmed.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
