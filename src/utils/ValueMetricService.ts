
import { ShopifyMetafieldService, ProductMetafields } from './ShopifyMetafieldService';
import { toast } from "@/hooks/use-toast";

export interface ProductValueMetrics {
  valueScore: number;        // Overall score from 0-100
  costEfficiency: number;    // Based on cost per day (1-10)
  customerSatisfaction: number; // Based on reviews (1-10)
  sentimentScore: number;    // Based on internet sentiment (1-10)
  repurchaseRate?: number;   // Optional if data is available
  premiumValue?: number;     // Value compared to similar cheaper products
}

export interface ReviewData {
  rating: number;           // Average rating (0-5)
  count: number;            // Number of reviews
  sentimentPositive: number; // Percentage of positive sentiment (0-100)
  sentimentNegative: number; // Percentage of negative sentiment (0-100)
  repurchaseIntent: number;  // Percentage indicating repurchase intent (0-100)
}

// Mock API for sentiment analysis - in production this would connect to a real NLP service
interface SentimentAnalysisResult {
  score: number;            // -1 to 1 where 1 is very positive
  magnitude: number;        // Strength of sentiment
  sources: number;          // Number of sources analyzed
}

export class ValueMetricService {
  // Namespace for Shopify metafields
  private static readonly VALUE_METRICS_NAMESPACE = 'escentual_value';
  
  /**
   * Calculate value metrics based on product cost and review data
   */
  public static calculateValueMetrics(
    productMetafields: ProductMetafields,
    reviewData: ReviewData
  ): ProductValueMetrics {
    // Calculate cost efficiency (lower cost per day = higher score)
    // Scale from 1-10 where 10 is the most cost-efficient
    const costEfficiency = this.calculateCostEfficiency(productMetafields.cost_per_day);
    
    // Calculate customer satisfaction from review data (1-10)
    const customerSatisfaction = this.calculateSatisfactionScore(reviewData);
    
    // Calculate sentiment score (1-10)
    const sentimentScore = this.calculateSentimentScore(reviewData);
    
    // Calculate overall value score (0-100)
    const valueScore = this.calculateOverallScore(
      costEfficiency, 
      customerSatisfaction, 
      sentimentScore,
      productMetafields.average_lifespan,
      reviewData.count
    );
    
    // Create value metrics object
    const valueMetrics: ProductValueMetrics = {
      valueScore,
      costEfficiency,
      customerSatisfaction,
      sentimentScore,
    };
    
    // Add optional metrics if available
    if (reviewData.repurchaseIntent) {
      valueMetrics.repurchaseRate = reviewData.repurchaseIntent / 10; // Convert to 1-10 scale
    }
    
    return valueMetrics;
  }
  
  /**
   * Calculate cost efficiency score (1-10)
   * Lower cost per day = higher score
   */
  private static calculateCostEfficiency(costPerDay: number): number {
    // Assume industry average cost per day range
    const maxExpectedCost = 5.0;  // Most expensive expected cost per day
    const score = 10 - (costPerDay / maxExpectedCost) * 9;
    return Math.max(1, Math.min(10, score));
  }
  
  /**
   * Calculate customer satisfaction score from review data (1-10)
   */
  private static calculateSatisfactionScore(reviewData: ReviewData): number {
    // Convert 5-star scale to 10-point scale and adjust for review count
    const baseScore = (reviewData.rating / 5) * 10;
    
    // Adjust score based on number of reviews (more reviews = more reliable score)
    const reviewCountFactor = Math.min(1, reviewData.count / 50); // Max factor at 50+ reviews
    
    return baseScore * (0.7 + (reviewCountFactor * 0.3));
  }
  
  /**
   * Calculate sentiment score based on sentiment analysis (1-10)
   */
  private static calculateSentimentScore(reviewData: ReviewData): number {
    // Calculate based on positive vs negative sentiment ratio
    const sentimentRatio = reviewData.sentimentPositive / 
      (reviewData.sentimentPositive + reviewData.sentimentNegative);
    
    return Math.max(1, Math.min(10, sentimentRatio * 10));
  }
  
