
/**
 * Integration between Gadget.dev and Shopify's MCP Server for AI capabilities
 */
import { gadgetEnvironment } from "../GadgetEnvironmentService";
import { PaydayPattern } from "../payday/PaydayTypes";

export interface MCPQueryParams {
  query: string;
  customerId?: string;
  context?: Record<string, any>;
}

export interface MCPResponse {
  answer: string;
  confidence: number;
  metadata?: Record<string, any>;
}

export interface MCPTrainingParams {
  documents: Array<{
    id: string;
    content: string;
    metadata?: Record<string, any>;
  }>;
}

/**
 * Service for integrating Gadget.dev with Shopify's MCP Server
 */
export class GadgetMCPIntegration {
  /**
   * Process a natural language query through MCP Server via Gadget.dev
   */
  public static async processQuery(params: MCPQueryParams): Promise<MCPResponse> {
    try {
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/mcp/query`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        body: JSON.stringify(params)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process MCP query');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error processing MCP query via Gadget:", error);
      throw error;
    }
  }
  
  /**
   * Train the MCP AI model with domain-specific knowledge via Gadget.dev
   */
  public static async trainModel(params: MCPTrainingParams): Promise<boolean> {
    try {
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/mcp/train`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        body: JSON.stringify(params)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to train MCP model');
      }
      
      return true;
    } catch (error) {
      console.error("Error training MCP model via Gadget:", error);
      throw error;
    }
  }
  
  /**
   * Submit payday pattern data to improve the MCP AI model
   */
  public static async submitPaydayPatternData(
    customerId: string,
    patternData: PaydayPattern
  ): Promise<boolean> {
    try {
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/mcp/data/payday-patterns`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        body: JSON.stringify({
          customerId,
          ...patternData,
          submittedAt: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit payday pattern data');
      }
      
      return true;
    } catch (error) {
      console.error("Error submitting payday pattern data via Gadget:", error);
      throw error;
    }
  }
  
  /**
   * Submit value metrics data to improve the MCP AI model
   */
  public static async submitValueMetricsData(
    productId: string,
    valueScore: number,
    costEfficiency: number,
    otherMetrics?: Record<string, any>
  ): Promise<boolean> {
    try {
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/mcp/data/value-metrics`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        body: JSON.stringify({
          productId,
          valueScore,
          costEfficiency,
          ...otherMetrics,
          submittedAt: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit value metrics data');
      }
      
      return true;
    } catch (error) {
      console.error("Error submitting value metrics data via Gadget:", error);
      throw error;
    }
  }
}
