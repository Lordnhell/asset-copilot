import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

const ManualInput = () => {
  const navigate = useNavigate();
  const [productType, setProductType] = useState("");
  const [underlying, setUnderlying] = useState("");
  const [notional, setNotional] = useState("");
  const [currency, setCurrency] = useState("");
  const [maturityDate, setMaturityDate] = useState("");

  const handleSubmit = () => {
    navigate("/calculating");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back to Dashboard Button */}
        <div className="flex justify-end mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - PDF Viewer */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Original Document
            </h2>
            <div className="aspect-[8.5/11] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">JPM_NVDA_FCN.pdf</p>
            </div>
          </div>

          {/* Right Panel - Manual Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>We need your help with this document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger id="productType">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fcn">
                        Fixed Coupon Note (FCN)
                      </SelectItem>
                      <SelectItem value="dcn">
                        Digital Coupon Note (DCN)
                      </SelectItem>
                      <SelectItem value="autocall">Autocall</SelectItem>
                      <SelectItem value="bond">Corporate Bond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="underlying">Underlying Asset</Label>
                  <Input
                    id="underlying"
                    placeholder="e.g., NVDA"
                    value={underlying}
                    onChange={(e) => setUnderlying(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notional">Notional</Label>
                  <Input
                    id="notional"
                    type="number"
                    placeholder="500000"
                    value={notional}
                    onChange={(e) => setNotional(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                      <SelectItem value="sgd">SGD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maturityDate">Maturity Date</Label>
                  <Input
                    id="maturityDate"
                    type="date"
                    value={maturityDate}
                    onChange={(e) => setMaturityDate(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={handleSubmit} className="flex-1">
                    Submit for Analysis
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualInput;
