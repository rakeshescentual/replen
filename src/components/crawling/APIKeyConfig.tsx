
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Key, Check, AlertCircle } from 'lucide-react';

export const APIKeyConfig = () => {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // Check if API key is already configured
    const savedKey = FirecrawlService.getApiKey();
    setIsConfigured(!!savedKey);
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    try {
      const isValid = await FirecrawlService.testApiKey(apiKey);
      if (isValid) {
        setIsSaving(true);
        FirecrawlService.saveApiKey(apiKey);
        setIsConfigured(true);
        toast({
          title: "Success",
          description: "API key has been saved successfully",
        });
        setApiKey(''); // Clear the input for security
      } else {
        toast({
          title: "Invalid API Key",
          description: "The API key provided is not valid",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
      setIsSaving(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Key className="h-5 w-5 text-amber-600" />
        <h3 className="font-semibold text-gray-800">API Configuration</h3>
      </div>
      
      {isConfigured ? (
        <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-700 text-sm">API key is configured</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto text-xs"
            onClick={() => setIsConfigured(false)}
          >
            Change
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 text-sm">
              To use the web crawler, you need to configure your Firecrawl API key. 
              Sign up at firecrawl.dev to get your key.
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-grow">
              <Input
                type="password"
                placeholder="Enter your Firecrawl API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleSaveKey} 
              disabled={isTesting || isSaving || !apiKey.trim()}
            >
              {isTesting ? "Testing..." : isSaving ? "Saving..." : "Save Key"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
