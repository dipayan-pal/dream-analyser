
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Moon, Sparkles } from "lucide-react";

const Index = () => {
  const [dream, setDream] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // In a real implementation, this would call an API
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gradient-to-b dark:from-[#1A1F2C] dark:to-[#221F26] bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Moon className="h-12 w-12 dark:text-purple-300 text-purple-600 mr-2" />
            <Sparkles className="h-12 w-12 dark:text-blue-300 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-2">Dream Weaver Insight</h1>
          <p className="text-lg dark:text-gray-300 text-gray-600">Share your dreams and discover hidden meanings</p>
        </div>

        <Card className="shadow-lg dark:bg-[#2C3E50] dark:border-gray-700 border-purple-100">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center dark:text-white">
              <span>Tell me about your dream</span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Describe your dream in as much detail as you can remember
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Last night, I dreamt about..." 
              className="min-h-[200px] text-base dark:bg-[#3A4750] dark:text-white dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-400"
              value={dream}
              onChange={(e) => setDream(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={handleAnalyze}
              disabled={dream.trim() === "" || isAnalyzing}
              className="dark:bg-gradient-to-r dark:from-purple-800 dark:to-blue-800 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 dark:hover:from-purple-900 dark:hover:to-blue-900 text-white py-6 px-8 rounded-lg font-medium text-lg min-w-[200px] transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-1" />
                  <span>Analyze Dream</span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
