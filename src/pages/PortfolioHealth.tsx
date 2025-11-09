import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PortfolioHealth = () => {
  const navigate = useNavigate();

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

        <h1 className="text-3xl font-bold text-foreground mb-6">
          Portfolio Health Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-success">82/100</div>
              <p className="text-sm text-muted-foreground mt-2">
                Your portfolio is in good health
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IR Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                $12,500 DV01
              </div>
              <p className="text-sm text-success mt-2">✓ Within Limit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equity Concentration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">58%</div>
              <p className="text-sm text-warning mt-2">⚠️ US Equities High</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHealth;
