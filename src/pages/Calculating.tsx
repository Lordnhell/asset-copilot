import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Calculating = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const steps = [
    { icon: "🔍", text: "Selecting curves and market data..." },
    { icon: "⚙️", text: "Calculating DV01, OAS, scenarios..." },
    { icon: "📊", text: "Synthesizing results with Co-Pilot..." },
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    steps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index);
      }, index * 2000);
      timers.push(timer);
    });

    const finalTimer = setTimeout(() => {
      navigate("/comparative-analysis");
    }, steps.length * 2000 + 500);
    timers.push(finalTimer);

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cancel Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCancel}
        className="absolute top-6 right-6 z-20"
      >
        <X className="w-5 h-5" />
      </Button>

      {/* Animated circuit board pattern */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(180deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="text-center space-y-8 animate-fade-in relative z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-8 rounded-full animate-pulse-slow">
            <div className="text-6xl">{steps[currentStep]?.icon}</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {steps[currentStep]?.text}
          </h2>
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index <= currentStep ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleCancel}
          className="mt-8"
        >
          Cancel Analysis
        </Button>
      </div>
    </div>
  );
};

export default Calculating;
