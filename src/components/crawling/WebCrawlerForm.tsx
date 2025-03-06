
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
import { Loader2 } from "lucide-react";

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
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 500);
      
      // In a real implementation, this would call a backend service
      // to crawl the website and extract data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Simulate crawl results
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
              sentimentScore: 0.78
            },
            {
              name: "Nourishing Night Cream",
              averageRating: 4.5,
              reviewCount: 124,
              priceRange: "£32-£40",
              usageEstimate: "8-12 weeks",
              keyIngredients: ["Retinol", "Peptides", "Jojoba Oil"],
              sentimentScore: 0.85
            }
          ],
          reviews: [
            {
              text: "I've been using this product for about a month and I'm already seeing results. My skin feels more hydrated and looks brighter. Will definitely repurchase!",
              rating: 5,
              sentiment: 0.92,
              usageInfo: "Daily for 4 weeks"
            },
            {
              text: "Good product but a bit pricey. I like how it absorbs quickly and doesn't leave a greasy feeling. Has lasted me about 6 weeks with daily use.",
              rating: 4,
              sentiment: 0.68,
              usageInfo: "Daily for 6 weeks"
            }
          ],
          usagePatterns: {
            averageUsageDuration: "5.8 weeks",
            applicationFrequency: "1.2 times daily",
            typicalApplicationAmount: "2-3 pumps",
            seasonalVariation: "Higher usage in winter months"
          }
        }
      };
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Short delay to ensure progress bar shows 100%
      setTimeout(() => {
        toast({
          title: "Crawl Complete",
          description: `Successfully analyzed ${mockResults.pagesAnalyzed} pages from ${values.url}`,
        });
        
        onCrawlComplete(values.url, mockResults);
        setIsLoading(false);
      }, 500);
      
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dataType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
              <FormLabel>Crawl Depth</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
        
        {isLoading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Crawling website...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Crawling...
            </>
          ) : (
            "Start Crawling"
          )}
        </Button>
      </form>
    </Form>
  );
};
