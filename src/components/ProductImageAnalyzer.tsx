import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/shadcn";
import { Camera, Upload, RefreshCw, ShoppingCart, Calendar, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PredictiveAnalysisService, ImageRecognitionResult } from "@/utils/PredictiveAnalysisService";
import { ProductSubscriptionService } from "@/utils/ProductSubscriptionService";
import { Progress } from "@/components/ui/progress";

interface ProductImageAnalyzerProps {
  customerId?: string;
  onReorder?: (productId: string) => void;
  onSubscribe?: (productId: string, interval: number) => void;
}

const ProductImageAnalyzer: React.FC<ProductImageAnalyzerProps> = ({
  customerId = "current-user", // In production, this would come from auth context
  onReorder,
  onSubscribe
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImageRecognitionResult | null>(null);
  const [deliveryEstimate, setDeliveryEstimate] = useState<{ minDays: number; maxDays: number } | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysisResult(null);
        setDeliveryEstimate(null);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const toggleCamera = async () => {
    setShowCamera(!showCamera);
    
    if (!showCamera && videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast({
          title: "Camera Error",
          description: "Could not access your camera. Please check permissions.",
          variant: "destructive"
        });
        setShowCamera(false);
      }
    } else if (showCamera && videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };
  
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoDataUrl = canvas.toDataURL('image/jpeg');
        setImage(photoDataUrl);
        toggleCamera();
        setAnalysisResult(null);
        setDeliveryEstimate(null);
      }
    }
  };
  
  const analyzeImage = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    try {
      toast({
        title: "Analyzing Product",
        description: "Our AI is identifying your product and analyzing usage...",
      });
      
      const result = await PredictiveAnalysisService.processProductImage(image, customerId);
      setAnalysisResult(result);
      
      if (result.productId) {
        const estimate = await PredictiveAnalysisService.getReorderDeliveryEstimate(result.productId);
        if (estimate.inStock) {
          setDeliveryEstimate({ minDays: estimate.minDays, maxDays: estimate.maxDays });
        }
        
        toast({
          title: "Product Identified",
          description: `We've identified ${result.productName} with ${result.estimatedRemainingPercentage}% remaining.`,
        });
      }
      
      if (result.confidenceScore < 0.6) {
        toast({
          title: "Low Confidence Match",
          description: "We're not entirely sure about this product. Please confirm it's correct.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReorder = () => {
    if (!analysisResult) return;
    
    if (onReorder) {
      onReorder(analysisResult.productId);
    } else {
      toast({
        title: "Order Placed",
        description: `Your ${analysisResult.productName} has been added to cart.`
      });
    }
  };
  
  const handleSubscribe = () => {
    if (!analysisResult) return;
    
    const optimalInterval = analysisResult.estimatedDaysRemaining > 0 
      ? ProductSubscriptionService.calculateOptimalInterval(analysisResult.estimatedDaysRemaining)
      : 30;
    
    if (onSubscribe) {
      onSubscribe(analysisResult.productId, optimalInterval);
    } else {
      toast({
        title: "Subscription Added",
        description: `Subscription for ${analysisResult.productName} added. It will ship every ${optimalInterval} days.`
      });
    }
  };
  
  const handleReset = () => {
    setImage(null);
    setAnalysisResult(null);
    setDeliveryEstimate(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  return (
    <Card className="p-5">
      <Heading className="text-xl font-semibold mb-4">Product Replenishment Scanner</Heading>
      <Text className="text-gray-600 mb-6">
        Take a photo of your nearly empty product, and we'll tell you when it will run out and offer a convenient reorder.
      </Text>
      
      {!image && !showCamera && (
        <div className="mb-6 flex flex-col items-center">
          <div className="flex gap-3 mb-4">
            <Button 
              onClick={handleUploadClick} 
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              Upload Photo
            </Button>
            <Button 
              onClick={toggleCamera}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Camera size={16} />
              Take Photo
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-md hover:bg-gray-50 transition-colors">
            <div className="flex justify-center mb-4">
              <Camera size={48} className="text-gray-400" />
            </div>
            <Text className="text-gray-500 mb-2">Upload or take a photo of your product</Text>
            <Text className="text-gray-400 text-sm">
              For best results, ensure good lighting and that the product label is visible
            </Text>
          </div>
        </div>
      )}
      
      {showCamera && (
        <div className="mb-6 flex flex-col items-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg border">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-auto"
            />
            <Button 
              onClick={capturePhoto}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2"
            >
              <Camera size={16} />
              Capture
            </Button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <Button 
            onClick={toggleCamera}
            variant="outline"
            className="mt-3"
          >
            Cancel
          </Button>
        </div>
      )}
      
      {image && !isAnalyzing && !analysisResult && (
        <div className="mb-6 flex flex-col items-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg border mb-3">
            <img src={image} alt="Product" className="w-full h-auto" />
          </div>
          <div className="flex gap-3">
            <Button onClick={analyzeImage} className="flex items-center gap-2">
              <RefreshCw size={16} />
              Analyze Product
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </div>
      )}
      
      {isAnalyzing && (
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg border mb-4 opacity-60">
            <img src={image!} alt="Product being analyzed" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
          </div>
          
          <div className="flex flex-col items-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700 mb-4"></div>
            <div className="space-y-1">
              <Text className="text-blue-800 font-medium">Analyzing your product...</Text>
              <div className="flex flex-col items-center space-y-1 text-sm text-gray-500">
                <p>Identifying product type</p>
                <p>Estimating remaining amount</p>
                <p>Analyzing usage patterns</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-md bg-blue-50 p-3 rounded-md text-blue-700 text-sm">
            This typically takes 2-3 seconds. Our AI is examining the image to identify your product
            and estimate how much is left.
          </div>
        </div>
      )}
      
      {analysisResult && (
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3">
              <div className="rounded-lg border overflow-hidden mb-3 shadow-sm hover:shadow-md transition-shadow">
                <img src={image!} alt={analysisResult.productName} className="w-full h-auto" />
              </div>
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="w-full"
              >
                Scan Another Product
              </Button>
            </div>
            
            <div className="w-full md:w-2/3 space-y-4">
              <div className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Heading className="text-lg font-medium">{analysisResult.productName}</Heading>
                    <Text className="text-sm text-gray-500">
                      {analysisResult.matchedInCatalog ? 
                        "Product identified in our catalog" : 
                        "Product might not be from our store"}
                    </Text>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    analysisResult.confidenceScore > 0.8 
                      ? 'bg-green-50 text-green-800' 
                      : analysisResult.confidenceScore > 0.6 
                      ? 'bg-blue-50 text-blue-800'
                      : 'bg-amber-50 text-amber-800'
                  }`}>
                    {Math.round(analysisResult.confidenceScore * 100)}% match
                  </div>
                </div>
                
                {analysisResult.purchaseInfo ? (
                  <div className="mb-4 bg-gray-50 p-3 rounded-md">
                    <h3 className="text-sm font-medium mb-1">Purchase History</h3>
                    <div className="text-sm text-gray-600">
                      <p>Purchased on {formatDate(analysisResult.purchaseInfo.purchaseDate)}</p>
                      <p>Original size: {analysisResult.purchaseInfo.originalQuantity}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 text-sm text-amber-600 flex items-center gap-1.5 bg-amber-50 p-3 rounded-md">
                    <AlertCircle size={16} />
                    Purchase history not found for this product
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Product Remaining</span>
                    <span className="text-sm font-medium">{analysisResult.estimatedRemainingPercentage}%</span>
                  </div>
                  <Progress 
                    value={analysisResult.estimatedRemainingPercentage} 
                    className="h-2.5" 
                    indicatorClassName={
                      analysisResult.estimatedRemainingPercentage < 15 ? "bg-red-500" : 
                      analysisResult.estimatedRemainingPercentage < 30 ? "bg-amber-500" : 
                      "bg-blue-600"
                    }
                  />
                </div>
                
                {analysisResult.estimatedDaysRemaining > 0 && (
                  <div className={`p-4 rounded-md mb-4 ${
                    analysisResult.estimatedDaysRemaining <= 7 
                      ? 'bg-red-50 border border-red-200'
                      : analysisResult.estimatedDaysRemaining <= 14
                      ? 'bg-amber-50 border border-amber-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className="flex gap-2 items-center mb-1">
                      <Calendar size={18} className={
                        analysisResult.estimatedDaysRemaining <= 7 
                          ? 'text-red-600'
                          : analysisResult.estimatedDaysRemaining <= 14
                          ? 'text-amber-600'
                          : 'text-blue-600'
                      } />
                      <Heading className={`text-base font-medium ${
                        analysisResult.estimatedDaysRemaining <= 7 
                          ? 'text-red-800'
                          : analysisResult.estimatedDaysRemaining <= 14
                          ? 'text-amber-800'
                          : 'text-blue-800'
                      }`}>
                        Time to Reorder
                      </Heading>
                    </div>
                    <Text className={
                      analysisResult.estimatedDaysRemaining <= 7 
                        ? 'text-red-700'
                        : analysisResult.estimatedDaysRemaining <= 14
                        ? 'text-amber-700'
                        : 'text-blue-700'
                    }>
                      {analysisResult.estimatedDaysRemaining <= 7 ? (
                        <span className="font-medium">Your product will run out in approximately {analysisResult.estimatedDaysRemaining} days. We recommend reordering soon.</span>
                      ) : analysisResult.estimatedDaysRemaining <= 14 ? (
                        <span>Your product will run out in about {analysisResult.estimatedDaysRemaining} days. Consider reordering in the next week.</span>
                      ) : (
                        <span>Your product will last approximately {analysisResult.estimatedDaysRemaining} days.</span>
                      )}
                    </Text>
                  </div>
                )}
                
                {deliveryEstimate && (
                  <div className="text-sm bg-green-50 p-3 rounded-md text-green-700 border border-green-200 mb-4">
                    <p className="font-medium mb-1">Delivery Estimate</p>
                    <p>Your order will arrive in {deliveryEstimate.minDays}-{deliveryEstimate.maxDays} days</p>
                    {analysisResult.estimatedDaysRemaining > deliveryEstimate.maxDays && (
                      <p className="text-xs mt-1">Your product will arrive before you run out!</p>
                    )}
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handleReorder}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <ShoppingCart size={16} />
                    Reorder Now
                  </Button>
                  <Button 
                    onClick={handleSubscribe}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Calendar size={16} />
                    Subscribe & Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t pt-4 mt-2">
        <Heading className="text-lg font-medium mb-2">How It Works</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-50 text-blue-700 p-3 rounded-full mb-2">
              <Camera size={24} />
            </div>
            <Text className="font-medium mb-1">Take a Photo</Text>
            <Text className="text-gray-600">Capture your nearly empty product</Text>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-50 text-purple-700 p-3 rounded-full mb-2">
              <RefreshCw size={24} />
            </div>
            <Text className="font-medium mb-1">AI Analysis</Text>
            <Text className="text-gray-600">Our AI identifies the product and estimates remaining amount</Text>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-50 text-green-700 p-3 rounded-full mb-2">
              <ShoppingCart size={24} />
            </div>
            <Text className="font-medium mb-1">Easy Reordering</Text>
            <Text className="text-gray-600">Reorder directly or set up a subscription</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductImageAnalyzer;
