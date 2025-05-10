
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, BrainCircuit, Database, MessageSquareText } from "lucide-react";
import { ShopifyDevAssistantService, DevAssistantAction, DevAssistantResponse, TrainingDocument } from "@/utils/ShopifyDevAssistantService";
import { useToast } from "@/hooks/use-toast";

export default function ShopifyDevAssistant() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<DevAssistantResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const { toast } = useToast();

  const handleQuery = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a question or command",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const assistantResponse = await ShopifyDevAssistantService.queryAssistant({
        query,
        customerId: customerId || undefined,
        productId: productId || undefined,
        context: {
          // Add any additional context here
          appSection: activeTab,
          timestamp: new Date().toISOString()
        }
      });
      
      setResponse(assistantResponse);
    } catch (error) {
      console.error("Error querying assistant:", error);
      toast({
        title: "Query Error",
        description: error instanceof Error ? error.message : "Failed to get a response",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrainAssistant = async () => {
    setIsLoading(true);
    try {
      // Generate training documents
      const documents = ShopifyDevAssistantService.generateTrainingDocuments();
      
      // Train the assistant
      const success = await ShopifyDevAssistantService.trainAssistant(documents);
      
      if (success) {
        toast({
          title: "Training Successful",
          description: `Assistant trained with ${documents.length} documents about payday patterns and value metrics`
        });
      }
    } catch (error) {
      console.error("Error training assistant:", error);
      toast({
        title: "Training Error",
        description: error instanceof Error ? error.message : "Failed to train the assistant",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const executeAction = async (action: DevAssistantAction) => {
    setIsLoading(true);
    try {
      const success = await ShopifyDevAssistantService.executeAction(action);
      
      if (success) {
        toast({
          title: "Action Executed",
          description: action.description
        });
      }
    } catch (error) {
      console.error("Error executing action:", error);
      toast({
        title: "Action Error",
        description: error instanceof Error ? error.message : "Failed to execute the action",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6" />
          Shopify Dev Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about payday patterns, value metrics, or request specific actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="chat">Assistant Chat</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="customerId" className="text-sm font-medium mb-1 block">
                  Customer ID (optional)
                </label>
                <Input
                  id="customerId"
                  placeholder="Enter customer ID"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="productId" className="text-sm font-medium mb-1 block">
                  Product ID (optional)
                </label>
                <Input
                  id="productId"
                  placeholder="Enter product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask about payday patterns, value metrics, or request specific actions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleQuery} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            
            {response && (
              <div className="mt-6 space-y-4">
                <div className="bg-muted p-4 rounded-lg relative">
                  <Badge className="absolute top-2 right-2" variant={response.confidence > 0.8 ? "default" : "outline"}>
                    Confidence: {Math.round(response.confidence * 100)}%
                  </Badge>
                  <p className="mb-2">{response.answer}</p>
                  
                  {response.dataPoints && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <h4 className="text-sm font-medium mb-2">Additional Information:</h4>
                      <ul className="text-sm">
                        {Object.entries(response.dataPoints).map(([key, value]) => (
                          <li key={key} className="flex items-start gap-2 mb-1">
                            <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                            <span>{Array.isArray(value) ? value.join(', ') : value.toString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {response.suggestedActions && response.suggestedActions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Suggested Actions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {response.suggestedActions.map((action, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm"
                          onClick={() => executeAction(action)}
                          disabled={isLoading}
                        >
                          {action.description}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="training" className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Training Documents
              </h3>
              <p className="text-sm mb-4">
                The assistant has been pre-configured with knowledge about:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Payday pattern detection and analysis</li>
                <li>Value metrics calculation and interpretation</li>
                <li>Optimal reminder timing algorithms</li>
                <li>Customer segmentation based on payday patterns</li>
                <li>Product usage prediction models</li>
              </ul>
              
              <Button 
                onClick={handleTrainAssistant} 
                disabled={isLoading}
                className="mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Training...
                  </>
                ) : (
                  <>Train Assistant</>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Integration Settings</h3>
              <p className="text-sm mb-4">
                The MCP Server integration connects with our Gadget.dev backend for AI-powered features.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Connection Status
                  </label>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Environment
                  </label>
                  <span className="text-sm">Development</span>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    MCP Server Version
                  </label>
                  <span className="text-sm">2.1.0</span>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Last Trained
                  </label>
                  <span className="text-sm">Today</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <MessageSquareText className="h-3 w-3" />
          Powered by Shopify Dev Assistant + Essentual AI
        </div>
        <Button variant="link" size="sm" className="text-xs" onClick={() => window.open('https://shopify.dev/changelog/mcp-server-for-the-shopify-dev-assistant', '_blank')}>
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
}
