import { HelpCircle, BookOpen, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const knowledgeItems = [
  {
    term: "DV01 (Dollar Value of 01)",
    definition: "The change in portfolio value for a 1 basis point (0.01%) move in interest rates.",
    example: "Your DV01 of $12,500 means your portfolio loses $12,500 for every 1 bp rise in rates.",
    category: "Risk Metrics",
  },
  {
    term: "Z-Spread",
    definition: "The constant spread over the zero-coupon Treasury yield curve required to match a bond's market price.",
    example: "A z-spread of 150 bp indicates the bond yields 1.5% more than equivalent Treasuries.",
    category: "Pricing",
  },
  {
    term: "Liquidity Score",
    definition: "A 0-100 rating measuring how quickly an asset can be sold without significant price impact.",
    example: "A score of 85 indicates excellent liquidity - suitable for short holding periods.",
    category: "Trading",
  },
  {
    term: "Sharpe Ratio",
    definition: "Risk-adjusted return metric calculated as (Return - Risk-Free Rate) / Volatility.",
    example: "A Sharpe of 1.62 exceeds your IPS target of 1.50, indicating good risk-adjusted performance.",
    category: "Risk Metrics",
  },
  {
    term: "VaR (Value at Risk)",
    definition: "Maximum expected loss over a time period at a given confidence level.",
    example: "95% VaR of $42,300 means 95% confidence losses won't exceed this amount.",
    category: "Risk Metrics",
  },
  {
    term: "FCN (Fixed Coupon Note)",
    definition: "Structured product paying fixed coupons, typically linked to equity performance with downside risk.",
    example: "NVDA FCN with 13.2% coupon provides fixed income unless stock falls below strike.",
    category: "Products",
  },
];

export const KnowledgePanel = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground">
          <HelpCircle className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Knowledge Center
          </SheetTitle>
          <SheetDescription>
            Plain-English explanations of key financial terms and metrics
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] mt-6">
          <div className="space-y-4">
            {knowledgeItems.map((item, idx) => (
              <Card key={idx} className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{item.term}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.definition}</p>
                  <div className="bg-accent/10 border border-accent/20 rounded p-3">
                    <p className="text-xs text-foreground">
                      <span className="font-semibold">Example: </span>
                      {item.example}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <a href="https://docs.example.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View Full Documentation
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <a href="https://videos.example.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Watch Tutorial Videos
            </a>
          </Button>
          <Button className="w-full justify-start gap-2">
            <Mail className="w-4 h-4" />
            Contact Support / Book Demo
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