  /**
   * Calculate overall value score (0-100)
   */
  private static calculateOverallScore(
    costEfficiency: number,
    satisfaction: number,
    sentiment: number,
    lifespan: number,
    reviewCount: number
  ): number {
    // Base score is weighted average of our core metrics
    let score = (
      (costEfficiency * 0.35) +    // 35% weight to cost efficiency
      (satisfaction * 0.4) +       // 40% weight to customer satisfaction
      (sentiment * 0.25)           // 25% weight to sentiment
    ) * 10; // Convert to 0-100 scale
    
    // Apply bonus for products with longer lifespan
    const lifespanBonus = Math.min(10, (lifespan / 60) * 10); // Max bonus at 60+ days
    score += lifespanBonus;
    
    // Adjust confidence based on review count
    const confidenceFactor = Math.min(1, reviewCount / 30); // Full confidence at 30+ reviews
    score = (score * confidenceFactor) + (70 * (1 - confidenceFactor)); // Default to 70 with no reviews
    
    // Ensure score is within 0-100 range
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Fetch review data from Bazaarvoice API
   * This is a mockup that would be replaced with actual Bazaarvoice API integration
   */
  public static async fetchReviewData(productId: string): Promise<ReviewData> {
    console.log(`Fetching review data for product ${productId} from Bazaarvoice`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In a real implementation, this would call the Bazaarvoice API
    // For now, generate mock data
    return {
      rating: 3.5 + (Math.random() * 1.5), // Random between 3.5-5.0
      count: Math.floor(Math.random() * 100) + 5, // Random between 5-105
      sentimentPositive: 60 + (Math.random() * 30), // Random between 60-90%
      sentimentNegative: 5 + (Math.random() * 10), // Random between 5-15%
      repurchaseIntent: 50 + (Math.random() * 40) // Random between 50-90%
    };
  }
  
  /**
   * Mock function to analyze internet sentiment for a product
   * In production, this would connect to a sentiment analysis service or API
   */
  public static async analyzeSentiment(productName: string): Promise<SentimentAnalysisResult> {
    console.log(`Analyzing internet sentiment for product: ${productName}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock sentiment result
    return {
      score: 0.2 + (Math.random() * 0.6), // Random between 0.2-0.8
      magnitude: 0.5 + (Math.random() * 2.5), // Random between 0.5-3.0
      sources: Math.floor(Math.random() * 50) + 10 // Random between 10-60
    };
  }
  
  /**
   * Sync value metrics to Shopify metafields
   */
  public static async syncValueMetrics(
    productId: string,
    valueMetrics: ProductValueMetrics
  ): Promise<boolean> {
    try {
      // Convert value metrics to metafields format
      const metafields = {
        value_score: valueMetrics.valueScore,
        cost_efficiency: valueMetrics.costEfficiency,
        customer_satisfaction: valueMetrics.customerSatisfaction,
        sentiment_score: valueMetrics.sentimentScore,
        repurchase_rate: valueMetrics.repurchaseRate || 0,
      };
      
      // Use existing Shopify service to sync metafields
      await ShopifyMetafieldService.syncProductMetafields({
        productId,
        metafields: metafields as any, // Type casting for compatibility
        namespace: this.VALUE_METRICS_NAMESPACE
      });
      
      console.log(`Successfully synced value metrics for product ${productId}`);
      return true;
    } catch (error) {
      console.error(`Failed to sync value metrics for product ${productId}:`, error);
      toast({
        title: "Value Metrics Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Generate Liquid code for displaying value metrics on product page
   * This provides the snippet that can be added to Shopify theme
   */
  public static generateLiquidSnippet(): string {
    return `
{% comment %}
  Escentual Value Metric - Add to product-template.liquid
  Requires metafields with namespace: ${this.VALUE_METRICS_NAMESPACE}
{% endcomment %}

{% if product.metafields.${this.VALUE_METRICS_NAMESPACE}.value_score %}
  {% assign value_score = product.metafields.${this.VALUE_METRICS_NAMESPACE}.value_score | round %}
  {% assign cost_efficiency = product.metafields.${this.VALUE_METRICS_NAMESPACE}.cost_efficiency | round: 1 %}
  {% assign satisfaction = product.metafields.${this.VALUE_METRICS_NAMESPACE}.customer_satisfaction | round: 1 %}
  {% assign sentiment = product.metafields.${this.VALUE_METRICS_NAMESPACE}.sentiment_score | round: 1 %}
  
  <div class="escentual-value-metric">
    <div class="value-score-container">
      <div class="value-score-circle {% if value_score > 80 %}exceptional{% elsif value_score > 70 %}excellent{% elsif value_score > 60 %}good{% else %}average{% endif %}">
        <span class="score-value">{{ value_score }}</span>
        <span class="score-label">Value<br>Score</span>
      </div>
    </div>
    <div class="value-details">
      <div class="value-detail">
        <span class="detail-label">Cost Efficiency</span>
        <div class="detail-bar-container">
          <div class="detail-bar" style="width: {{ cost_efficiency | times: 10 }}%"></div>
        </div>
        <span class="detail-value">{{ cost_efficiency }}/10</span>
      </div>
      <div class="value-detail">
        <span class="detail-label">Customer Satisfaction</span>
        <div class="detail-bar-container">
          <div class="detail-bar" style="width: {{ satisfaction | times: 10 }}%"></div>
        </div>
        <span class="detail-value">{{ satisfaction }}/10</span>
      </div>
      <div class="value-detail">
        <span class="detail-label">Online Sentiment</span>
        <div class="detail-bar-container">
          <div class="detail-bar" style="width: {{ sentiment | times: 10 }}%"></div>
        </div>
        <span class="detail-value">{{ sentiment }}/10</span>
      </div>
    </div>
    <div class="value-explanation">
      <p>This product has been analyzed based on cost per day, customer reviews, and online sentiment.</p>
      {% if value_score > 80 %}
        <p><strong>Exceptional value</strong> - This premium product delivers outstanding performance for its price.</p>
      {% elsif value_score > 70 %}
        <p><strong>Excellent value</strong> - This product offers excellent performance relative to its cost.</p>
      {% elsif value_score > 60 %}
        <p><strong>Good value</strong> - This product provides good value for money.</p>
      {% else %}
        <p><strong>Average value</strong> - This product offers standard value for its price point.</p>
      {% endif %}
    </div>
  </div>

  <style>
    .escentual-value-metric {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: #f9f9f9;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      padding: 20px;
      margin: 20px 0;
      color: #333;
    }
    .value-score-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .value-score-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .value-score-circle.exceptional {
      background: linear-gradient(135deg, #4CAF50, #2E7D32);
    }
    .value-score-circle.excellent {
      background: linear-gradient(135deg, #8BC34A, #558B2F);
    }
    .value-score-circle.good {
      background: linear-gradient(135deg, #FFC107, #FF8F00);
    }
    .value-score-circle.average {
      background: linear-gradient(135deg, #FF9800, #EF6C00);
    }
    .score-value {
      font-size: 24px;
      font-weight: bold;
      line-height: 1;
    }
    .score-label {
      font-size: 12px;
      line-height: 1;
      margin-top: 4px;
    }
    .value-details {
      margin-bottom: 20px;
    }
    .value-detail {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
    .detail-label {
      width: 40%;
      font-size: 14px;
    }
    .detail-bar-container {
      width: 40%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    .detail-bar {
      height: 100%;
      background: linear-gradient(to right, #4CAF50, #8BC34A);
      border-radius: 4px;
    }
    .detail-value {
      width: 20%;
      font-size: 14px;
      font-weight: bold;
      text-align: right;
      padding-left: 10px;
    }
    .value-explanation {
      font-size: 14px;
      line-height: 1.5;
      border-top: 1px solid #e6e6e6;
      padding-top: 15px;
    }
    
    /* Escentual brand colors */
    .escentual-value-metric {
      border-color: #d1d1d1;
    }
    .detail-bar {
      background: linear-gradient(to right, #BB9977, #DDCCBB);
    }
    .value-score-circle.exceptional {
      background: linear-gradient(135deg, #BB9977, #AA8866);
    }
    .value-score-circle.excellent {
      background: linear-gradient(135deg, #DDCCBB, #CCBBAA);
    }
    .value-score-circle.good {
      background: linear-gradient(135deg, #AA8866, #997755);
    }
    .value-score-circle.average {
      background: linear-gradient(135deg, #CCBBAA, #BB9977);
    }
  </style>
{% endif %}
    `;
  }
  
  /**
   * Generate Liquid code for collection filtering based on value metrics
   */
  public static generateCollectionFilterLiquid(): string {
    return `
{% comment %}
  Escentual Value Metric Collection Filtering - Add to collection-template.liquid
  Requires metafields with namespace: ${this.VALUE_METRICS_NAMESPACE}
{% endcomment %}

<div class="escentual-value-filters">
  <h3>Filter by Value</h3>
  
  <div class="filter-group">
    <label for="value-score-filter">Minimum Value Score</label>
    <input type="range" id="value-score-filter" min="50" max="100" step="5" value="50" 
           data-filter-target="value-score" class="value-range-slider">
    <span class="range-value">50+</span>
  </div>
  
  <div class="filter-group">
    <label for="cost-efficiency-filter">Cost Efficiency</label>
    <input type="range" id="cost-efficiency-filter" min="1" max="10" step="1" value="1" 
           data-filter-target="cost-efficiency" class="value-range-slider">
    <span class="range-value">1+</span>
  </div>
  
  <div class="filter-group">
    <label for="customer-satisfaction-filter">Customer Satisfaction</label>
    <input type="range" id="customer-satisfaction-filter" min="1" max="10" step="1" value="1" 
           data-filter-target="customer-satisfaction" class="value-range-slider">
    <span class="range-value">1+</span>
  </div>
  
  <button id="apply-value-filters" class="escentual-button">Apply Filters</button>
  <button id="reset-value-filters" class="escentual-button button-secondary">Reset</button>
</div>

<div class="value-sort-options">
  <label for="value-sort">Sort by Value:</label>
  <select id="value-sort">
    <option value="">Default sorting</option>
    <option value="value-high-low">Best Value (High to Low)</option>
    <option value="value-low-high">Value (Low to High)</option>
    <option value="efficiency-high-low">Cost Efficiency (High to Low)</option>
    <option value="satisfaction-high-low">Customer Satisfaction (High to Low)</option>
  </select>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Update range display values
  const rangeSliders = document.querySelectorAll('.value-range-slider');
  rangeSliders.forEach(slider => {
    const valueDisplay = slider.nextElementSibling;
    slider.addEventListener('input', function() {
      valueDisplay.textContent = this.value + '+';
    });
  });
  
  // Apply filters button
  document.getElementById('apply-value-filters').addEventListener('click', function() {
    applyValueFilters();
  });
  
  // Reset filters button
  document.getElementById('reset-value-filters').addEventListener('click', function() {
    resetValueFilters();
  });
  
  // Sort dropdown
  document.getElementById('value-sort').addEventListener('change', function() {
    applySorting(this.value);
  });
  
  function applyValueFilters() {
    const minValueScore = parseInt(document.getElementById('value-score-filter').value);
    const minCostEfficiency = parseInt(document.getElementById('cost-efficiency-filter').value);
    const minSatisfaction = parseInt(document.getElementById('customer-satisfaction-filter').value);
    
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
      const productValueScore = parseInt(product.getAttribute('data-value-score') || '0');
      const productCostEfficiency = parseInt(product.getAttribute('data-cost-efficiency') || '0');
      const productSatisfaction = parseInt(product.getAttribute('data-satisfaction') || '0');
      
      const matchesFilters = 
        productValueScore >= minValueScore && 
        productCostEfficiency >= minCostEfficiency && 
        productSatisfaction >= minSatisfaction;
      
      product.style.display = matchesFilters ? 'block' : 'none';
    });
    
    updateProductCount();
  }
  
  function resetValueFilters() {
    document.getElementById('value-score-filter').value = 50;
    document.getElementById('cost-efficiency-filter').value = 1;
    document.getElementById('customer-satisfaction-filter').value = 1;
    
    // Reset displays
    document.querySelectorAll('.range-value').forEach((display, index) => {
      if (index === 0) display.textContent = '50+';
      else display.textContent = '1+';
    });
    
    // Show all products
    document.querySelectorAll('.product-item').forEach(product => {
      product.style.display = 'block';
    });
    
    updateProductCount();
  }
  
  function applySorting(sortValue) {
    const productsContainer = document.querySelector('.products-grid');
    const products = Array.from(document.querySelectorAll('.product-item'));
    
    if (!sortValue) {
      // Default sorting (original order)
      const sortedProducts = products.sort((a, b) => {
        return parseInt(a.getAttribute('data-original-order')) - 
               parseInt(b.getAttribute('data-original-order'));
      });
      
      reorderProducts(sortedProducts);
      return;
    }
    
    let sortedProducts;
    
    switch(sortValue) {
      case 'value-high-low':
        sortedProducts = products.sort((a, b) => {
          return parseInt(b.getAttribute('data-value-score') || '0') - 
                 parseInt(a.getAttribute('data-value-score') || '0');
        });
        break;
      case 'value-low-high':
        sortedProducts = products.sort((a, b) => {
          return parseInt(a.getAttribute('data-value-score') || '0') - 
                 parseInt(b.getAttribute('data-value-score') || '0');
        });
        break;
      case 'efficiency-high-low':
        sortedProducts = products.sort((a, b) => {
          return parseInt(b.getAttribute('data-cost-efficiency') || '0') - 
                 parseInt(a.getAttribute('data-cost-efficiency') || '0');
        });
        break;
      case 'satisfaction-high-low':
        sortedProducts = products.sort((a, b) => {
          return parseInt(b.getAttribute('data-satisfaction') || '0') - 
                 parseInt(a.getAttribute('data-satisfaction') || '0');
        });
        break;
      default:
        return;
    }
    
    reorderProducts(sortedProducts);
  }
  
  function reorderProducts(sortedProducts) {
    const productsContainer = document.querySelector('.products-grid');
    
    // Remove all products
    productsContainer.innerHTML = '';
    
    // Add them back in sorted order
    sortedProducts.forEach(product => {
      productsContainer.appendChild(product);
    });
  }
  
  function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.product-item:not([style*="display: none"])').length;
    const productCountElem = document.querySelector('.product-count');
    
    if (productCountElem) {
      productCountElem.textContent = visibleProducts + ' products';
    }
  }
});
</script>

<style>
  .escentual-value-filters {
    background: #f9f9f9;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .escentual-value-filters h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
  }
  
  .filter-group {
    margin-bottom: 12px;
  }
  
  .filter-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .value-range-slider {
    width: 85%;
    display: inline-block;
    vertical-align: middle;
  }
  
  .range-value {
    display: inline-block;
    width: 12%;
    font-size: 14px;
    font-weight: 600;
    text-align: right;
    vertical-align: middle;
  }
  
  .escentual-button {
    background: #BB9977;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 15px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 10px;
    transition: background 0.2s;
  }
  
  .escentual-button:hover {
    background: #AA8866;
  }
  
  .button-secondary {
    background: #f1f1f1;
    color: #333;
    border: 1px solid #d1d1d1;
  }
  
  .button-secondary:hover {
    background: #e6e6e6;
  }
  
  .value-sort-options {
    margin-bottom: 20px;
    text-align: right;
  }
  
  .value-sort-options label {
    margin-right: 10px;
    font-size: 14px;
  }
  
  .value-sort-options select {
    padding: 5px 10px;
    font-size: 14px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    background: white;
  }
</style>
    `;
  }
  
  /**
   * Generate Liquid code for product comparison
   */
  public static generateProductComparisonLiquid(): string {
    return `
{% comment %}
  Escentual Value Metric Product Comparison - Add to compare-products.liquid
  Requires metafields with namespace: ${this.VALUE_METRICS_NAMESPACE}
{% endcomment %}

<div class="escentual-value-comparison">
  <h2>Value Comparison</h2>
  
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Value Score</th>
        <th>Cost Per Day</th>
        <th>Cost Efficiency</th>
        <th>Customer Satisfaction</th>
        <th>Online Sentiment</th>
      </tr>
    </thead>
    <tbody>
      {% for product in products %}
        {% assign value_score = product.metafields.${this.VALUE_METRICS_NAMESPACE}.value_score | round %}
        {% assign cost_per_day = product.metafields.escentual_lifespan.cost_per_day | round: 2 %}
        {% assign cost_efficiency = product.metafields.${this.VALUE_METRICS_NAMESPACE}.cost_efficiency | round: 1 %}
        {% assign satisfaction = product.metafields.${this.VALUE_METRICS_NAMESPACE}.customer_satisfaction | round: 1 %}
        {% assign sentiment = product.metafields.${this.VALUE_METRICS_NAMESPACE}.sentiment_score | round: 1 %}
        
        <tr>
          <td>
            <div class="product-info">
              <img src="{{ product.featured_image | img_url: '50x50', crop: 'center' }}" alt="{{ product.title }}">
              <span>{{ product.title }}</span>
            </div>
          </td>
          <td>
            <div class="comparison-score-circle {% if value_score > 80 %}exceptional{% elsif value_score > 70 %}excellent{% elsif value_score > 60 %}good{% else %}average{% endif %}">
              {{ value_score }}
            </div>
          </td>
          <td>£{{ cost_per_day }}</td>
          <td>
            <div class="comparison-bar-container">
              <div class="comparison-bar" style="width: {{ cost_efficiency | times: 10 }}%"></div>
              <span>{{ cost_efficiency }}/10</span>
            </div>
          </td>
          <td>
            <div class="comparison-bar-container">
              <div class="comparison-bar" style="width: {{ satisfaction | times: 10 }}%"></div>
              <span>{{ satisfaction }}/10</span>
            </div>
          </td>
          <td>
            <div class="comparison-bar-container">
              <div class="comparison-bar" style="width: {{ sentiment | times: 10 }}%"></div>
              <span>{{ sentiment }}/10</span>
            </div>
          </td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
  
  <div class="comparison-legend">
    <div class="legend-item">
      <div class="legend-color exceptional"></div>
      <span>Exceptional Value (80-100)</span>
    </div>
    <div class="legend-item">
      <div class="legend-color excellent"></div>
      <span>Excellent Value (70-80)</span>
    </div>
    <div class="legend-item">
      <div class="legend-color good"></div>
      <span>Good Value (60-70)</span>
    </div>
    <div class="legend-item">
      <div class="legend-color average"></div>
      <span>Average Value (0-60)</span>
    </div>
  </div>
  
  <div class="comparison-explanation">
    <h3>About Escentual Value Scores</h3>
    <p>Our value scoring system helps you make informed decisions when comparing products:</p>
    <ul>
      <li><strong>Value Score</strong> - An overall assessment combining all factors below</li>
      <li><strong>Cost Per Day</strong> - The daily cost to use this product based on its expected lifespan</li>
      <li><strong>Cost Efficiency</strong> - How efficiently the product delivers value for its price</li>
      <li><strong>Customer Satisfaction</strong> - Based on reviews from verified purchasers</li>
      <li><strong>Online Sentiment</strong> - Analysis of mentions across the internet</li>
    </ul>
    <p>Premium products often score higher in Cost Efficiency despite higher prices because they typically last longer and deliver superior performance.</p>
  </div>
</div>

<style>
  .escentual-value-comparison {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 30px 0;
    color: #333;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e6e6e6;
  }
  
  .comparison-table th {
    background: #f5f5f5;
    font-weight: 600;
    font-size: 14px;
  }
  
  .product-info {
    display: flex;
    align-items: center;
  }
  
  .product-info img {
    margin-right: 10px;
    border-radius: 4px;
  }
  
  .comparison-score-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    margin: 0 auto;
  }
  
  .comparison-score-circle.exceptional {
    background: linear-gradient(135deg, #BB9977, #AA8866);
  }
  
  .comparison-score-circle.excellent {
    background: linear-gradient(135deg, #DDCCBB, #CCBBAA);
  }
  
  .comparison-score-circle.good {
    background: linear-gradient(135deg, #AA8866, #997755);
  }
  
  .comparison-score-circle.average {
    background: linear-gradient(135deg, #CCBBAA, #BB9977);
  }
  
  .comparison-bar-container {
    width: 100%;
    max-width: 120px;
    position: relative;
  }
  
  .comparison-bar {
    height: 8px;
    background: linear-gradient(to right, #BB9977, #DDCCBB);
    border-radius: 4px;
    margin-bottom: 5px;
  }
  
  .comparison-bar-container span {
    font-size: 12px;
    font-weight: 600;
  }
  
  .comparison-legend {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    margin: 0 15px;
  }
  
  .legend-color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .legend-color.exceptional {
    background: linear-gradient(135deg, #BB9977, #AA8866);
  }
  
  .legend-color.excellent {
    background: linear-gradient(135deg, #DDCCBB, #CCBBAA);
  }
  
  .legend-color.good {
    background: linear-gradient(135deg, #AA8866, #997755);
  }
  
  .legend-color.average {
    background: linear-gradient(135deg, #CCBBAA, #BB9977);
  }
  
  .comparison-explanation {
    background: #f9f9f9;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding: 20px;
  }
  
  .comparison-explanation h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
  }
  
  .comparison-explanation ul {
    padding-left: 20px;
    margin-bottom: 15px;
  }
  
  .comparison-explanation li {
    margin-bottom: 5px;
  }
</style>
    `;
  }
}
