import { Check } from "lucide-react";

interface Step {
  label: string;
  status: "completed" | "active" | "pending";
}

interface ProgressStepsProps {
  steps: Step[];
}

const ProgressSteps = ({ steps }: ProgressStepsProps) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm
              ${
                step.status === "completed"
                  ? "bg-success text-success-foreground"
                  : step.status === "active"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
          >
            {step.status === "completed" ? (
              <Check className="w-5 h-5" />
            ) : (
              index + 1
            )}
          </div>
          <span
            className={`text-sm font-medium
              ${
                step.status === "active"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
