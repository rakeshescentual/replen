
import React, { useState, useEffect } from 'react';
import { Card, Heading, Text } from '@/components/ui/shadcn';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TabsContent } from '@/components/ui/tabs';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowUpRight, TrendingUp, DollarSign, Mail, MousePointerClick, ShoppingCart } from 'lucide-react';
import { PersonalizedReminderService, ReminderTemplate } from '@/utils/PersonalizedReminderService';

// Simulated data for analytics
const generateAnalyticsData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Generate increasing trend with some randomness
    const baseSent = 30 + (days - i) * 2 + Math.floor(Math.random() * 10);
    const baseOpenRate = 0.4 + (Math.min(0.4, (days - i) * 0.005)) + (Math.random() * 0.1 - 0.05);
    const baseClickRate = 0.15 + (Math.min(0.2, (days - i) * 0.003)) + (Math.random() * 0.05 - 0.025);
    const baseConversionRate = 0.08 + (Math.min(0.1, (days - i) * 0.002)) + (Math.random() * 0.02 - 0.01);
    
    data.push({
      date: date.toISOString().split('T')[0],
      remindersSent: baseSent,
      openRate: Number((baseOpenRate * 100).toFixed(1)),
      clickRate: Number((baseClickRate * 100).toFixed(1)),
      conversionRate: Number((baseConversionRate * 100).toFixed(1)),
      revenue: Math.floor(baseSent * baseConversionRate * (50 + Math.random() * 30))
    });
  }
  
  return data;
};

// Simulated template performance data
const generateTemplateData = () => {
  const templates = ['Urgent Reminder', 'Early Reminder', 'Subscription Recommendation', 'Post-Depletion Reminder'];
  return templates.map(template => ({
    name: template,
    sentCount: Math.floor(Math.random() * 1000) + 500,
    openRate: Number((Math.random() * 30 + 40).toFixed(1)),
    clickRate: Number((Math.random() * 20 + 10).toFixed(1)),
    conversionRate: Number((Math.random() * 15 + 5).toFixed(1)),
    revenue: Math.floor(Math.random() * 5000 + 2000)
  }));
};

const ReminderAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('30days');
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [templateData, setTemplateData] = useState<any[]>([]);
  const [templates, setTemplates] = useState<ReminderTemplate[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Get analytics data based on time range
        const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
        const data = generateAnalyticsData(days);
        setAnalyticsData(data);
        
        // Get template performance data
        const templateData = generateTemplateData();
        setTemplateData(templateData);
        
        // Get actual templates
        const templates = PersonalizedReminderService.getReminderTemplates();
        setTemplates(templates);
        
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);
  
  // Calculate summary metrics
  const calculateSummaryMetrics = () => {
    if (analyticsData.length === 0) return null;
    
    const totalSent = analyticsData.reduce((sum, day) => sum + day.remindersSent, 0);
    const totalRevenue = analyticsData.reduce((sum, day) => sum + day.revenue, 0);
    
    // Calculate averages
    const avgOpenRate = analyticsData.reduce((sum, day) => sum + day.openRate, 0) / analyticsData.length;
    const avgClickRate = analyticsData.reduce((sum, day) => sum + day.clickRate, 0) / analyticsData.length;
    const avgConversionRate = analyticsData.reduce((sum, day) => sum + day.conversionRate, 0) / analyticsData.length;
    
    // Calculate trends (comparing first half to second half)
    const midpoint = Math.floor(analyticsData.length / 2);
    const firstHalf = analyticsData.slice(0, midpoint);
    const secondHalf = analyticsData.slice(midpoint);
    
    const firstHalfAvgConversion = firstHalf.reduce((sum, day) => sum + day.conversionRate, 0) / firstHalf.length;
    const secondHalfAvgConversion = secondHalf.reduce((sum, day) => sum + day.conversionRate, 0) / secondHalf.length;
    
    const conversionTrend = ((secondHalfAvgConversion - firstHalfAvgConversion) / firstHalfAvgConversion) * 100;
    
    return {
      totalSent,
      totalRevenue,
      avgOpenRate,
      avgClickRate,
      avgConversionRate,
      conversionTrend
    };
  };
  
  const summaryMetrics = calculateSummaryMetrics();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading className="text-2xl font-bold">Reminder Effectiveness Analytics</Heading>
        <div className="flex gap-2">
          <Button 
            variant={timeRange === '7days' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setTimeRange('7days')}
          >
            7 Days
          </Button>
          <Button 
            variant={timeRange === '30days' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setTimeRange('30days')}
          >
            30 Days
          </Button>
          <Button 
            variant={timeRange === '90days' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setTimeRange('90days')}
          >
            90 Days
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          {summaryMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Text className="text-sm text-muted-foreground">Total Reminders Sent</Text>
                    <Heading className="text-2xl font-bold mt-1">{summaryMetrics.totalSent.toLocaleString()}</Heading>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <Text className="text-sm text-muted-foreground mt-2">Across all campaigns</Text>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Text className="text-sm text-muted-foreground">Average Open Rate</Text>
                    <Heading className="text-2xl font-bold mt-1">{summaryMetrics.avgOpenRate.toFixed(1)}%</Heading>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <MousePointerClick className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <Text className="text-sm text-muted-foreground mt-2">Industry avg: 35.2%</Text>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Text className="text-sm text-muted-foreground">Conversion Rate</Text>
                    <Heading className="text-2xl font-bold mt-1">{summaryMetrics.avgConversionRate.toFixed(1)}%</Heading>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className={`h-4 w-4 ${summaryMetrics.conversionTrend > 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <Text className={`text-sm ${summaryMetrics.conversionTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(summaryMetrics.conversionTrend).toFixed(1)}% {summaryMetrics.conversionTrend > 0 ? 'increase' : 'decrease'}
                  </Text>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Text className="text-sm text-muted-foreground">Generated Revenue</Text>
                    <Heading className="text-2xl font-bold mt-1">${summaryMetrics.totalRevenue.toLocaleString()}</Heading>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <Text className="text-sm text-muted-foreground mt-2">From reminder-driven purchases</Text>
              </Card>
            </div>
          )}
          
          <Tabs defaultValue="performance">
            <TabsList className="mb-4">
              <TabsTrigger value="performance">Performance Over Time</TabsTrigger>
              <TabsTrigger value="templates">Template Effectiveness</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance">
              <Card className="p-6">
                <Heading className="text-lg font-semibold mb-4">Reminder Performance Trends</Heading>
                
                <Tabs defaultValue="rates">
                  <TabsList className="mb-4">
                    <TabsTrigger value="rates">Engagement Rates</TabsTrigger>
                    <TabsTrigger value="conversions">Conversions</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="rates">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="openRate" stroke="#3b82f6" name="Open Rate %" />
                          <Line type="monotone" dataKey="clickRate" stroke="#10b981" name="Click Rate %" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conversions">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="conversionRate" stroke="#ef4444" name="Conversion Rate %" />
                          <Line type="monotone" dataKey="remindersSent" stroke="#9333ea" name="Reminders Sent" yAxisId="right" />
                          <YAxis yAxisId="right" orientation="right" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="revenue">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => ['$' + value, 'Revenue']} />
                          <Legend />
                          <Line type="monotone" dataKey="revenue" stroke="#f59e0b" name="Revenue ($)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </TabsContent>
            
            <TabsContent value="templates">
              <Card className="p-6">
                <Heading className="text-lg font-semibold mb-4">Template Effectiveness Comparison</Heading>
                
                <Tabs defaultValue="conversion">
                  <TabsList className="mb-4">
                    <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue Generated</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="conversion">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={templateData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="conversionRate" name="Conversion Rate %" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="engagement">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={templateData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="openRate" name="Open Rate %" fill="#3b82f6" />
                          <Bar dataKey="clickRate" name="Click Rate %" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="revenue">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={templateData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => ['$' + value, 'Revenue']} />
                          <Legend />
                          <Bar dataKey="revenue" name="Revenue ($)" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Templates */}
          <Card className="p-6">
            <Heading className="text-lg font-semibold mb-4">Reminder Templates</Heading>
            <div className="space-y-4">
              {templates.map(template => (
                <Card key={template.id} className="p-4 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <Heading className="text-md font-semibold">{template.name}</Heading>
                      <Text className="text-sm text-muted-foreground">Send {template.timing} days before depletion</Text>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="mt-2">
                    <Text className="text-sm font-medium">Subject: {template.subject}</Text>
                    <Text className="text-sm mt-1 text-gray-700">{template.body}</Text>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default ReminderAnalyticsDashboard;
