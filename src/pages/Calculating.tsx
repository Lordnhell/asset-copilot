import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Calculating = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: "🔍", text: "Selecting optimal quant models..." },
    { icon: "⚙️", text: "Calculating DV01, Z-Spread, Scenarios..." },
    { icon: "📊", text: "Synthesizing results with Co-Pilot..." },
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    steps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index);
      }, index * 2500);
      timers.push(timer);
    });

    const finalTimer = setTimeout(() => {
      navigate("/comparative-analysis");
    }, steps.length * 2500 + 500);
    timers.push(finalTimer);

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="bg-accent/10 p-8 rounded-full animate-pulse-slow">
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
          <p className="text-sm text-muted-foreground">
            Running quantitative risk models...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculating;
