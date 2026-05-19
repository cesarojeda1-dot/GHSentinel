import axios from 'axios';
import {
  Transaction,
  SubscriptionTier,
  Commission,
} from '../types';

/**
 * RevenueService
 * Manages B2B2C strategy, commissions, subscriptions, and revenue streams
 */
export class RevenueService {
  private apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  // Subscription tiers configuration
  private subscriptionTiers: Record<string, SubscriptionTier> = {
    basic: {
      id: 'tier_basic',
      name: 'Basic',
      price: 9.99,
      currency: 'USD',
      billingPeriod: 'monthly',
      features: [
        'Real-time epidemiological alerts',
        'Regional data access',
        'Basic reporting',
        'Email support',
      ],
      maxApiCalls: 1000,
      maxUsers: 1,
    },
    professional: {
      id: 'tier_professional',
      name: 'Professional',
      price: 49.99,
      currency: 'USD',
      billingPeriod: 'monthly',
      features: [
        'All Basic features',
        'Continental data access',
        'Advanced analytics',
        'Custom reports',
        'API access (up to 10k calls)',
        'Priority support',
        'Team collaboration (up to 5 users)',
      ],
      maxApiCalls: 10000,
      maxUsers: 5,
    },
    enterprise: {
      id: 'tier_enterprise',
      name: 'Enterprise',
      price: 299.99,
      currency: 'USD',
      billingPeriod: 'monthly',
      features: [
        'All Professional features',
        'White-label solution',
        'Unlimited API calls',
        'Unlimited users',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'SLA guarantee',
      ],
      maxApiCalls: -1,
      maxUsers: -1,
    },
  };

  // Commission structure
  private commissionStructure = {
    veterinaryReferral: 0.15,
    petShopReferral: 0.12,
    supplierReferral: 0.1,
    marketplaceTransaction: 0.08,
    apiAccess: 0.2,
    premiumMonitoring: 0.25,
  };

  /**
   * Get subscription tiers
   */
  getSubscriptionTiers(): Record<string, SubscriptionTier> {
    return this.subscriptionTiers;
  }

  /**
   * Get specific subscription tier
   */
  getSubscriptionTier(tierId: string): SubscriptionTier | null {
    return this.subscriptionTiers[tierId] || null;
  }

  /**
   * Create subscription
   */
  async createSubscription(
    organizationId: string,
    tierId: string,
    paymentMethodId: string
  ): Promise<{ subscriptionId: string; status: string; nextBillingDate: string }> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/revenue/subscriptions`,
        {
          organizationId,
          tierId,
          paymentMethodId,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  /**
   * Get subscription details
   */
  async getSubscription(
    organizationId: string
  ): Promise<{
    subscriptionId: string;
    tier: SubscriptionTier;
    status: string;
    currentPeriodEnd: string;
  }> {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/revenue/subscriptions/${organizationId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      throw error;
    }
  }

  /**
   * Get commission structure
   */
  getCommissionStructure(): Record<string, number> {
    return this.commissionStructure;
  }

  /**
   * Calculate commission
   */
  calculateCommission(type: string, amount: number): number {
    const rate = this.commissionStructure[type as keyof typeof this.commissionStructure] || 0;
    return amount * rate;
  }

  /**
   * Get partner commissions
   */
  async getPartnerCommissions(
    partnerId: string,
    startDate?: string,
    endDate?: string
  ): Promise<Commission[]> {
    try {
      const params: any = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      const response = await axios.get(
        `${this.apiBaseUrl}/revenue/commissions/${partnerId}`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching commissions:', error);
      throw error;
    }
  }

  /**
   * Get revenue dashboard
   */
  async getRevenueDashboard(
    organizationId: string
  ): Promise<{
    totalRevenue: number;
    totalCommissions: number;
    monthlyRecurringRevenue: number;
    topSources: { source: string; amount: number }[];
    forecast: { month: string; amount: number }[];
  }> {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/revenue/dashboard/${organizationId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue dashboard:', error);
      throw error;
    }
  }

  /**
   * Process transaction
   */
  async processTransaction(
    data: {
      organizationId: string;
      amount: number;
      currency: string;
      type: 'subscription' | 'marketplace' | 'api_access' | 'premium';
      description: string;
      paymentMethodId: string;
    }
  ): Promise<Transaction> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/revenue/transactions`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error processing transaction:', error);
      throw error;
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(
    organizationId: string,
    filters?: {
      startDate?: string;
      endDate?: string;
      type?: string;
    }
  ): Promise<Transaction[]> {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/revenue/transactions/${organizationId}`,
        { params: filters }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  }

  /**
   * Generate referral code
   */
  async generateReferralCode(organizationId: string): Promise<{ code: string }> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/revenue/referral/${organizationId}/code`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error('Error generating referral code:', error);
      throw error;
    }
  }
}

export const revenueService = new RevenueService();
