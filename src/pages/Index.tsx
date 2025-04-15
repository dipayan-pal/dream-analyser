
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Moon, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [dream, setDream] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (dream.trim() === "") {
      toast("Please enter your dream first", {
        description: "You need to describe your dream before we can analyze it."
      });
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const response = await fetch("https://dipayanpal.app.n8n.cloud/webhook-test/7a3a3f46-8f9c-4bee-9d3a-19a935f7aa55", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dream: dream,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalysisResult(JSON.stringify(data, null, 2));
      
      toast("Dream analysis complete", {
        description: "Your dream has been successfully analyzed!"
      });
      
      console.log("Webhook response:", data);
    } catch (error) {
      console.error("Error sending dream to webhook:", error);
      toast("Analysis failed", {
        description: "There was a problem analyzing your dream. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Moon className="h-12 w-12 text-purple-400 mr-2" />
            <Sparkles className="h-12 w-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Your Dream Analyser</h1>
          <p className="text-lg text-gray-300">Share your dreams and discover hidden meanings</p>
        </div>

        <Card className="shadow-lg border-gray-800 bg-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center text-gray-100">
              <span>Tell me about your dream</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Describe your dream in as much detail as you can remember
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Last night, I dreamt about..." 
              className="min-h-[200px] text-base bg-gray-700/50 border-gray-600 focus:border-purple-400 text-gray-200 placeholder:text-gray-500" 
              value={dream} 
              onChange={e => setDream(e.target.value)} 
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={handleAnalyze} 
              disabled={dream.trim() === "" || isAnalyzing} 
              className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white py-6 px-8 rounded-lg font-medium text-lg min-w-[200px] transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center gap-2"
            >
              {isAnalyzing ? <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white"></div>
                  <span>Analyzing...</span>
                </> : <>
                  <Brain className="h-5 w-5 mr-1" />
                  <span>Analyse Dream</span>
                </>}
            </Button>
          </CardFooter>
        </Card>

        {analysisResult && (
          <Card className="mt-8 shadow-lg border-gray-800 bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center text-gray-100">
                <span>Dream Analysis Results</span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Here's what we found in your dream narrative
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900/70 p-4 rounded-md border border-gray-700">
                <pre className="text-green-400 whitespace-pre-wrap overflow-auto max-h-[400px] text-sm">
                  {analysisResult}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>;
};

export default Index;
