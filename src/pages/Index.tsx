import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
      toast({
        title: "Files Selected",
        description: `${e.target.files.length} file(s) ready for analysis`,
      });
    }
  };

  const handleStartAnalysis = () => {
    if (!query.trim() && !selectedFiles) {
      toast({
        title: "Input Required",
        description: "Please describe your analysis needs or attach documents",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Starting Analysis",
      description: "Processing your request...",
    });

    setTimeout(() => {
      navigate("/processing");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-yellow-500/30 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/20 via-orange-500/20 to-yellow-500/20" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">The </span>
            <span className="text-blue-100">AI-native</span>
            <span className="text-gray-900"> data preparation platform</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-800 font-medium">
            Proprietary AI components for complex agentic workflow automation.
          </p>
        </div>

        {/* Command Center Card */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8">
            <div className="space-y-4">
              <Textarea
                placeholder="Describe your analysis needs... (e.g., 'Analyze portfolio risk for Q4 bonds' or 'Compare these quotes for compliance')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-32 text-base resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <label htmlFor="file-upload" className="flex-1 w-full">
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {selectedFiles ? `${selectedFiles.length} file(s) selected` : "Attach Documents"}
                  </Button>
                </label>
                
                <Button
                  onClick={handleStartAnalysis}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8"
                  size="lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <p className="mt-12 text-center text-gray-800 text-sm md:text-base font-medium">
          Trusted by global enterprises across industries
        </p>
      </div>
    </div>
  );
};

export default Index;
