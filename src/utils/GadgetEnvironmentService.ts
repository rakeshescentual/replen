
/**
 * Utility service for managing Gadget.dev environment configurations
 * 
 * This service implements Gadget.dev's Environment Variable Groups feature
 * to provide environment-specific configuration for different deployments.
 */

export type GadgetEnvironment = 'development' | 'staging' | 'production';

interface EnvironmentConfig {
  apiBaseUrl: string;
  shopifyStorefrontDomain: string;
  useSecureConnection: boolean;
  loggingEnabled: boolean;
  featureFlags: Record<string, boolean>;
}

/**
 * Environment configuration service that leverages Gadget.dev Environment Variable Groups
 * to provide environment-specific settings across the application.
 */
export class GadgetEnvironmentService {
  private static instance: GadgetEnvironmentService;
  private currentEnvironment: GadgetEnvironment;
  private environmentConfigs: Record<GadgetEnvironment, EnvironmentConfig>;

  private constructor() {
    this.currentEnvironment = this.detectEnvironment();
    
    // Configuration for different environments using Gadget.dev Environment Variable Groups
    this.environmentConfigs = {
      development: {
        apiBaseUrl: 'https://escentual-value-metrics-dev.gadget.app/api',
        shopifyStorefrontDomain: 'escentual-dev.myshopify.com',
        useSecureConnection: false,
        loggingEnabled: true,
        featureFlags: {
          enableDetailedLogging: true,
          useTestData: true,
          showDebugTools: true,
          skipProductSync: true,
          mockPaydayData: true
        }
      },
      staging: {
        apiBaseUrl: 'https://escentual-value-metrics-staging.gadget.app/api',
        shopifyStorefrontDomain: 'escentual-staging.myshopify.com',
        useSecureConnection: true,
        loggingEnabled: true,
        featureFlags: {
          enableDetailedLogging: true,
          useTestData: false,
          showDebugTools: true,
          skipProductSync: false,
          mockPaydayData: false
        }
      },
      production: {
        apiBaseUrl: 'https://escentual-value-metrics.gadget.app/api',
        shopifyStorefrontDomain: 'escentual.myshopify.com',
        useSecureConnection: true,
        loggingEnabled: false,
        featureFlags: {
          enableDetailedLogging: false,
          useTestData: false,
          showDebugTools: false,
          skipProductSync: false,
          mockPaydayData: false
        }
      }
    };
  }

  /**
   * Get the singleton instance of the environment service
   */
  public static getInstance(): GadgetEnvironmentService {
    if (!this.instance) {
      this.instance = new GadgetEnvironmentService();
    }
    return this.instance;
  }

  /**
   * Detect the current environment based on hostname or other factors
   */
  private detectEnvironment(): GadgetEnvironment {
    const hostname = window.location.hostname;
    if (hostname.includes('dev') || hostname.includes('localhost')) return 'development';
    if (hostname.includes('staging')) return 'staging';
    return 'production';
  }

  /**
   * Get the current environment name
   */
  public getEnvironment(): GadgetEnvironment {
    return this.currentEnvironment;
  }

  /**
   * Get the configuration for the current environment
   */
  public getConfig(): EnvironmentConfig {
    return this.environmentConfigs[this.currentEnvironment];
  }

  /**
   * Get the API base URL for the current environment
   */
  public getApiBaseUrl(): string {
    return this.environmentConfigs[this.currentEnvironment].apiBaseUrl;
  }

  /**
   * Check if a feature flag is enabled in the current environment
   */
  public isFeatureEnabled(featureName: string): boolean {
    return this.environmentConfigs[this.currentEnvironment].featureFlags[featureName] || false;
  }

  /**
   * Get the Shopify storefront domain for the current environment
   */
  public getShopifyDomain(): string {
    return this.environmentConfigs[this.currentEnvironment].shopifyStorefrontDomain;
  }

  /**
   * Check if detailed logging is enabled for the current environment
   */
  public isLoggingEnabled(): boolean {
    return this.environmentConfigs[this.currentEnvironment].loggingEnabled;
  }
}

// Export a convenient singleton instance
export const gadgetEnvironment = GadgetEnvironmentService.getInstance();

// Utility function for easy access
export const getGadgetApiUrl = (endpoint: string): string => {
  return `${gadgetEnvironment.getApiBaseUrl()}/${endpoint}`;
};
