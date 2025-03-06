
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Info, Globe, Database, ArrowRight, Wifi, LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Form schema validation
const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  dataType: z.enum(["reviews", "forum", "blog", "product", "all"], {
    required_error: "Please select the type of data to extract",
  }),
  depth: z.enum(["1", "2", "3"], {
    required_error: "Please select crawl depth",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface WebCrawlerFormProps {
  onCrawlComplete: (url: string, results: any) => void;
}

export const WebCrawlerForm = ({ onCrawlComplete }: WebCrawlerFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      dataType: "all",
      depth: "2",
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setProgress(0);
    
    try {
      // Simulate progress updates with more realistic increments
      const progressInterval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress < 30) {
            // Initial crawling phase - slower progress
            return prevProgress + Math.random() * 5;
          } else if (prevProgress < 70) {
            // Main data extraction phase
            return prevProgress + Math.random() * 10;
          } else if (prevProgress < 95) {
            // Data processing phase - slower again
            return prevProgress + Math.random() * 3;
          }
          return 95; // Cap at 95% until complete
        });
      }, 500);
      
      // In a real implementation, this would call a backend service
      // to crawl the website and extract data
      
      // Simulate API delay with a more realistic timing
      await new Promise(resolve => setTimeout(resolve, 7000));
      
      // Simulate crawl results with more detailed and useful information
      const mockResults = {
        url: values.url,
        dataType: values.dataType,
        crawlDepth: parseInt(values.depth),
        pagesAnalyzed: Math.floor(Math.random() * 30) + 10,
        extractedData: {
          products: [
            {
              name: "Hydrating Face Serum",
              averageRating: 4.2,
              reviewCount: 87,
              priceRange: "£28-£35",
              usageEstimate: "4-6 weeks",
              keyIngredients: ["Hyaluronic Acid", "Vitamin E", "Aloe Vera"],
              sentimentScore: 0.78,
              valueScore: 82,
              costEfficiency: "High",
              valueInsights: [
                "Lasts longer than average for this category",
                "High satisfaction relative to price point",
                "Positively mentioned for skin improvement"
              ]
            },
            {
              name: "Nourishing Night Cream",
              averageRating: 4.5,
              reviewCount: 124,
              priceRange: "£32-£40",
              usageEstimate: "8-12 weeks",
              keyIngredients: ["Retinol", "Peptides", "Jojoba Oil"],
              sentimentScore: 0.85,
              valueScore: 88,
              costEfficiency: "Very High",
              valueInsights: [
                "Exceptional longevity compared to competitors",
                "Small amount needed per application",
                "Multi-benefit functionality reduces need for other products"
              ]
            }
          ],
          reviews: [
            {
              text: "I've been using this product for about a month and I'm already seeing results. My skin feels more hydrated and looks brighter. Will definitely repurchase!",
              rating: 5,
              sentiment: 0.92,
              usageInfo: "Daily for 4 weeks",
              valueInsight: "Noticed results quickly, justified the price"
            },
            {
              text: "Good product but a bit pricey. I like how it absorbs quickly and doesn't leave a greasy feeling. Has lasted me about 6 weeks with daily use.",
              rating: 4,
              sentiment: 0.68,
              usageInfo: "Daily for 6 weeks",
              valueInsight: "Above average longevity for this category"
            },
            {
              text: "This serum is worth every penny. It's improved my skin texture significantly and even though it's expensive, a little goes a long way. My bottle has lasted nearly 3 months.",
              rating: 5,
              sentiment: 0.95,
              usageInfo: "Daily for 12 weeks",
              valueInsight: "Exceptional longevity, high cost-per-use efficiency"
            }
          ],
          usagePatterns: {
            averageUsageDuration: "5.8 weeks",
            applicationFrequency: "1.2 times daily",
            typicalApplicationAmount: "2-3 pumps",
            seasonalVariation: "Higher usage in winter months",
            valueTrends: [
              "Users who apply less product report similar results",
              "Morning application provides more perceived value than evening",
              "Users who store product properly report 20% longer lifespan"
            ]
          },
          valueAnalysis: {
            costPerDay: "£0.78",
            costPerUse: "£0.64",
            valueScore: 84,
            competitiveAnalysis: "Top quartile value in category",
            valueDrivers: [
              "Above average longevity",
              "Multiple benefits reducing need for additional products",
              "Positive satisfaction sentiment across price points"
            ]
          }
        }
      };
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Short delay to ensure progress bar shows 100%
      setTimeout(() => {
        toast({
          title: "Crawl Complete",
          description: `Successfully analyzed ${mockResults.pagesAnalyzed} pages from ${values.url} with valuable insights`,
        });
        
        onCrawlComplete(values.url, mockResults);
        setIsLoading(false);
      }, 800);
      
    } catch (error) {
      console.error("Error during web crawl:", error);
      toast({
        title: "Crawl Failed",
        description: error instanceof Error ? error.message : "Failed to crawl the website",
        variant: "destructive",
      });
      setIsLoading(false);
      setProgress(0);
    }
  };
  
  return (
    <div className="space-y-6">
      <Alert className="bg-amber-50 border-amber-200 animate-fade-in">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Internet Data Mining</AlertTitle>
        <AlertDescription className="text-amber-700">
          This tool crawls websites to extract product information and customer experiences, enhancing our value metrics with real-world data.
        </AlertDescription>
      </Alert>
      
      <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <CardHeader className="pb-2 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-700 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-600" />
                Web Crawler
              </CardTitle>
              <CardDescription>
                Mine the internet for product value data
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Database className="h-3 w-3 mr-1" />
              <span>AI Analysis</span>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <LinkIcon className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                      Website URL
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="https://example.com" 
                          {...field}
                          className="focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 pl-10" 
                        />
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dataType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Database className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                        Data Type
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-2 focus:ring-offset-1 focus:ring-blue-400">
                            <SelectValue placeholder="Select data type to extract" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="reviews">Product Reviews</SelectItem>
                          <SelectItem value="forum">Forum Discussions</SelectItem>
                          <SelectItem value="blog">Blog Articles</SelectItem>
                          <SelectItem value="product">Product Information</SelectItem>
                          <SelectItem value="all">All Available Data</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="depth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Wifi className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                        Crawl Depth
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-2 focus:ring-offset-1 focus:ring-blue-400">
                            <SelectValue placeholder="Select crawl depth" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Shallow (Current Page Only)</SelectItem>
                          <SelectItem value="2">Medium (Link Depth 2)</SelectItem>
                          <SelectItem value="3">Deep (Link Depth 3)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {isLoading && (
                <div className="space-y-2 bg-blue-50 p-3 rounded-lg border border-blue-100 animate-fade-in">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700 font-medium flex items-center">
                      {progress < 30 ? (
                        <>
                          <LinkIcon className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
                          Scanning website structure...
                        </>
                      ) : progress < 70 ? (
                        <>
                          <Database className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
                          Extracting product data...
                        </>
                      ) : progress < 95 ? (
                        <>
                          <ArrowRight className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
                          Analyzing value metrics...
                        </>
                      ) : (
                        <>
                          <Info className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
                          Finalizing results...
                        </>
                      )}
                    </span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Crawling Website...
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Start Data Mining
                  </>
                )}
              </Button>
            </form>
          </Form>
          
          {!isLoading && (
            <div className="mt-5 bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-600 space-y-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="font-medium text-gray-700 mb-1">How It Works:</div>
              <div className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">1</span>
                <p>Our AI crawler visits the specified website and analyzes the content</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">2</span>
                <p>The system extracts product information, customer reviews, and usage patterns</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">3</span>
                <p>AI algorithms calculate true value metrics based on this real-world data</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">4</span>
                <p>Results are displayed and can be integrated into your product listings</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
